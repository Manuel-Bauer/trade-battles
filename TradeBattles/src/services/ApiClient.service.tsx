import {Battle, User, HistoricalData, PortfolioStock, BattleMember} from '../shared/Types';
import axios from 'axios';
import type {Stock} from '../shared/Types';
import type {Transaction, GraphPoint} from '../shared/Types';

const port = 3000;
const baseUrl = `http://localhost:${port}`;
// const baseUrl = `http://localhost:${port}`;
export const ApiClient = {
  getMyBattles: async (userId: string) => {
    const myBattles = await axios.get(`${baseUrl}/battles/${userId}`);
    return myBattles;
  },

  getUserPortfolio: async (userId: string, battleId: string) => {
    const portfolio = await axios.get<PortfolioStock[]>(
      `${baseUrl}/users/portfolio/${userId}/${battleId}`,
    );
    return portfolio;
  },

  getQuote: async (ticker: string) => {
    const quote = await axios.get<Stock>(`${baseUrl}/quote/${ticker}`);
    return quote;
  },

  getUserById: async (id: string) => {
    const user = await axios.get<User>(`${baseUrl}/users/${id}`);
    return user;
  },

  handleSignIn: async (user: User) => {
    const dbUser = await ApiClient.getUserById(user.id);
    console.warn(dbUser.data, 'HANDLE SIGN IN');
    if (dbUser.data.length === 0) {
      ApiClient.createUser(user);
      console.warn('User succesfully created');
    } else {
      console.warn('User succesfully logged in');
    }
    return dbUser;
  },

  createUser: async (user: User) => {
    axios.post(`${baseUrl}/users/`, {
      id: user.id,
      givenName: user.givenName,
      familyName: user.familyName,
      photo: user.photo,
      email: user.email,
    });
  },

  postTransaction: async (transaction: Transaction) => {
    axios.post(`${baseUrl}/transactions`, {
      battleId: transaction.battleId,
      userId: transaction.userId,
      action: transaction.action,
      symbol: transaction.symbol,
      price: Math.floor(transaction.price),
      quantity: transaction.quantity,
    });
  },

  getHistoricalData: async (
    ticker: string,
    periodicity: string,
    periodicity_unit: number,
    start_date: number,
    end_date: number,
  ) => {
    console.log('inside apicall client');
    const data = await axios.get<HistoricalData>(
      `${baseUrl}/quote/historical/data/${ticker}/${periodicity}/${periodicity_unit}/${start_date}/${end_date}`,
    );
    // console.log(data);
    return data;
  },

  getAllUsers: async () => {
    const data = await axios.get<User[]>(`${baseUrl}/users`);
    return data;
  },

  createBattle: async (
    users: BattleMember[],
    start_date: string,
    end_date: string,
    battle_name: string,
    budget: number,
  ) => {
    const data = {users, start_date, end_date, battle_name, budget};
    const battle = await fetch(`${baseUrl}/battles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(battle);
    return battle;
  },

  updateUserProfit: async (
    userId: string,
    gain_loss: number,
    battleId: string,
  ) => {
    const user = await axios.patch(
      `${baseUrl}/users/profit/${userId}/${battleId}`,
      {
        gain_loss: gain_loss,
      },
    );
    return user;
  },

  updateUserWatchlist: async (userId: string, stock: string) => {
    const user = await axios.patch(`${baseUrl}/users/watchlist/${userId}`, {
      stock: stock,
    });
    return user;
  },
};
