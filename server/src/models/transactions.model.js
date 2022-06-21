const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTransaction(data) {
  try {
    const transaction = await prisma.transaction.create({
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

async function getAllTransactions() {
  try {
    const allTransactions = await prisma.transaction.findMany({});
    return allTransactions;
  } catch (err) {
    throw err;
  }
}

module.exports = { createTransaction, getAllTransactions };