export type Stock = {
  open: number;
  close: number;
  change: number;
  changePercent: number;
  currency: string;
  companyName: string;
  iexAskPrice: number | null;
  iexBidPrice: number | null;
  symbol: string;
  peRatio: number;
  ytdChange: number;
  week52High: number;
  week52Low: number;
  previousClose: number;
  low: number;
  high: number;
  iexRealtimePrice: number | null;
  primaryExchange: string;
  isUSMarketOpen: boolean;
  // iexClose: number;
  latestPrice: number;
};

export type PortfolioStock = {
  price: number;
  symbol: string;
  change: number;
  quantity: number;
  averageCost: number;
  quote: Stock;
};

export type LoginStackParamList = {
  Home: undefined;
  LoginOnlySocial: undefined;
};

export type User = {
  id: number;
  google_id: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
  watchlist: string[];
};

export type userPorfolio = {
  id: number;
  givenName: string;
  familyName: string;
  photo: string;
  stocks: any;
  currentValue: number | null;
  remainingBudget: number;
}


export type Battle = {
  id: number;
  start_date: string;
  end_date: string;
  battle_name: string;
  budget: number;
  completed?: boolean;
  winner?: string;
};



export type BattleMember = {
  id: string;
};

export type Transaction = {
  // transaction_id: string;
  battleId: string;
  user_id: string;
  action: string;
  symbol: string;
  price: number;
  quantity: number;
  // transaction_timestamp: string;
};

export type Quote = {
  avgTotalVolume: number;
  calculationPrice: string;
  change: number;
  changePercent: number;
  close: number; // ❔
  closeSource: string;
  closeTime: string; // ❔
  companyName: string;
  currency: string;
  delayedPrice: number;
  delayedPriceTime: string; // ❔
  extendedChange: string; // ❔
  extendedChangePercent: number;
  extendedPrice: number;
  extendedPriceTime: string; // ❔
  high: number; // ❔
  highSource: string; //❔
  highTime: string; //❔
  iexAskPrice: number;
  iexAskSize: number;
  iexBidPrice: number;
  iexBidSize: number;
  iexClose: number;
  iexCloseTime: string;
  iexLastUpdated: string;
  iexMarketPercent: number; //❔
  iexOpen: number;
  iexOpenTime: number;
  iexRealtimePrice: number;
  iexRealtimeSize: number;
  iexVolume: number;
  lastTradeTime: number;
  latestPrice: number;
  latestSource: string;
  latestTime: string;
  latestUpdate: number;
  latestVolume: number;
  low: number;
  lowSource: string;
  lowTime: string;
  marketCap: number;
  oddLotDelayedPrice: number;
  oddLotDelayedPriceTime: number;
  open: number;
  openTime: string;
  openSource: number;
  peRatio: number;
  previousClose: number;
  previousVolume: number;
  primaryExchange: string;
  symbol: string;
  volume: number;
  week52High: number;
  week52Low: number;
  ytdChange: number;
  isUSMarketOpen: boolean;
};

export type createUserInput = {
  id: string;
  givenName: string;
  familyName: string;
  photo: string;
  email: string;
};

export type CreateBattleInput = {
  battle_name: string;
  budget: string;
  start_date: Date;
  end_date: Date;
  users: { id: number }[];
};

export type createTransactionInput = {
  battleId: number;
  userId: number;
  action: string;
  symbol: string;
  price: number;
  quantity: number;
};

type objectInHistoricalData = {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
};

export type historicalData = {
  adjusted: boolean;
  queryCount: number;
  request_id: string;
  results: objectInHistoricalData[];
  resultsCount: number;
  status: string;
  ticker: string;
};

// export type getHistoricalDataInput = {
//   ticker: string;
//   periodicity: any;
//   periodicity_unit: string;
//   start_date: string;
//   end_date: string;
// };

// {
//  "adjusted": true,
//  "queryCount": 2,
//  "request_id": "6a7e466379af0a71039d60cc78e72282",
//  "results": [
//   {
//    "c": 75.0875,
//    "h": 75.15,
//    "l": 73.7975,
//    "n": 1,
//    "o": 74.06,
//    "t": 1577941200000,
//    "v": 135647456,
//    "vw": 74.6099
//   },
//   {
//    "c": 74.3575,
//    "h": 75.145,
//    "l": 74.125,
//    "n": 1,
//    "o": 74.2875,
//    "t": 1578027600000,
//    "v": 146535512,
//    "vw": 74.7026
//   }
//  ],
//  "resultsCount": 2,
//  "status": "OK",
//  "ticker": "AAPL"
// }
