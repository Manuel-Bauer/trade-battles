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

const calculateStockStats = (transactionsPerStock, currentPrices) => {
  const result = {};
  Object.entries(transactionsPerStock).map((transaction) => {
    const [key, value] = transaction;
    const totalBought = calculateTotalBought(value);
    const totalSold = calculateTotalSold(value);
    const owning = calculateQuantity(value);
    const quote = currentPrices[value[0].symbol];

    result[key] = {
      owning,
      currentPrice: quote,
      totalValue: quote * owning,
      totalBought,
      totalSold,
      averageBuyIn: calculateAverage(value.filter(transaction => transaction.action == "BUY").map(transaction => transaction.price))
    };
  });
  return result;
};

const calculatePortfolioStats = (startBudget, stockTransactions) => {
  let remainingBudget = startBudget;
  let portfolioValue = 0;
  for ([_, transaction] of Object.entries(stockTransactions)) {
    remainingBudget = remainingBudget - transaction.totalBought + transaction.totalSold;
    portfolioValue = portfolioValue + transaction.totalValue;
  }
  return { remainingBudget, portfolioValue };
};

async function getCurrentPrices (userId, ctx = { prisma }) {
  try {
    const myBattles = await ctx.prisma.battle.findMany({
      where: {
        users: {
          some: {
            id: +userId,
          },
        },
      }
    });
    const tickers = await ctx.prisma.transaction.groupBy({
      by: ["symbol"],
      where: {
        battle: {
          id: {
            in: myBattles.map(battle => battle.id)
          }
        }
      }
    });

    // Populate with current prices
    const stockPrices = {};
    await Promise.all(tickers.map(async (ticker) => {
      const quote = (await getQuote(ticker.symbol)).latestPrice;
      stockPrices[ticker.symbol] = quote;
    }));

    return stockPrices;
  } catch (err) {
    console.log(err);
  }
}

function getUsersInfo (battles) {
  const users = {};
  battles.forEach(battle => {
    battle.users.forEach(user => { users[user.id] = user; });
  });
  return users;
}

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

    const currentPrices = await getCurrentPrices(userId);
    const usersInfo = getUsersInfo(myBattles);

    const transactionsByUsersPerBattle = myBattles.map((battle) => {
      const transactionsByUsers = groupBy(battle.transaction, 'userId');
      return transactionsByUsers;
    });

    const playerData = myBattles.map((battle, index) => {
      const users = [];

      const transactionsByUsersInBattle = transactionsByUsersPerBattle[index];
      battle.users.forEach((user) => {
        const { watchlist, email, googleId, ...userInfo } = usersInfo[userId];
        const transactions = transactionsByUsersInBattle[user.id];
        const stocks = transactions && calculateStockStats(groupBy(transactions, "symbol"), currentPrices);
        const portfolio = transactions && calculatePortfolioStats(battle.budget, stocks);

        users.push({
          ...userInfo,
          stocks: transactions ? stocks : null,
          currentValue: transactions ? portfolio.portfolioValue : null,
          remainingBudget: transactions ? portfolio.remainingBudget : null
        });
      });
      return users;
    });

    return myBattles.map((battle, index) => {
      battle.users = playerData[index];
      return battle;
    });
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

module.exports = { createBattle, getMyBattles, updateBattle, getCurrentPrices, getMyBattlesWithGroupedTransgenders };
