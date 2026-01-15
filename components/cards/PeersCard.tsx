
import React, { useMemo } from 'react';
import { Users2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getMockPeers } from '../../constants';

interface PeersCardProps {
    symbol?: string;
}

export const PeersCard: React.FC<PeersCardProps> = ({ symbol = 'AAPL' }) => {
  const peers = useMemo(() => getMockPeers(symbol), [symbol]);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg my-4 font-sans overflow-hidden max-w-lg">
      <div className="bg-gray-800/50 px-4 py-3 border-b border-gray-700 flex items-center gap-2">
         <Users2 size={16} className="text-purple-400" />
         <h3 className="font-semibold text-gray-200 text-sm">Peer Comparison</h3>
      </div>
      
      <div className="divide-y divide-gray-800">
          <div className="grid grid-cols-4 px-4 py-2 text-[10px] text-gray-500 uppercase tracking-wider font-medium">
              <div className="col-span-2">Symbol</div>
              <div className="text-right">Price</div>
              <div className="text-right">Change</div>
          </div>
          {peers.map((peer) => {
              const isPos = peer.changePercent >= 0;
              return (
                  <div key={peer.symbol} className="grid grid-cols-4 px-4 py-3 items-center hover:bg-gray-800/30 transition-colors">
                      <div className="col-span-2">
                          <div className="font-bold text-gray-200 text-sm">{peer.symbol}</div>
                          <div className="text-xs text-gray-500 truncate pr-2">{peer.name}</div>
                      </div>
                      <div className="text-right text-sm font-mono text-gray-300">
                          ${peer.price.toFixed(2)}
                      </div>
                      <div className={`text-right text-sm font-mono font-medium flex justify-end items-center gap-1 ${isPos ? 'text-green-400' : 'text-red-400'}`}>
                           {isPos ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                           {Math.abs(peer.changePercent).toFixed(2)}%
                      </div>
                  </div>
              )
          })}
      </div>
    </div>
  );
};
