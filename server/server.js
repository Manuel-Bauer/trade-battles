const express = require('express');
const app = express();
const router = require('./router.js');
const PORT = 3000;
const { getAllUsers, createUser, getUser, updateUserWatchlist } = require('./models/users.model');
const { createTransaction, getAllTransactions } = require('./models/transactions.model');
const { createBattle, getMyBattles } = require('./models/battles.model');

app.use(express.json());
app.use(router);

// getAllUsers().then((res) => console.log('getAllUser     ', res));
// getUser(1).then((res) => console.log('getUser       ', res));
// updateUserWatchlist(1, 'xxx').then((res) => console.log(res));
// createBattle({
//   userId: 1,
//   battle_name: 'Codewars',
//   end_date: new Date(),
// }).then((res) => console.log(res));

// getAllTransactions().then((res) => console.log(res));

// createTransaction({
//   battleId: 1,
//   userId: 1,
//   date: new Date(),
//   action: 'BUY',
//   symbol: 'Svelte',
//   price: 100000,
//   quantity: 1,
// }).then((res) => console.log(res));

getMyBattles(1).then((res) => console.log(res));

app.listen(PORT, () => {
  console.log(`We are in boys... http://localhost:${PORT}`);
});
