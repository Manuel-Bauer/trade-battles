const express = require('express');
const app = express();
const router = require('./router.js');
const PORT = 3000;
const {
  getAllUsers,
  createUser,
  getUser,
  updateWatchlist,
} = require('./models/users.model');
const {
  createTransaction,
  getAllTransactions,
} = require('./models/transactions.model');
const { createBattle, getMyBattles } = require('./models/battles.model');

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`We are in boys... http://localhost:${PORT}`);
});
