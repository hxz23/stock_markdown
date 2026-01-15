
import React, { useMemo } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { getMockNews } from '../../constants';

interface NewsCardProps {
    symbol?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({ symbol = 'AAPL' }) => {
  const news = useMemo(() => getMockNews(symbol), [symbol]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 shadow-lg my-4 font-sans max-w-xl">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
        <Newspaper size={18} className="text-blue-400" />
        <h3 className="font-semibold text-gray-200">Latest News: {symbol}</h3>
      </div>
      
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-gray-200 group-hover:text-indigo-400 transition-colors line-clamp-2">{item.title}</h4>
                <ExternalLink size={12} className="text-gray-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2" />
            </div>
            <p className="text-xs text-gray-400 line-clamp-2 mb-2">{item.summary}</p>
            <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <span className="font-semibold text-gray-400">{item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
                <span>•</span>
                <span className={`px-1.5 py-0.5 rounded ${
                    item.sentiment === 'positive' ? 'bg-green-500/10 text-green-400' :
                    item.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' :
                    'bg-gray-500/10 text-gray-400'
                }`}>
                    {item.sentiment.toUpperCase()}
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
