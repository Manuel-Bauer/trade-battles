
export async function createTransaction(
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

export async function getAllTransactions(ctx = { prisma }): Promise<Transaction[]> {
  try {
    const allTransactions = await ctx.prisma.transaction.findMany({});
    return allTransactions;
  } catch (err) {
    throw err;
  }
}

