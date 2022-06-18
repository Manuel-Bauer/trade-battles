// const pool = require('./index');
// const table_name = 'users';
// const { v4 } = require('uuid');
// const transaction_model = require('./transactions.model');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllUsers() {
  try {
    const allUsers = await prisma.user.findMany({});
    return allUsers;
  } catch (err) {
    throw err;
  }
}

async function createUser(data) {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (err) {
    throw err;
  }
}

async function getUser(id) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        google_id: id,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function updateWatchlist(id, updatedWatchlist) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { watchlist: updatedWatchlist },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = { getAllUsers, createUser, getUser, updateWatchlist };

// exports.getUser = async (id) => {
//   const user = await pool.query(`SELECT * FROM ${table_name} WHERE user_id = '${id}'`);
//   return user.rows;
// };

// exports.createUser = async (user) => {
//   console.log('inside create');

//   const sql = `INSERT INTO ${table_name} (user_id, first_name, last_name, photo, email, transactions, battles, current_gains_losses) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
//   const values = [user.id ? user.id : v4(), user.givenName, user.familyName, user.photo, user.email, [], [], {}];
//   pool.query(sql, values);
//   return user;
// };

// exports.getUserPortfolio = async (user_id, battle_id) => {
//   let transactions = await transaction_model.filterTransactionsByUserIdBattleId(user_id, battle_id);
//   let transactionsArray = transactions.rows;

//   // console.log(transactionsArray);

//   const userPortfolio = [];
//   const uniqueSymbols = {};

//   for (let i = 0; i < transactionsArray.length; i++) {
//     if (!uniqueSymbols[transactionsArray[i].symbol]) {
//       uniqueSymbols[transactionsArray[i].symbol] = true;
//     }
//   }

//   // console.log(Object.keys(uniqueSymbols));

//   let stock = {
//     price: 0,
//     symbol: '',
//     change: 0,
//     quantity: 0,
//     averageCost: 0,
//     gain_loss: 0,
//   };

//   let key = 0;
//   let currentSymbol = Object.keys(uniqueSymbols)[key];
//   for (let i = 0; i < transactionsArray.length; i++) {
//     let currentStock = transactionsArray[i];
//     // console.log(currentStock);
//     if (currentStock.symbol !== currentSymbol) {
//       // stock changed...
//       // push stock to userPortfolio
//       userPortfolio.push(stock);
//       // set stock to default
//       stock = {
//         price: 0,
//         symbol: '',
//         change: 0,
//         quantity: 0,
//         averageCost: 0,
//         gain_loss: 0,
//       };

//       key++;
//       currentSymbol = Object.keys(uniqueSymbols)[key];
//     }

//     // stock remains the same
//     stock.symbol = currentStock.symbol;
//     if (currentStock.action === 'BUY') {
//       let tempQuantity = stock.quantity;
//       stock.quantity += Number(currentStock.quantity);
//       // console.log(stock.symbol, stock.quantity);
//       let tempAvCost = stock.averageCost;

//       stock.averageCost =
//         (tempQuantity * tempAvCost + Number(currentStock.quantity) * Number(currentStock.price)) / stock.quantity;
//     } else {
//       stock.quantity -= Number(currentStock.quantity);
//       // console.log(stock.symbol, stock.quantity);
//       stock.gain_loss += (currentStock.price - stock.averageCost) * currentStock.quantity; // TODO -> CHECK NUMBERS
//     }

//     if (key >= Object.keys(uniqueSymbols).length - 1 && !userPortfolio[key]) {
//       userPortfolio.push(stock);
//     }
//   }

//   userPortfolio.sort((a, b) => a.symbol - b.symbol);
//   console.log(userPortfolio);
//   return userPortfolio;
// };

// exports.addBattleToUser = async (id, battle) => {
//   const user = await pool.query(
//     `UPDATE ${table_name} SET battles = array_append(battles, '${battle}') WHERE user_id  = '${id}'`
//   );
//   return user;
// };
// exports.deleteUser = async (id) => {};

// exports.updateProfit = async (user_id, current_profit, battle_id) => {
//   console.log('inside update profit', current_profit);
//   const user = await pool.query(
//     `UPDATE ${table_name} SET current_gains_losses = current_gains_losses || '{"${battle_id}":${current_profit.gain_loss}}' WHERE user_id  = '${user_id}'`
//   );
//   return user;
// };

// exports.updateWatchlist = async (user_id, watchlistStock) => {
//   console.log('inside update watchlist', watchlistStock);
//   const user = await this.getUser(user_id);
//   const isInWatchlist = user[0].watchlist.includes(watchlistStock.stock);

//   isInWatchlist
//     ? await pool.query(
//         `UPDATE ${table_name} SET watchlist = array_remove(watchlist, '${watchlistStock.stock}') WHERE user_id  = '${user_id}'`
//       )
//     : await pool.query(
//         `UPDATE ${table_name} SET watchlist = array_append(watchlist, '${watchlistStock.stock}') WHERE user_id  = '${user_id}'`
//       );
// };
