//@ts-nocheck
import { getQuote } from "./quotes.model";
var memoize = require('underscore/cjs/memoize.js');

export const groupBy = memoize(function (array, key) {
  if (!array) return null;
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
});


export const calculateAverage = memoize(function (values) {
  return values.reduce((m, x, i) => m + (x - m) / (i + 1), 0);
});


export const calculateTotalBought = memoize(function (transactions) {
  return transactions.reduce((prev, _, index, arr) => {
    if (arr[index].action == "BUY") return prev + (arr[index].price * arr[index].quantity);
    else return prev;
  }, 0);
});


export const calculateTotalSold = memoize(function (transactions) {
  return transactions.reduce((prev, _, index, arr) => {
    if (arr[index].action == "SELL") return prev + (arr[index].price * arr[index].quantity);
    else return prev;
  }, 0);
}
);


export const calculateQuantity = memoize(function (transactions) {
  return transactions.reduce((prev, _, index, arr) => {
    if (arr[index].action == "BUY") return prev + (arr[index].quantity);
    if (arr[index].action == "SELL") return prev - (arr[index].quantity);
  }, 0);
});


export function calculateStockStats (transactionsPerStock, currentPrices) {
  if (!transactionsPerStock) return null;
  const result = {};
  Object.entries(transactionsPerStock).map((transaction) => {
    const [key, value] = transaction;
    const totalBought = calculateTotalBought(value);
    const totalSold = calculateTotalSold(value);
    const owning = calculateQuantity(value);
    const quote = currentPrices[value[0].symbol];

    result[key] = {
      owning,
      currentPrice: quote,
      totalValue: quote * owning,
      totalBought,
      totalSold,
      //@ts-ignore
      averageBuyIn: calculateAverage(value.filter(transaction => transaction.action == "BUY").map(transaction => transaction.price))
    };
  });
  return result;
};

export function calculatePortfolioStats (startBudget, stockTransactions) {
  let remainingBudget = startBudget;
  let portfolioValue = null;
  if (stockTransactions) {
    for (const [_, stock] of Object.entries(stockTransactions)) {
      //@ts-ignore
      remainingBudget = remainingBudget - stock.totalBought + stock.totalSold;
    }
    portfolioValue = remainingBudget;
    for (const [_, stock] of Object.entries(stockTransactions)) {
      //@ts-ignore
      portfolioValue = portfolioValue + stock.totalValue;
    }
  }
  return { remainingBudget, portfolioValue };
};

export async function getCurrentPrices (tickers) {
  try {
    const stockPrices = {};
    await Promise.all(tickers.map(async (ticker) => {
      const quote = (await getQuote(ticker)).latestPrice;
      stockPrices[ticker] = quote;
    }));

    return stockPrices;
  } catch (err) {
    console.log(err);
  }
}

export const getUsersFromBattles = memoize(function (battles) {
  const users = {};
  battles.forEach(battle => {
    battle.users.forEach(user => { users[user.id] = user; });
  });
  return users;
});


export const getTickersFromBattles = memoize(function (battles) {
  const allTransactions = battles.reduce((prev, curr) => [...prev, ...curr.transaction], []);
  return [... new Set(allTransactions.map(transaction => transaction.symbol))];
});

