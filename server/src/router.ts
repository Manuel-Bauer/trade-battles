const router = require('express').Router();
const transactions_controller = require('./controllers/transactions.controller');
const battles_controller = require('./controllers/battles.controller');
const users_controller = require('./controllers/users.controller');
const quote_controller = require('./controllers/quotes.controller');

// Transactions
router.get('/transactions', transactions_controller.getAllTransactions);
router.get('/transactions/:id', transactions_controller.getTransaction);
router.get(
  '/transactions/battle/:id',
  transactions_controller.getTransactionsByBattle
);
router.post('/transactions', transactions_controller.postTransaction);
router.delete('/transactions/:id', transactions_controller.deleteTransaction);

// Battles
router.post('/battles', battles_controller.postBattle);
router.get('/battles/:user_id', battles_controller.getMyBattles);
// router.patch(
//   '/battles/members/:battle_id',
//   battles_controller.patchBattleMembers
// );
router.patch('/battles/:battle_id', battles_controller.updateBattle);

// Users
router.get('/users', users_controller.getAllUsers);
router.get('/users/:id', users_controller.getUser);
router.post('/users', users_controller.postUser);
// router.put(
// 	"/users/add/battle/:user_id/:battle_id",
// 	users_controller.addBattleToUser
// );
// router.patch("/users/profit/:user_id/:battle_id", users_controller.patchProfit);
router.patch('/users/watchlist/:user_id', users_controller.patchWatchlist);

// router.delete("/users/:id", users_controller.deleteUser);

// router.get(
// 	"/users/portfolio/:user_id/:battle_id",
// 	users_controller.getUserPortfolio
// );

// Quote
router.get('/quote/:symbol', quote_controller.getQuote);
router.get(
  '/quote/historical/data/:ticker/:periodicity/:periodicity_unit/:start_date/:end_date',
  quote_controller.getHistoricalData
);

module.exports = router;
