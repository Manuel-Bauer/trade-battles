var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const quotes_model = require("../models/quotes.model");
exports.getQuote = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const quote = yield quotes_model.getQuote(req.params["symbol"]);
        res.send(quote);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.getHistoricalData = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const data = yield quotes_model.getHistoricalData(req.params["ticker"], req.params["periodicity"], req.params["periodicity_unit"], req.params["start_date"], req.params["end_date"]);
        res.send(data);
        res.status(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
