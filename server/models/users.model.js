<<<<<<< HEAD:server/models/users.model.js
const { PrismaClient } = require('@prisma/client');
=======
import { PrismaClient, User } from '@prisma/client';
import { createUserInput } from '../../Types';

export {};
>>>>>>> origin/TB-39-refactor-the-backend-to-typescript-Luca:server/src/models/users.model.ts

const prisma = new PrismaClient();

async function getAllUsers (ctx = {prisma}) {
  try {
    const allUsers = await ctx.prisma.user.findMany({});
    return allUsers;
  } catch (err) {
    throw err;
  }
}

<<<<<<< HEAD:server/models/users.model.js
async function createUser(data, ctx = {prisma}) {
=======
async function createUser(
  data: createUserInput,
  ctx = { prisma }
): Promise<User> {
>>>>>>> origin/TB-39-refactor-the-backend-to-typescript-Luca:server/src/models/users.model.ts
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

<<<<<<< HEAD:server/models/users.model.js
async function getUser(google_id, ctx = {prisma}) {
=======
async function getUser(google_id: string, ctx = { prisma }): Promise<User> {
>>>>>>> origin/TB-39-refactor-the-backend-to-typescript-Luca:server/src/models/users.model.ts
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

<<<<<<< HEAD:server/models/users.model.js
async function updateWatchlist(id, updatedWatchlist, ctx = {prisma}) {
=======
async function updateWatchlist(
  id: number,
  updatedWatchlist: string[],
  ctx = { prisma }
): Promise<User> {
>>>>>>> origin/TB-39-refactor-the-backend-to-typescript-Luca:server/src/models/users.model.ts
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