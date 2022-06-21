var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function getAllUsers(ctx = { prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield ctx.prisma.user.findMany({});
            return allUsers;
        }
        catch (err) {
            throw err;
        }
    });
}
function createUser(data, ctx = { prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield ctx.prisma.user.create({
                data: {
                    google_id: data.id,
                    givenName: data.givenName,
                    familyName: data.familyName,
                    photo: data.photo,
                    email: data.email,
                },
            });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function getUser(google_id, ctx = { prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield ctx.prisma.user.findUnique({
                where: {
                    google_id: google_id,
                },
            });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function updateWatchlist(id, updatedWatchlist, ctx = { prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield ctx.prisma.user.update({
                where: { id },
                data: { watchlist: updatedWatchlist },
            });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
module.exports = { getAllUsers, createUser, getUser, updateWatchlist };
