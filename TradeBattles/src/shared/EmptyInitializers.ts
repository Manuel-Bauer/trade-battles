import type {PortfolioStock, Stock} from './Types';

export const StockInitializer: Stock = {
  open: 0,
  close: 0,
  change: 0,
  changePercent: 0,
  currency: '',
  companyName: '',
  iexAskPrice: 0,
  iexBidPrice: 0,
  symbol: '',
  peRatio: 0,
  ytdChange: 0,
  week52High: 0,
  week52Low: 0,
  previousClose: 0,
  low: 0,
  high: 0,
  iexRealtimePrice: 0,
  primaryExchange: '',
  isUSMarketOpen: false,
  // iexClose: 0,
  latestPrice: 0,
};

export const PortfolioInitializer: PortfolioStock[] = [
  {
    price: 0,
    symbol: '',
    change: 0,
    quantity: 0,
    averageCost: 0,
    quote: {
      open: 0,
      close: 0,
      change: 0,
      changePercent: 0,
      currency: '',
      companyName: '',
      iexAskPrice: 0,
      iexBidPrice: 0,
      symbol: '',
      peRatio: 0,
      ytdChange: 0,
      week52High: 0,
      week52Low: 0,
      previousClose: 0,
      low: 0,
      high: 0,
      iexRealtimePrice: 0,
      primaryExchange: '',
      isUSMarketOpen: false,
      // iexClose: 0,
      latestPrice: 0,
    },
  },
];

export const PurchaseOrderInitializer = {
  quantity: 0,
  ticker: '',
  price: 0,
  action: '',
};

export const UserInitializer = {
  id: 'DEFAULT',
  name: '',
  email: '',
  photo: '',
  familyName: '',
  givenName: '',
  watchlist: [],
};
