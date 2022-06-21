const { PrismaClient } = require('@prisma/client');
const { getQuote } = require('./quotes.model');
const prisma = new PrismaClient();

async function createBattle (data, ctx = { prisma }) {
  try {
    const battle = await ctx.prisma.battle.create({
      data: {
        users: {
          connect: data.users,
        },
        budget: +data.budget,
        battle_name: data.battle_name,
        start_date: data.start_date,
        end_date: data.end_date,
      },
      include: {
        users: true,
      },
    });
    return battle;
  } catch (err) {
    throw err;
  }
}

async function getMyBattles (userId, ctx = { prisma }) {
  try {
    const myBattles = await ctx.prisma.battle.findMany({
      where: {
        users: {
          some: {
            id: +userId,
          },
        },
      },
      include: {
        transaction: true,
        users: true,
      },
    });
    return myBattles;
  } catch (err) {
    throw err;
  }
}

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

function calculateAverage (values) {
  return values.reduce((m, x, i) => m + (x - m) / (i + 1), 0);
}

function calculateTotalBought (transactions) {
  return transactions.reduce((prev, _, index, arr) => {
    if (arr[index].action == "BUY") return prev + (arr[index].price * arr[index].quantity);
    else return prev;
  }, 0);
}

function calculateTotalSold (transactions) {
  return transactions.reduce((prev, _, index, arr) => {
    if (arr[index].action == "SELL") return prev + (arr[index].price * arr[index].quantity);
    else return prev;
  }, 0);
}

function calculateQuantity (transactions) {
  return transactions.reduce((prev, _, index, arr) => {
    if (arr[index].action == "BUY") return prev + (arr[index].quantity);
    if (arr[index].action == "SELL") return prev - (arr[index].quantity);
  }, 0);
}

const calculateStats = async (transactionsPerStock) => {
  const result = {};
  await Promise.all(Object.entries(transactionsPerStock).map(async (transaction) => {
    const [key, value] = transaction;
    const totalBought = calculateTotalBought(value);
    const totalSold = calculateTotalSold(value);
    const owning = calculateQuantity(value);
    const quote = (await getQuote(value[0].symbol)).latestPrice;

    result[key] = {
      owning,
      currentPrice: quote,
      totalValue: quote * owning,
      totalBought,
      totalSold,
      averageBuyIn: calculateAverage(value.filter(transaction => transaction.action == "BUY").map(transaction => transaction.price))
    };
  }));
  return result;
};

const calculatePortfolio = (startBudget, stockTransactions) => {
  let remainingBudget = startBudget;
  let portfolioValue = 0;
  for ([key, value] of Object.entries(stockTransactions)) {
    remainingBudget = remainingBudget - value.totalBought + value.totalSold;
    portfolioValue = portfolioValue + value.totalValue;
  }
  return { remainingBudget, portfolioValue };
};

async function getMyBattlesWithGroupedTransgenders (userId, ctx = { prisma }) {
  try {
    const myBattles = await ctx.prisma.battle.findMany({
      where: {
        users: {
          some: {
            id: +userId,
          },
        },
      },
      include: {
        transaction: true,
        users: true,
      },
    });

    const transactionsByPlayers = [];
    const budgets = [];
    myBattles.forEach((battle) => {
      transactionsByPlayers.push(groupBy(battle.transaction, 'userId'));
      budgets.push(battle.budget)
    });


    const summed = [];
    await Promise.all(transactionsByPlayers.map(async (battle, index) => {
      for (const [key, value] of Object.entries(battle)) {
        const stocks = await calculateStats(groupBy(value, "symbol"));
        const portfolio = calculatePortfolio(budgets[index], stocks);
        summed.push({
          userId: key,
          stocks,
          currentValue: portfolio.portfolioValue,
          remainingBudget: portfolio.remainingBudget
        });
      }
    }));
    return summed;
  } catch (err) {
    throw err;
  }
}

async function updateBattle (battleId, update, ctx = { prisma }) {
  try {
    const battle = await ctx.prisma.battle.update({
      where: { id: battleId },
      data: { ...update },
    });
    return battle;
  } catch (err) {
    throw err;
  }
}

module.exports = { createBattle, getMyBattles, updateBattle, getMyBattlesWithGroupedTransgenders };
