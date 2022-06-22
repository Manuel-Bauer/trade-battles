const { getQuote } = require('./quotes.model');

const groupBy = (array, key) => {
  if (!array) return null;
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

function calculateAverage (values) {
  return values.reduce((m, x, i) => m + (x - m) / (i + 1), 0);
}

function calculateTotalBought (transactions) {
  return transactions.reduce((prev, _, index, arr) => {
    if (arr[index].action == "BUY") return prev + (arr[index].price * arr[index].quantity);
    else return prev;
  }, 0);
}

function calculateTotalSold (transactions) {
  return transactions.reduce((prev, _, index, arr) => {
    if (arr[index].action == "SELL") return prev + (arr[index].price * arr[index].quantity);
    else return prev;
  }, 0);
}

function calculateQuantity (transactions) {
  return transactions.reduce((prev, _, index, arr) => {
    if (arr[index].action == "BUY") return prev + (arr[index].quantity);
    if (arr[index].action == "SELL") return prev - (arr[index].quantity);
  }, 0);
}

const calculateStockStats = (transactionsPerStock, currentPrices) => {
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
      averageBuyIn: calculateAverage(value.filter(transaction => transaction.action == "BUY").map(transaction => transaction.price))
    };
  });
  return result;
};

const calculatePortfolioStats = (startBudget, stockTransactions) => {
  let remainingBudget = startBudget;
  let portfolioValue = null;
  if (stockTransactions) {
    for ([_, stock] of Object.entries(stockTransactions)) {
      remainingBudget = remainingBudget - stock.totalBought + stock.totalSold;
    }
    portfolioValue = remainingBudget;
    for ([_, stock] of Object.entries(stockTransactions)) {
      portfolioValue = portfolioValue + stock.totalValue;
    }
  }
  return { remainingBudget, portfolioValue };
};

async function getCurrentPrices (tickers) {
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

function getUsersFromBattles (battles) {
  const users = {};
  battles.forEach(battle => {
    battle.users.forEach(user => { users[user.id] = user; });
  });
  return users;
}

function getTickersFromBattles (battles) {
  const allTransactions = battles.reduce((prev, curr) => [...prev, ...curr.transaction], []);
  return [... new Set(allTransactions.map(transaction => transaction.symbol))];
}

module.exports = {
  groupBy,
  calculateStockStats,
  calculatePortfolioStats,
  getCurrentPrices,
  getUsersFromBattles,
  getTickersFromBattles,
};