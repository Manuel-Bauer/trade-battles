import { postBattle, getMyBattles, updateBattle } from "./controllers/battles.controller";
import { getHistoricalData, getQuote } from "./controllers/quotes.controller";
import { postTransaction } from "./controllers/transactions.controller";
import { getAllUsers, getUser, patchWatchlist, postUser } from "./controllers/users.controller";

const router = require('express').Router();

// Transactions
router.post('/transactions', postTransaction);

// Battles
router.post('/battles', postBattle);
router.get('/battles/:user_id', getMyBattles);
router.patch('/battles/:battle_id', updateBattle);

// Users
router.get('/users', getAllUsers);
router.get('/users/:id',getUser);
router.post('/users', postUser);
router.patch('/users/watchlist/:user_id', patchWatchlist);

// Quote
router.get('/quote/:symbol', getQuote);
router.get(
  '/quote/historical/data/:ticker/:periodicity/:periodicity_unit/:start_date/:end_date',
  getHistoricalData
);

module.exports = router;
