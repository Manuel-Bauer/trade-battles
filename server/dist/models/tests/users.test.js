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
const context_1 = require("../../testing/context");
const mocks_1 = require("../../testing/mocks");
//@ts-ignore
const users_model_1 = require("../users.model");
let mockCtx;
let ctx;
beforeEach(() => {
    mockCtx = (0, context_1.createMockContext)();
    ctx = mockCtx;
});
test('should creat new users', () => __awaiter(void 0, void 0, void 0, function* () {
    mockCtx.prisma.user.create.mockResolvedValue(mocks_1.firstUser);
    yield expect((0, users_model_1.createUser)(mocks_1.firstUser, ctx)).resolves.toEqual(mocks_1.firstUser);
    mockCtx.prisma.user.create.mockResolvedValue(mocks_1.secondUser);
    yield expect((0, users_model_1.createUser)(mocks_1.secondUser, ctx)).resolves.toEqual(mocks_1.secondUser);
}));
test('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
    mockCtx.prisma.user.findMany.mockResolvedValue([mocks_1.firstUser, mocks_1.secondUser]);
    yield expect((0, users_model_1.getAllUsers)(ctx)).resolves.toEqual([mocks_1.firstUser, mocks_1.secondUser]);
}));
test('should get a single user by google id', () => __awaiter(void 0, void 0, void 0, function* () {
    mockCtx.prisma.user.findUnique.mockResolvedValue(mocks_1.secondUser);
    yield expect((0, users_model_1.getUser)('1302rnou2ü38', ctx)).resolves.toEqual(mocks_1.secondUser);
}));
test('should update watchlist of users', () => __awaiter(void 0, void 0, void 0, function* () {
    mockCtx.prisma.user.update.mockResolvedValue(Object.assign(Object.assign({}, mocks_1.secondUser), { watchlist: ['TSLA'] }));
    yield expect((0, users_model_1.updateWatchlist)('1302rnou2ü38', ['TSLA'], ctx)).resolves.toEqual(Object.assign(Object.assign({}, mocks_1.secondUser), { watchlist: ['TSLA'] }));
}));
test('should not create italian users', () => __awaiter(void 0, void 0, void 0, function* () {
    mockCtx.prisma.user.create.mockRejectedValue(new Error());
    yield expect((0, users_model_1.createUser)(mocks_1.incorrectUser, ctx)).rejects.toEqual(new Error());
}));
