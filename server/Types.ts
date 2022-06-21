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
  id: string;
  google_id: string | null;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
  watchlist: string[];
  current_gains_losses: any;
};

export type Battle = {
  battle_id: string;
  users: User[];
  start_date_timestamp: string;
  end_date_timestamp: string;
  battle_name: string;
  budget: Number;
  completed?: boolean;
  winner?: string;
};

export type BattleMember = {
  id: string;
};

export type Transaction = {
  // transaction_id: string;
  battle_id: string;
  user_id: string;
  action: string;
  symbol: string;
  price: number;
  quantity: number;
  // transaction_timestamp: string;
};
