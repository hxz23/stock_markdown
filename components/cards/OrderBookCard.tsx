
import React, { useMemo } from 'react';
import { Layers } from 'lucide-react';
import { getMockOrderBook } from '../../constants';

interface OrderBookCardProps {
    symbol?: string;
}

export const OrderBookCard: React.FC<OrderBookCardProps> = ({ symbol = 'AAPL' }) => {
  const book = useMemo(() => getMockOrderBook(symbol), [symbol]);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg my-4 font-mono text-xs overflow-hidden max-w-sm mx-auto sm:mx-0">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
         <div className="flex items-center gap-2 text-gray-300 font-sans font-semibold">
            <Layers size={14} className="text-gray-400" />
            <span>Order Book</span>
         </div>
         <div className="text-gray-500">{symbol}</div>
      </div>

      <div className="flex flex-col">
        {/* Asks (Sellers) - Red - Reverse order to show lowest ask at bottom */}
        <div className="flex flex-col-reverse">
             {book.asks.map((ask, i) => (
                <div key={`ask-${i}`} className="flex relative h-6 items-center hover:bg-gray-800/50">
                     {/* Depth Bar */}
                    <div 
                        className="absolute top-0 right-0 h-full bg-red-500/10 z-0 transition-all duration-500" 
                        style={{ width: `${ask.percent}%` }}
                    />
                    <div className="flex-1 text-right pr-4 z-10 text-gray-400">{ask.size}</div>
                    <div className="flex-1 text-red-400 pl-4 z-10 font-medium">{ask.price.toFixed(2)}</div>
                </div>
            ))}
        </div>

        {/* Current Price Divider */}
        <div className="bg-gray-800/50 border-y border-gray-700 py-1.5 text-center text-sm font-bold text-white tracking-wider">
            {book.price.toFixed(2)}
        </div>

        {/* Bids (Buyers) - Green */}
        <div>
            {book.bids.map((bid, i) => (
                <div key={`bid-${i}`} className="flex relative h-6 items-center hover:bg-gray-800/50">
                    {/* Depth Bar */}
                    <div 
                        className="absolute top-0 left-0 h-full bg-green-500/10 z-0 transition-all duration-500" 
                        style={{ width: `${bid.percent}%` }}
                    />
                     <div className="flex-1 text-right pr-4 z-10 text-gray-400">{bid.size}</div>
                     <div className="flex-1 text-green-400 pl-4 z-10 font-medium">{bid.price.toFixed(2)}</div>
                </div>
            ))}
        </div>
      </div>
       <div className="bg-gray-800 px-4 py-1.5 border-t border-gray-700 flex justify-between text-[10px] text-gray-500 uppercase">
          <span>Bid Size</span>
          <span>Price</span>
      </div>
    </div>
  );
};
