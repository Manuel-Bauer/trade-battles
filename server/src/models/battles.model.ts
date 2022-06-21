import { PrismaClient } from '@prisma/client';

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

async function updateBattle(battleId, update, ctx = { prisma }) {
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

module.exports = { createBattle, getMyBattles, updateBattle };
