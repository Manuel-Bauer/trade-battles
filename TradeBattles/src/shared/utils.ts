import { useTransition } from 'react';
import {ApiClient} from '../services/ApiClient.service';

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export async function getSortedRanks(transactions, battleId) {
  // await priceChange(transactions);
  const mappedTransactions = await mapTransactionsToID(transactions);
  for (let i = 0; i < mappedTransactions.length; i++) {
    console.log(mapTransactionsToID[i])
    transactions = {};
    for (let k = 0; k < mappedTransactions[i].transactions.length; k++) {
      if (transactions[mappedTransactions[i].transactions[k].symbol]) {
        transactions[mappedTransactions[i].transactions[k].symbol] += {
          totalPrice:
            mappedTransactions[i].transactions[k].quantity *
            mappedTransactions[i].transactions[k].price,
        };
      } else {
        transactions[mappedTransactions[i].transactions[k].symbol] = {
          totalPrice:
            mappedTransactions[i].transactions[k].quantity *
            mappedTransactions[i].transactions[k].price,
        };
      }
    }
    const portfolio = {
      user: mappedTransactions[i].userId,
      transactions: transactions,
    };
    console.log('PORT', portfolio);
  }
}

export async function mapTransactionsToID(transactions) {
  const users = [];
  const userTransactions = [];
  transactions.forEach(el => {
    if (!users.includes(el.userId)) {
      const filterTransactions = transactions.filter(
        transaction => transaction.userId === el.userId,
      );
      users.push(el.userId);
      userTransactions.push({
        userId: el.userId,
        transactions: filterTransactions,
      });
    }
  });
  // console.log('bsada', userTransactions[0].transactions);
  // console.log('FILTEREDTRANSACTIONS', userTransactions);
  return userTransactions;
}

export function getFormattedPL(member, battleId) {
  return formatter.format(
    member.current_gains_losses[String(battleId)]
      ? member.current_gains_losses[String(battleId)]
      : 0,
  );
}

export function getOrderEnding(pos: number) {
  const lastNumber = Number(String(pos)[String(pos).length - 1]);
  switch (lastNumber) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    case 4 || 5 || 6 || 7 || 8 || 9 || 0:
      return 'th';
    default:
      return 'th';
  }
}

export function subtractYears(numOfYears: number, date = new Date()) {
  date.setFullYear(date.getFullYear() - numOfYears);
  return date;
}

export async function priceChange(transactions) {
  await Promise.all(
    transactions.map(async el => {
      const quote = await ApiClient.getQuote(el.symbol);
      el.latestPrice = quote.data.latestPrice;
      el.priceChange = el.latestPrice - el.price;
    }),
  );
}

//users:
// [
//   {
//     id: 1;
//     transactions: [
//       {
//         symbol: AAPL (aggregated)
//         averagepricechange:
//       }
//     ]
//     totalprofit:
//   }
//   {
//     id
//   }
// ]

