"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createBattle(data, ctx = { prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const battle = yield ctx.prisma.battle.create({
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
        }
        catch (err) {
            throw err;
        }
    });
}
function getMyBattles(userId, ctx = { prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const myBattles = yield ctx.prisma.battle.findMany({
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
        }
        catch (err) {
            throw err;
        }
    });
}
function updateBattle(battleId, update, ctx = { prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const battle = yield ctx.prisma.battle.update({
                where: { id: +battleId },
                data: Object.assign({}, update),
            });
            return battle;
        }
        catch (err) {
            throw err;
        }
    });
}
module.exports = { createBattle, getMyBattles, updateBattle };
