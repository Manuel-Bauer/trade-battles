"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router = require('./router.js');
const PORT = 3000;
app.use(express_1.default.json());
app.use(router);
app.listen(PORT, () => {
    console.log(`We are in boys... http://localhost:${PORT}`);
});
