import type {StackNavigationProp} from '@react-navigation/stack';

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

export type RootStackParamList = {
  BattlePortfolio: {
    battle: Battle;
    userId: string;
  };
  BuySellStock: {
    stock: Stock;
    shares_owned: number;
    average_cost: number;
    battleId: string;
    userId: string;
    currentUserPortfolio: PortfolioStock[];
    setCurrentUserPortfolio: React.Dispatch<
      React.SetStateAction<PortfolioStock[]>
    >;
  };
  MyBattles: {
    userId: string;
  };
  CreateBattle: undefined;
};

export type ProfileScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

export type LoginScreenNavigationProp =
  StackNavigationProp<LoginStackParamList>;

export type User = {
  id: string;
  google_id: string | null;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
  watchlist: string[];
};

export type Portfolio = {
  currentValue: number;
  familyName: string;
  givenName: string;
  google_id: string;
  id: number;
  photo: string;
  remainingBudget: number;
  stocks: object;
};

export type Battle = {
  id: string;
  users: Portfolio[];
  start_date: string;
  end_date: string;
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
  battleId: string;
  userId: string;
  action: string;
  symbol: string;
  price: number;
  quantity: number;
  // transaction_timestamp: string;
};

export type GraphPoint = {
  t: number;
  vw: number;
};

export type HistoricalData = {
  results: GraphPoint[];
};

export type BuySellProps = {
  price: number;
  quantitySelected: number;
  quantityAvailable: number;
  setQuantitySelected: React.Dispatch<React.SetStateAction<number>>;
  setQuantityAvailable: React.Dispatch<React.SetStateAction<number>>;
  setBuySellViewable: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUserPortfolio: React.Dispatch<
    React.SetStateAction<PortfolioStock[]>
  >;
  currentUserPortfolio: PortfolioStock[];
  buySellViewable: boolean;
  stock: Stock;
  battleId: string;
  userId: string;
};
