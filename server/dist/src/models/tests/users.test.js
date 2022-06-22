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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanDb_1 = require("../../testing/cleanDb");
const client_1 = __importDefault(require("../../testing/client"));
const mocks_1 = require("../../testing/mocks");
//@ts-ignore
const users_model_1 = require("../users.model");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, cleanDb_1.cleanDB)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.user.deleteMany();
    yield (0, cleanDb_1.cleanDB)();
}));
test('should creat new users', () => __awaiter(void 0, void 0, void 0, function* () {
    const firstUser = yield (0, users_model_1.createUser)(mocks_1.firstUserInput);
    expect(Object.assign(Object.assign({}, firstUser), { id: mocks_1.firstUserResult.id })).toEqual(mocks_1.firstUserResult);
    const secondUser = yield (0, users_model_1.createUser)(mocks_1.secondUserInput);
    expect(Object.assign(Object.assign({}, secondUser), { id: mocks_1.secondUserResult.id })).toEqual(mocks_1.secondUserResult);
}));
test('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, users_model_1.getAllUsers)();
    expect(users.length).toBe(2);
    expect(Object.assign(Object.assign({}, users[0]), { id: mocks_1.firstUserResult.id })).toEqual(mocks_1.firstUserResult);
    expect(Object.assign(Object.assign({}, users[1]), { id: mocks_1.secondUserResult.id })).toEqual(mocks_1.secondUserResult);
}));
test('should get a single user by google id', () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_model_1.getUser)('1302rnou2ü38');
    expect(Object.assign(Object.assign({}, user), { id: mocks_1.secondUserResult.id })).toEqual(mocks_1.secondUserResult);
}));
test('should update watchlist of users', () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_model_1.getUser)('1302rnou2ü38');
    const updatedUser = yield (0, users_model_1.updateWatchlist)(user.id, ['TSLA']);
    expect(Object.assign(Object.assign({}, updatedUser), { id: mocks_1.secondUserResult.id })).toEqual(Object.assign(Object.assign({}, mocks_1.secondUserResult), { watchlist: ['TSLA'] }));
}));
test('should not create users on incorrect input', () => __awaiter(void 0, void 0, void 0, function* () {
    yield expect((0, users_model_1.createUser)(mocks_1.incorrectUserInput)).rejects.toBeInstanceOf(Error);
}));
