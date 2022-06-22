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
const node_fetch_1 = require("node-fetch");
require('dotenv').config(); // ❓❔
const IEXapibaseurl = 'https://cloud.iexapis.com/stable';
const PoligonApiBaseUrl = 'https://api.polygon.io/v2/aggs/ticker';
exports.getQuote = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    const quote = yield (0, node_fetch_1.fetch)(`${IEXapibaseurl}/stock/${symbol.toLowerCase()}/quote?token=${process.env.IEX_API_KEY}`).then((res) => res.json());
    return quote;
});
exports.getHistoricalData = (ticker, periodicity, periodicity_unit, start_date, end_date) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${PoligonApiBaseUrl}/${ticker.toUpperCase()}/range/${periodicity_unit}/${periodicity}/${start_date}/${end_date}?adjusted=true&sort=asc`;
    const data = yield (0, node_fetch_1.fetch)(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.POLYGON_API_KEY}`,
        },
    }).then((res) => res.json());
    return data;
});
