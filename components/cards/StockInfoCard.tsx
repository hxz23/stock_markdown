import React, { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, BarChart3 } from 'lucide-react';
import { getMockStockInfo } from '../../constants';

interface StockInfoCardProps {
    symbol?: string;
}

export const StockInfoCard: React.FC<StockInfoCardProps> = ({ symbol = 'AAPL' }) => {
  const info = useMemo(() => getMockStockInfo(symbol), [symbol]);
  const isPositive = info.change >= 0;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-xl my-4 font-sans max-w-md mx-auto sm:mx-0">
      <div className="flex justify-between items-start mb-4">
        <div>
            <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-white">{info.symbol}</h3>
                <span className="text-xs font-medium bg-gray-700 text-gray-300 px-2 py-0.5 rounded">NASDAQ</span>
            </div>
            <p className="text-sm text-gray-400">{info.name}</p>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
            <span className="text-xl font-bold">{Math.abs(info.changePercent).toFixed(2)}%</span>
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-4xl font-bold text-white">${info.price.toFixed(2)}</span>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{info.change.toFixed(2)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-4">
        <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 uppercase flex items-center gap-1">
                <BarChart3 size={12} /> Market Cap
            </span>
            <span className="text-sm font-semibold text-gray-200">{info.marketCap}</span>
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 uppercase flex items-center gap-1">
                <Activity size={12} /> Volume
            </span>
            <span className="text-sm font-semibold text-gray-200">{info.volume}</span>
        </div>
         <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 uppercase flex items-center gap-1">
                <DollarSign size={12} /> 52W High
            </span>
            <span className="text-sm font-semibold text-gray-200">${info.high52.toFixed(2)}</span>
        </div>
         <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 uppercase flex items-center gap-1">
                <DollarSign size={12} /> 52W Low
            </span>
            <span className="text-sm font-semibold text-gray-200">${info.low52.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
