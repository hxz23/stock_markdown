import React, { useMemo } from 'react';
import { ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, CartesianGrid } from 'recharts';
import { getMockKlineData } from '../../constants';

interface KlineChartCardProps {
    symbol?: string;
    daterange?: string;
}

const CustomCandle = (props: any) => {
  const { x, y, width, height, payload } = props;
  const { open, close } = payload;
  const isUp = close > open;
  const color = isUp ? '#22c55e' : '#ef4444';
  
  return <rect x={x} y={y} width={width} height={height} fill={color} rx={1} />;
};

export const KlineChartCard: React.FC<KlineChartCardProps> = ({ symbol = 'AAPL', daterange = '1D' }) => {
  // Memoize data generation to avoid re-calc on every render if parent re-renders
  const data = useMemo(() => {
      const rawData = getMockKlineData(symbol);
      return rawData.map(d => ({
        ...d,
        bodyRange: [Math.min(d.open, d.close), Math.max(d.open, d.close)],
        wickRange: [d.low, d.high]
      }));
  }, [symbol]);

  const rangeLabel = daterange.toUpperCase();
  const timeDescription = rangeLabel === '1D' ? 'Daily' : 
                          rangeLabel === '1W' ? 'Weekly' : 
                          rangeLabel === '1M' ? 'Monthly' : 
                          rangeLabel === '1Y' ? 'Yearly' : rangeLabel;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg my-4 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">{symbol} • {timeDescription} Kline</h3>
        <span className="text-xs text-gray-400">Last 30 {rangeLabel === '1D' ? 'Days' : 'Periods'}</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af" 
              tick={{fontSize: 10}} 
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="#9ca3af" 
              tick={{fontSize: 10}} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val.toFixed(0)}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6' }}
              itemStyle={{ color: '#f3f4f6' }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Bar dataKey="wickRange" barSize={1} fill="#6b7280" />
            <Bar dataKey="bodyRange" shape={<CustomCandle />} barSize={8} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};