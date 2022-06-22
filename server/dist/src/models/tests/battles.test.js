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
const mocks_1 = require("./../../testing/mocks");
const client_1 = __importDefault(require("../../testing/client"));
const mocks_2 = require("../../testing/mocks");
//@ts-ignore
const battles_model_1 = require("../battles.model");
//@ts-ignore
const users_model_1 = require("../users.model");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, users_model_1.createUser)(mocks_2.firstUserInput);
    yield (0, users_model_1.createUser)(mocks_2.secondUserInput);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.user.deleteMany();
    yield client_1.default.battle.deleteMany();
    yield client_1.default.transaction.deleteMany();
}));
test('should create new battle', () => __awaiter(void 0, void 0, void 0, function* () {
    const firstBattle = yield (0, battles_model_1.createBattle)(mocks_2.firstBattleInput);
    expect(Object.assign(Object.assign({}, firstBattle), { id: mocks_2.firstBattleResult.id })).toEqual(mocks_2.firstBattleResult);
    const secondBattle = yield (0, battles_model_1.createBattle)(mocks_1.secondBattleInput);
    expect(Object.assign(Object.assign({}, secondBattle), { id: mocks_1.secondBattleResult.id })).toEqual(mocks_1.secondBattleResult);
}));
test('should get all battles', () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_model_1.getUser)(mocks_2.firstUserInput.id);
    const battles = yield (0, battles_model_1.getMyBattles)(user.id);
    expect(battles.length).toBe(2);
    expect(Object.assign(Object.assign({}, battles[0]), { id: mocks_2.firstBattleResult.id })).toEqual(Object.assign(Object.assign({}, mocks_2.firstBattleResult), { transaction: [] }));
    expect(Object.assign(Object.assign({}, battles[1]), { id: mocks_1.secondBattleResult.id })).toEqual(Object.assign(Object.assign({}, mocks_1.secondBattleResult), { transaction: [] }));
}));
/* NOT IMPLEMENTED YET */
test('should finish battle and save the winner id', () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_model_1.getUser)(mocks_2.firstUserInput.id);
    const battles = yield (0, battles_model_1.getMyBattles)(user.id);
    const updatedBattle = yield (0, battles_model_1.updateBattle)(battles[0].id, (0, mocks_1.getFirstBattleUpdate)(user.givenName));
}));
