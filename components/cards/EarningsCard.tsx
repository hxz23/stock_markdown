
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Banknote } from 'lucide-react';
import { getMockEarnings } from '../../constants';

interface EarningsCardProps {
    symbol?: string;
}

export const EarningsCard: React.FC<EarningsCardProps> = ({ symbol = 'AAPL' }) => {
  const data = useMemo(() => getMockEarnings(symbol), [symbol]);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg my-4 font-sans h-64 w-full max-w-xl">
       <div className="flex items-center gap-2 mb-2">
            <Banknote size={16} className="text-emerald-400" />
            <h3 className="font-semibold text-gray-200 text-sm">Earnings Per Share (EPS)</h3>
       </div>
       <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
          <XAxis dataKey="quarter" stroke="#9ca3af" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis stroke="#9ca3af" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
          <Tooltip 
             contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6', fontSize: '12px' }}
             cursor={{fill: '#1f2937'}}
          />
          <Legend wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
          <Bar dataKey="estimate" fill="#6b7280" name="Estimate" radius={[2, 2, 0, 0]} barSize={20} />
          <Bar dataKey="actual" fill="#10b981" name="Actual" radius={[2, 2, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
