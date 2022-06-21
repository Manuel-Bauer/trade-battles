const express = require('express');
const app = express();
const router = require('./router.js');
const PORT = 3000;
const { getAllUsers, createUser, getUser, updateWatchlist } = require('./models/users.model');
const { createTransaction, getAllTransactions } = require('./models/transactions.model');
const { createBattle, getMyBattles } = require('./models/battles.model');
app.use(express.json());
app.use(router);
// getAllUsers().then((res) => console.log('getAllUser     ', res));
// addToWatchlist(1, 'AAPL').then((res) => console.log(res));
// getAllUsers().then((res) => console.log('getAllUser     ', res));
// removeFromWatchlist(1, 'AAPL').then((res) => console.log(res));
// getAllUsers().then((res) => console.log('getAllUser     ', res));
// getUser(1).then((res) => console.log('getUser       ', res));
// updateUserWatchlist(1, 'xxx').then((res) => console.log(res));
// createBattle({
//   userId: 1,
//   battle_name: 'Codewars',
//   end_date: new Date(),
// }).then((res) => console.log(res));
// getAllTransactions().then((res) => console.log(res));
// createUser({
//   id: 'asdfasdf',
//   email: 'fasdfasdd@gmail.com',
//   givenName: 'Sam',
//   familyName: 'Fanhais',
//   photo: 'dausfgkjahsdgfkjahbsd',
//   watchlist: ['stuff', 'more stuff'],
// }).then((res) => console.log(res));
// createTransaction({
//   battleId: 1,
//   userId: 1,
//   date: new Date(),
//   action: 'BUY',
//   symbol: 'Svelte',
//   price: 100000,
//   quantity: 1,
// }).then((res) => console.log(res));
// createBattle({
// users: [
//   {
//     id: 2,
//     google_id: '106470850040926178456',
//     givenName: 'Maxim',
//     familyName: 'Buz',
//     photo: 'https://lh3.googleusercontent.com/a-/AOh14GhQyMnqvEtZUdTfoXrIRX4tvdplfKyCQzWM7nCUpYs=s120',
//     email: 'mbuz.maxim@gmail.com',
//     watchlist: [],
//   },
//   {
//     id: 3,
//     google_id: '113650057549444546625',
//     givenName: 'Samuel',
//     familyName: 'Björk Fanhais',
//     photo: 'https://lh3.googleusercontent.com/a-/AOh14Gjh-jccpVvTIAzbFEVlWt-AFtizUiHPDhf9YhHv=s120',
//     email: 'samuelfanhais@gmail.com',
//     watchlist: [],
//   },
//   {
//     id: 4,
//     google_id: '104978883313255300075',
//     givenName: 'Manuel',
//     familyName: 'Bauer',
//     photo: 'https://lh3.googleusercontent.com/a/AATXAJxpgVPFSsTFNDmUp75Yx3Ee_-YbRxsRQQojb8eH=s120',
//     email: 'manuel.c.bauer@googlemail.com',
//     watchlist: [],
//   },
//   {
//     id: 1,
//     google_id: '114312890428629542973',
//     givenName: 'Mitchell',
//     familyName: 'Smith',
//     photo: 'https://lh3.googleusercontent.com/a/AATXAJx6G_9ed-1znWVGzNQO1nojcq6XYezTFY5ieHjP=s120',
//     email: 'demouser742@gmail.com',
//     watchlist: ['tsla', 'aple'],
//   },
// ],
//   users: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
//   budget: 1000,
//   battle_name: 'svelte battle',
//   end_date: new Date(),
// }).then((res) => console.log(res));
app.listen(PORT, () => {
    console.log(`We are in boys... http://localhost:${PORT}`);
});
