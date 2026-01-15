
import React, { useMemo } from 'react';
import { PieChart, DollarSign, Percent, TrendingUp } from 'lucide-react';
import { getMockFundamentals } from '../../constants';

interface FundamentalsCardProps {
    symbol?: string;
}

export const FundamentalsCard: React.FC<FundamentalsCardProps> = ({ symbol = 'AAPL' }) => {
  const data = useMemo(() => getMockFundamentals(symbol), [symbol]);

  const Metric = ({ label, value, subtext }: { label: string, value: string | number, subtext?: string }) => (
    <div className="bg-gray-900/50 p-3 rounded border border-gray-700/50">
        <div className="text-xs text-gray-500 uppercase mb-1">{label}</div>
        <div className="text-lg font-semibold text-gray-200">{value}</div>
        {subtext && <div className="text-[10px] text-gray-500 mt-1">{subtext}</div>}
    </div>
  );

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-lg my-4 font-sans">
      <div className="flex items-center gap-2 mb-4">
        <PieChart size={18} className="text-indigo-400" />
        <h3 className="font-bold text-gray-100 uppercase tracking-wide text-sm">{symbol} Fundamentals</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Metric label="Market Cap" value={data.marketCap} />
        <Metric label="P/E Ratio" value={data.peRatio.toFixed(2)} subtext="Trailing 12m" />
        <Metric label="EPS" value={`$${data.eps.toFixed(2)}`} />
        <Metric label="Div Yield" value={`${data.dividendYield.toFixed(2)}%`} />
        <Metric label="Beta" value={data.beta.toFixed(2)} subtext="Volatility" />
        <Metric label="Profit Margin" value={`${data.profitMargin.toFixed(1)}%`} />
        <Metric label="Revenue" value={data.revenue} />
        <Metric label="P/B Ratio" value={data.priceToBook.toFixed(2)} />
      </div>
    </div>
  );
};
