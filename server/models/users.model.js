const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllUsers(ctx = prisma) {
  try {
    const allUsers = await ctx.prisma.user.findMany({});
    return allUsers;
  } catch (err) {
    throw err;
  }
}

async function createUser(data, ctx = prisma) {
  try {
    const user = await ctx.prisma.user.create({
      data: {
        google_id: data.id,
        givenName: data.givenName,
        familyName: data.familyName,
        photo: data.photo,
        email: data.email,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function getUser(google_id, ctx = prisma) {
  try {
    const user = await ctx.prisma.user.findUnique({
      where: {
        google_id: google_id,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function updateWatchlist(id, updatedWatchlist, ctx = prisma) {
  try {
    const user = await ctx.prisma.user.update({
      where: { id },
      data: { watchlist: updatedWatchlist },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = { getAllUsers, createUser, getUser, updateWatchlist };