
export interface StockData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockInfo {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  peRatio: number;
  high52: number;
  low52: number;
}

export interface CompanyProfile {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  description: string;
  ceo: string;
  employees: string;
  headquarters: string;
  website: string;
}

export interface Fundamentals {
  symbol: string;
  peRatio: number;
  eps: number;
  dividendYield: number;
  beta: number;
  marketCap: string;
  revenue: string;
  profitMargin: number;
  priceToBook: number;
}

export interface OrderBookItem {
  price: number;
  size: number;
  total: number; // Cumulative sum for depth visualization
  percent: number; // For progress bar width
}

export interface OrderBook {
  symbol: string;
  price: number;
  bids: OrderBookItem[];
  asks: OrderBookItem[];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  summary: string;
}

export interface AnalystRating {
  symbol: string;
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  targetHigh: number;
  targetLow: number;
  targetAvg: number;
  totalAnalysts: number;
}

export interface EarningsQuarter {
  quarter: string;
  estimate: number;
  actual: number;
  surprise: number;
}

export interface PeerStock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  marketCap: string;
}

export type CustomCardType = 'kline' | 'stockinfo' | 'company' | 'fundamentals' | 'orderbook' | 'news' | 'ratings' | 'earnings' | 'peers' | 'unknown';
