
import React, { useMemo } from 'react';
import { Target, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { getMockAnalystRatings } from '../../constants';

interface AnalystRatingsCardProps {
    symbol?: string;
}

export const AnalystRatingsCard: React.FC<AnalystRatingsCardProps> = ({ symbol = 'AAPL' }) => {
  const ratings = useMemo(() => getMockAnalystRatings(symbol), [symbol]);
  
  const maxVal = Math.max(ratings.strongBuy, ratings.buy, ratings.hold, ratings.sell);
  
  const Bar = ({ label, value, color }: { label: string, value: number, color: string }) => (
      <div className="flex items-center gap-2 text-xs">
          <div className="w-16 text-gray-400 font-medium text-right">{label}</div>
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${color}`} style={{ width: `${(value / ratings.totalAnalysts) * 100}%` }}></div>
          </div>
          <div className="w-6 text-gray-300 text-right">{value}</div>
      </div>
  );

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 shadow-lg my-4 font-sans max-w-lg">
      <div className="flex items-center justify-between mb-6">
         <div className="flex items-center gap-2">
            <Target size={18} className="text-indigo-400" />
            <h3 className="font-bold text-gray-200 text-sm uppercase">Analyst Consensus</h3>
         </div>
         <div className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">
            {ratings.totalAnalysts} Analysts
         </div>
      </div>

      <div className="flex gap-8">
        {/* Breakdown */}
        <div className="flex-1 space-y-3">
            <Bar label="Strong Buy" value={ratings.strongBuy} color="bg-emerald-500" />
            <Bar label="Buy" value={ratings.buy} color="bg-green-500" />
            <Bar label="Hold" value={ratings.hold} color="bg-yellow-500" />
            <Bar label="Sell" value={ratings.sell} color="bg-red-500" />
        </div>

        {/* Price Target */}
        <div className="w-32 flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Avg Target</div>
            <div className="text-2xl font-bold text-white">${ratings.targetAvg.toFixed(2)}</div>
            <div className="w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full my-2 opacity-70"></div>
            <div className="flex justify-between w-full text-[9px] text-gray-500">
                <span>${ratings.targetLow.toFixed(0)}</span>
                <span>${ratings.targetHigh.toFixed(0)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};
