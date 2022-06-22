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
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function createTransaction(data, ctx = { prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield ctx.prisma.transaction.create({
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
        }
        catch (err) {
            throw err;
        }
    });
}
function getAllTransactions(ctx = { prisma }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allTransactions = yield ctx.prisma.transaction.findMany({});
            return allTransactions;
        }
        catch (err) {
            throw err;
        }
    });
}
module.exports = { createTransaction, getAllTransactions };
