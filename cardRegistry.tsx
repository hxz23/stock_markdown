
import React from 'react';
import { BarChart2, TrendingUp, Building2, PieChart, Layers, Newspaper, Target, Banknote, Users2, LucideIcon } from 'lucide-react';
import { KlineChartCard } from './components/cards/KlineChartCard';
import { StockInfoCard } from './components/cards/StockInfoCard';
import { CompanyProfileCard } from './components/cards/CompanyProfileCard';
import { FundamentalsCard } from './components/cards/FundamentalsCard';
import { OrderBookCard } from './components/cards/OrderBookCard';
import { NewsCard } from './components/cards/NewsCard';
import { AnalystRatingsCard } from './components/cards/AnalystRatingsCard';
import { EarningsCard } from './components/cards/EarningsCard';
import { PeersCard } from './components/cards/PeersCard';

export interface CardParameter {
  name: string;
  label: string;
  type: 'text' | 'select';
  options?: string[];
  defaultValue: string;
  description?: string;
}

export interface CardConfig {
  type: string;
  label: string;
  icon: LucideIcon;
  description: string;
  usage: string;
  templateStr: string;
  color: {
    text: string;
    bg: string;
    hoverBg: string;
  };
  parameters: CardParameter[];
  getComponent: (args: string[]) => React.ReactNode;
  validate: (args: string[]) => string | null;
}

const COMMON_SYMBOL_PARAM: CardParameter = {
    name: 'symbol',
    label: 'Stock Symbol',
    type: 'text',
    defaultValue: 'AAPL',
    description: 'Ticker symbol (e.g. MSFT, TSLA)'
};

export const CARD_REGISTRY: CardConfig[] = [
  {
    type: 'stockinfo',
    label: 'Stock Info',
    icon: TrendingUp,
    description: 'Insert stock price summary',
    usage: '#card stockinfo <SYMBOL>',
    templateStr: '\n#card stockinfo AAPL\n',
    color: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      hoverBg: 'group-hover:bg-emerald-500/20'
    },
    parameters: [COMMON_SYMBOL_PARAM],
    getComponent: (args) => <StockInfoCard symbol={args[0]} />,
    validate: (args) => !args[0] ? 'Missing Stock Symbol parameter' : null
  },
  {
    type: 'kline',
    label: 'Kline Chart',
    icon: BarChart2,
    description: 'Insert candlestick chart',
    usage: '#card kline <SYMBOL> [RANGE]',
    templateStr: '\n#card kline AAPL 1D\n',
    color: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      hoverBg: 'group-hover:bg-blue-500/20'
    },
    parameters: [
        COMMON_SYMBOL_PARAM,
        {
            name: 'range',
            label: 'Time Range',
            type: 'select',
            options: ['1D', '1W', '1M', '1Y'],
            defaultValue: '1D',
            description: 'Candlestick interval'
        }
    ],
    getComponent: (args) => <KlineChartCard symbol={args[0]} daterange={args[1]} />,
    validate: (args) => !args[0] ? 'Missing Stock Symbol parameter' : null
  },
  {
    type: 'company',
    label: 'Company Profile',
    icon: Building2,
    description: 'Insert company details',
    usage: '#card company <SYMBOL>',
    templateStr: '\n#card company AAPL\n',
    color: {
      text: 'text-orange-400',
      bg: 'bg-orange-500/10',
      hoverBg: 'group-hover:bg-orange-500/20'
    },
    parameters: [COMMON_SYMBOL_PARAM],
    getComponent: (args) => <CompanyProfileCard symbol={args[0]} />,
    validate: (args) => !args[0] ? 'Missing Stock Symbol parameter' : null
  },
  {
    type: 'fundamentals',
    label: 'Fundamentals',
    icon: PieChart,
    description: 'Insert financial metrics',
    usage: '#card fundamentals <SYMBOL>',
    templateStr: '\n#card fundamentals AAPL\n',
    color: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      hoverBg: 'group-hover:bg-purple-500/20'
    },
    parameters: [COMMON_SYMBOL_PARAM],
    getComponent: (args) => <FundamentalsCard symbol={args[0]} />,
    validate: (args) => !args[0] ? 'Missing Stock Symbol parameter' : null
  },
  {
    type: 'orderbook',
    label: 'Order Book',
    icon: Layers,
    description: 'Insert market depth',
    usage: '#card orderbook <SYMBOL>',
    templateStr: '\n#card orderbook AAPL\n',
    color: {
      text: 'text-gray-400',
      bg: 'bg-gray-500/10',
      hoverBg: 'group-hover:bg-gray-500/20'
    },
    parameters: [COMMON_SYMBOL_PARAM],
    getComponent: (args) => <OrderBookCard symbol={args[0]} />,
    validate: (args) => !args[0] ? 'Missing Stock Symbol parameter' : null
  },
  {
    type: 'news',
    label: 'Latest News',
    icon: Newspaper,
    description: 'Insert recent news headlines',
    usage: '#card news <SYMBOL>',
    templateStr: '\n#card news AAPL\n',
    color: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      hoverBg: 'group-hover:bg-cyan-500/20'
    },
    parameters: [COMMON_SYMBOL_PARAM],
    getComponent: (args) => <NewsCard symbol={args[0]} />,
    validate: (args) => !args[0] ? 'Missing Stock Symbol parameter' : null
  },
  {
    type: 'ratings',
    label: 'Analyst Ratings',
    icon: Target,
    description: 'Insert analyst consensus',
    usage: '#card ratings <SYMBOL>',
    templateStr: '\n#card ratings AAPL\n',
    color: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      hoverBg: 'group-hover:bg-red-500/20'
    },
    parameters: [COMMON_SYMBOL_PARAM],
    getComponent: (args) => <AnalystRatingsCard symbol={args[0]} />,
    validate: (args) => !args[0] ? 'Missing Stock Symbol parameter' : null
  },
  {
    type: 'earnings',
    label: 'Earnings',
    icon: Banknote,
    description: 'Insert EPS history',
    usage: '#card earnings <SYMBOL>',
    templateStr: '\n#card earnings AAPL\n',
    color: {
      text: 'text-green-400',
      bg: 'bg-green-500/10',
      hoverBg: 'group-hover:bg-green-500/20'
    },
    parameters: [COMMON_SYMBOL_PARAM],
    getComponent: (args) => <EarningsCard symbol={args[0]} />,
    validate: (args) => !args[0] ? 'Missing Stock Symbol parameter' : null
  },
  {
    type: 'peers',
    label: 'Peer Comp',
    icon: Users2,
    description: 'Insert sector comparison',
    usage: '#card peers <SYMBOL>',
    templateStr: '\n#card peers AAPL\n',
    color: {
      text: 'text-pink-400',
      bg: 'bg-pink-500/10',
      hoverBg: 'group-hover:bg-pink-500/20'
    },
    parameters: [COMMON_SYMBOL_PARAM],
    getComponent: (args) => <PeersCard symbol={args[0]} />,
    validate: (args) => !args[0] ? 'Missing Stock Symbol parameter' : null
  }
];

export const getCardConfig = (type: string) => CARD_REGISTRY.find(c => c.type === type);
