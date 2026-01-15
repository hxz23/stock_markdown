
import React, { useMemo } from 'react';
import { Building2, Globe, Users, MapPin } from 'lucide-react';
import { getMockCompanyProfile } from '../../constants';

interface CompanyProfileCardProps {
    symbol?: string;
}

export const CompanyProfileCard: React.FC<CompanyProfileCardProps> = ({ symbol = 'AAPL' }) => {
  const profile = useMemo(() => getMockCompanyProfile(symbol), [symbol]);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-lg my-4 font-sans max-w-xl">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-3">
        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
            <Building2 size={24} />
        </div>
        <div>
            <h3 className="text-lg font-bold text-gray-100">{profile.name}</h3>
            <div className="text-xs text-gray-400 flex gap-2">
                <span>{profile.sector}</span>
                <span>•</span>
                <span>{profile.industry}</span>
            </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed mb-6">
        {profile.description}
      </p>

      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 shrink-0">
                <Users size={14} />
            </div>
            <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">CEO</div>
                <div className="text-sm font-medium text-gray-200">{profile.ceo}</div>
            </div>
        </div>
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 shrink-0">
                <Users size={14} />
            </div>
            <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Employees</div>
                <div className="text-sm font-medium text-gray-200">{profile.employees}</div>
            </div>
        </div>
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 shrink-0">
                <MapPin size={14} />
            </div>
            <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Headquarters</div>
                <div className="text-sm font-medium text-gray-200">{profile.headquarters}</div>
            </div>
        </div>
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 shrink-0">
                <Globe size={14} />
            </div>
            <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Website</div>
                <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-indigo-400 hover:underline hover:text-indigo-300">
                    {profile.website}
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};
