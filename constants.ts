
import { StockData, StockInfo, CompanyProfile, Fundamentals, OrderBook, OrderBookItem, NewsItem, AnalystRating, EarningsQuarter, PeerStock } from './types';

// Deterministic pseudo-random number generator for consistent mock data based on symbol
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

export const getMockKlineData = (symbol: string): StockData[] => {
  const seedBase = symbol.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  
  return Array.from({ length: 30 }, (_, i) => {
    const seed = seedBase + i;
    const basePrice = 100 + (seedBase % 100) + Math.sin(i * 0.2) * 20;
    
    // Generate realistic looking candles
    const open = basePrice + (seededRandom(seed + 1) - 0.5) * 5;
    const close = open + (seededRandom(seed + 2) - 0.5) * 8;
    // High must be >= max(open, close), Low must be <= min(open, close)
    const high = Math.max(open, close) + seededRandom(seed + 3) * 2;
    const low = Math.min(open, close) - seededRandom(seed + 4) * 2;
    
    return {
      time: new Date(2024, 0, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      open,
      high,
      low,
      close,
      volume: Math.floor(seededRandom(seed + 5) * 1000000) + 500000,
    };
  });
};

export const getMockStockInfo = (symbol: string): StockInfo => {
    const s = symbol.toUpperCase();
    const seed = s.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const isPos = seed % 2 === 0;
    
    return {
        symbol: s,
        name: getName(s),
        price: 50 + (seed % 500) + seededRandom(seed) * 10,
        change: (seededRandom(seed + 1) * 10 * (isPos ? 1 : -1)),
        changePercent: seededRandom(seed + 2) * 5 * (isPos ? 1 : -1),
        marketCap: `${(1 + (seed % 100) / 10).toFixed(1)}T`,
        volume: `${(10 + (seed % 50)).toFixed(1)}M`,
        peRatio: 10 + (seed % 50),
        high52: 100 + (seed % 500) + 50,
        low52: 100 + (seed % 500) - 50,
    };
};

const getName = (s: string) => s === 'AAPL' ? 'Apple Inc.' : s === 'GOOGL' ? 'Alphabet Inc.' : s === 'TSLA' ? 'Tesla, Inc.' : s === 'MSFT' ? 'Microsoft Corp' : `${s} Corporation`;

export const getMockCompanyProfile = (symbol: string): CompanyProfile => {
    const s = symbol.toUpperCase();
    return {
        symbol: s,
        name: getName(s),
        sector: 'Technology',
        industry: 'Consumer Electronics',
        description: `${getName(s)} designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.`,
        ceo: s === 'AAPL' ? 'Tim Cook' : s === 'TSLA' ? 'Elon Musk' : 'John Doe',
        employees: '164,000',
        headquarters: s === 'AAPL' ? 'Cupertino, CA' : 'USA',
        website: `www.${s.toLowerCase()}.com`
    };
};

export const getMockFundamentals = (symbol: string): Fundamentals => {
    const s = symbol.toUpperCase();
    const seed = s.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    
    return {
        symbol: s,
        peRatio: 20 + (seed % 30),
        eps: 3 + (seed % 10),
        dividendYield: (seed % 5) / 2,
        beta: 0.8 + (seed % 10) / 10,
        marketCap: `${(1 + (seed % 100) / 10).toFixed(1)}T`,
        revenue: `${(50 + (seed % 200)).toFixed(1)}B`,
        profitMargin: 15 + (seed % 20),
        priceToBook: 5 + (seed % 20),
    };
};

export const getMockOrderBook = (symbol: string): OrderBook => {
    const s = symbol.toUpperCase();
    const seed = s.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const basePrice = 150 + (seed % 100);

    const generateSide = (isAsk: boolean): OrderBookItem[] => {
        let currentTotal = 0;
        const items = Array.from({ length: 8 }, (_, i) => {
            const price = isAsk 
                ? basePrice + (i * 0.1) + 0.05 
                : basePrice - (i * 0.1) - 0.05;
            const size = Math.floor(100 + seededRandom(seed + i + (isAsk ? 100 : 0)) * 500);
            return { price, size, total: 0, percent: 0 };
        });

        // Calculate cumulative totals for depth bars
        items.forEach(item => {
            currentTotal += item.size;
            item.total = currentTotal;
        });

        // Calculate percentages based on max total
        const maxTotal = currentTotal;
        items.forEach(item => {
            item.percent = (item.total / maxTotal) * 100;
        });

        return items;
    };

    return {
        symbol: s,
        price: basePrice,
        asks: generateSide(true).reverse(), // Lowest ask at bottom
        bids: generateSide(false), // Highest bid at top
    };
};

export const getMockNews = (symbol: string): NewsItem[] => {
    const s = symbol.toUpperCase();
    return [
        {
            id: '1',
            title: `${s} Reports Strong Quarterly Earnings Beat`,
            source: 'Finance Daily',
            time: '2 hours ago',
            sentiment: 'positive',
            summary: `Analysts are optimistic after ${s} posted revenue figures that exceeded Wall Street expectations by 5%.`
        },
        {
            id: '2',
            title: `Market Volatility Affects Tech Sector: ${s} Dips Slightly`,
            source: 'MarketWatch',
            time: '5 hours ago',
            sentiment: 'neutral',
            summary: 'The broader technology sector faced headwinds today as bond yields rose, impacting growth stocks.'
        },
        {
            id: '3',
            title: `New Product Rumors Swirl Around ${s}`,
            source: 'TechInsider',
            time: '1 day ago',
            sentiment: 'positive',
            summary: `Supply chain leaks suggest ${s} is ramping up production for a revolutionary new device.`
        }
    ];
};

export const getMockAnalystRatings = (symbol: string): AnalystRating => {
    const s = symbol.toUpperCase();
    const seed = s.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const basePrice = 150 + (seed % 100);
    
    return {
        symbol: s,
        strongBuy: 15,
        buy: 10,
        hold: 8,
        sell: 2,
        targetHigh: basePrice * 1.3,
        targetLow: basePrice * 0.85,
        targetAvg: basePrice * 1.15,
        totalAnalysts: 35
    };
};

export const getMockEarnings = (symbol: string): EarningsQuarter[] => {
    const s = symbol.toUpperCase();
    const seed = s.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const baseEps = 2 + (seed % 5);

    return [
        { quarter: 'Q1', estimate: baseEps, actual: baseEps + 0.2, surprise: 5.2 },
        { quarter: 'Q2', estimate: baseEps + 0.1, actual: baseEps + 0.4, surprise: 8.1 },
        { quarter: 'Q3', estimate: baseEps + 0.3, actual: baseEps + 0.2, surprise: -1.5 },
        { quarter: 'Q4', estimate: baseEps + 0.5, actual: baseEps + 0.8, surprise: 6.0 },
    ];
};

export const getMockPeers = (symbol: string): PeerStock[] => {
    const seed = symbol.toUpperCase().split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    // Just some random mock tickers based on seed
    const tickers = ['MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'].filter(t => t !== symbol.toUpperCase());
    
    return tickers.slice(0, 3).map(ticker => {
        const s = seed + ticker.charCodeAt(0);
        return {
            symbol: ticker,
            name: getName(ticker),
            price: 100 + (s % 400),
            changePercent: (Math.sin(s) * 3),
            marketCap: `${(1 + (s % 20)/10).toFixed(1)}T`
        };
    });
};

export const INITIAL_MARKDOWN = `# Market Analysis Report

Welcome to the **Markdown Pro** editor.

## Market Update
${new Date().toLocaleDateString()}

### Spotlight: Apple (AAPL)
#card stockinfo AAPL

### Order Book Depth
#card orderbook AAPL

### Analyst Consensus
Wall Street remains bullish on the stock.
#card ratings AAPL

### Earnings Performance
A look at the last 4 quarters vs expectations.
#card earnings AAPL

### Peer Comparison
How it stacks up against big tech.
#card peers AAPL

### Recent Headlines
#card news AAPL

### Technicals
#card kline AAPL 1D

`;
