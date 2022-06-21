var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const transactions_model = require("../models/transactions.model");
exports.getAllTransactions = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const transactions = yield transactions_model.getAllTransactions();
        res.send(transactions.rows);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.getTransactionsByBattle = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const transactions = yield transactions_model.getTransactionsByBattle(req.params["id"]);
        res.send(transactions.rows);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.getTransaction = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const transaction = yield transactions_model.getTransaction(req.params["id"]);
        res.send(transaction.rows);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.postTransaction = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const transaction = yield transactions_model.createTransaction(req.body);
        res.status(201);
        res.send(req.body);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.deleteTransaction = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const transaction = yield transactions_model.deleteTransaction(req.params["id"]);
        res.status(200);
        res.send(transaction);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
