const { PrismaClient } = require('@prisma/client');
const { getUsersFromBattles, getTickersFromBattles, getCurrentPrices, groupBy, calculateStockStats, calculatePortfolioStats } = require('./battles.utils');
const prisma = new PrismaClient();

import { Battle } from '../../Types';

export {};

async function createBattle(data, ctx = { prisma }): Promise<Battle> {
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

async function getMyBattles(userId, ctx = { prisma }) {
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



async function getBattlesWithPortfolios (userId, ctx = { prisma }) {
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

    // Extract all the necessary infos
    const usersInfo = getUsersFromBattles(myBattles); // { [userId]: userData }
    const tickers = getTickersFromBattles(myBattles); // [ticker]
    const currentPrices = await getCurrentPrices(tickers); // { [ticker]: currentPrice }

    // For each Battle, group all transactions by user
    const transactionsByUsersPerBattle = myBattles.map((battle) => {
      const transactionsByUsers = groupBy(battle.transaction, 'userId');
      return transactionsByUsers;
    }); // [{ [userId]: transactions }, { [userId]: transactions }]

    // For each Battle, create an array of users and their portfolios
    const playerData = myBattles.map((battle, index) => {
      const transactionsByUsersInBattle = transactionsByUsersPerBattle[index];
      const users = [];
      battle.users.forEach((user) => {
        const { id, givenName, familyName, photo, } = usersInfo[user.id];
        const transactions = transactionsByUsersInBattle[user.id];
        const stocks = calculateStockStats(groupBy(transactions, "symbol"), currentPrices);
        const portfolio = calculatePortfolioStats(battle.budget, stocks);

        users.push({
          id,
          givenName,
          familyName,
          photo,
          stocks,
          currentValue: transactions ? portfolio.portfolioValue : battle.budget,
          remainingBudget: transactions ? portfolio.remainingBudget : battle.budget
        });
      });
      return users;
    });

    // Add user portfolios to battle objects
    const battles = myBattles.map((battle, index) => {
      battle.users = playerData[index];
      return battle;
    });

    return battles;
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

module.exports = { createBattle, getMyBattles, updateBattle, getCurrentPrices, getBattlesWithPortfolios };
