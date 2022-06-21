const { PrismaClient } = require('@prisma/client');
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
    myBattles.forEach((battle) => {
      transactionsByPlayers.push(groupBy(battle.transaction, 'userId'));
    });

    const summed = [];
    transactionsByPlayers.forEach((battle) => {
      for (const [key, value] of Object.entries(battle)) {
        summed.push({
          userId: key,
          spend: value.reduce((prev, _, index, arr) => { return prev + (arr[index].price * arr[index].quantity); }, 0),
          currentValue: "calculate later"
        });
      }
    });

    return myBattles;
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
