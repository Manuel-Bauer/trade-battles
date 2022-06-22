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
const users_model = require('../models/users.model');
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_model.getAllUsers();
        res.send(users);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model.getUser(req.params['id']);
        res.send(user);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model.createUser(req.body);
        res.send(user);
        res.status(201);
    }
    catch (error) {
        // TODO, ERROR HANDLING FOR CREATING A USER WITH AN EXISTING USERNAME
        console.error(error);
        res.sendStatus(500);
    }
});
exports.addBattleToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model.addBattleToUser(req.params['user_id'], req.params['battle_id']);
        res.send({ status: 'Update succesful' });
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model.deleteUser(req.params['id']);
        res.send(user);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.getUserPortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPortfolio = yield users_model.getUserPortfolio(req.params['user_id'], req.params['battle_id']);
        res.send(userPortfolio);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.patchProfit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model.updateProfit(req.params['user_id'], req.body, req.params['battle_id']);
        res.send({ status: 'Update succesful' });
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.patchWatchlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model.updateWatchlist(req.params['user_id'], req.body);
        res.send({ status: 'Update succesful' });
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
