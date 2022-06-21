var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetch = require('node-fetch');
require('dotenv').config();
const IEXapibaseurl = 'https://cloud.iexapis.com/stable';
const PoligonApiBaseUrl = 'https://api.polygon.io/v2/aggs/ticker';
exports.getQuote = (symbol) => __awaiter(this, void 0, void 0, function* () {
    const quote = yield fetch(`${IEXapibaseurl}/stock/${symbol.toLowerCase()}/quote?token=${process.env.IEX_API_KEY}`).then((res) => res.json());
    console.log(quote);
    return quote;
});
exports.getHistoricalData = (ticker, periodicity, periodicity_unit, start_date, end_date) => __awaiter(this, void 0, void 0, function* () {
    console.log('inside getHistorical');
    const convertDate = (timestamp) => {
        date = new Date(Number(timestamp));
        return date.toISOString().split('T').slice(0, 1).join('');
    };
    const startDate = convertDate(start_date);
    const endDate = convertDate(end_date);
    const url = `${PoligonApiBaseUrl}/${ticker.toUpperCase()}/range/${periodicity_unit}/${periodicity}/${start_date}/${end_date}?adjusted=true&sort=asc`;
    console.log(url);
    const data = yield fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.POLYGON_API_KEY}`,
        },
    }).then((res) => res.json());
    console.log(data);
    return data;
});
