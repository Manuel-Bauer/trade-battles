import { PrismaClient } from '@prisma/client';
import { Transaction } from '@prisma/client';
import { createTransactionInput } from '../../Types';

export {};

const prisma = new PrismaClient();

async function createTransaction(
  data: createTransactionInput,
  ctx = { prisma }
): Promise<Transaction> {
  try {
    const transaction = await ctx.prisma.transaction.create({
      data: {
        battleId: data.battleId,
        userId: data.userId,
        action: data.action,
        symbol: data.symbol,
        price: data.price,
        quantity: data.quantity,
      },
    });
    return transaction;
  } catch (err) {
    throw err;
  }
}

async function getAllTransactions(ctx = { prisma }): Promise<Transaction[]> {
  try {
    const allTransactions = await ctx.prisma.transaction.findMany({});
    return allTransactions;
  } catch (err) {
    throw err;
  }
}

module.exports = { createTransaction, getAllTransactions };
