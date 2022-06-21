var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { createBattle, getMyBattles, updateBattle } = require("../models/battles.model");
exports.getMyBattles = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const myBattles = yield getMyBattles(req.params['user_id']);
        res.send(myBattles);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.postBattle = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const battle = yield createBattle(req.body);
        res.send(battle);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.patchBattleMembers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const battle = yield updateBattleMembers(req.params['battle_id'], req.body);
        res.send(battle.rows);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.updateBattle = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const battle_id = +req.params['battle_id'];
        const battle = yield updateBattle(battle_id, req.body);
        res.send(battle);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
