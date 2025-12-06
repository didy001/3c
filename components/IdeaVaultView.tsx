
import React, { useState, useEffect } from 'react';
import { Database, Search, Filter, Download, Star, TrendingUp, Layers, Archive } from 'lucide-react';
import { StoredIdea } from '../types';
import { getVaultIdeas } from '../utils/ideaStorage';

export const IdeaVaultView: React.FC = () => {
  const [ideas, setIdeas] = useState<StoredIdea[]>([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    setIdeas(getVaultIdeas());
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'GOLD_MINE': return 'text-yellow-400 border-yellow-800 bg-yellow-950/30';
      case 'VALIDATED': return 'text-green-400 border-green-800 bg-green-950/30';
      default: return 'text-zinc-400 border-zinc-800 bg-zinc-900';
    }
  };

  const filteredIdeas = filter === 'ALL' ? ideas : ideas.filter(i => i.sector === filter);

  return (
    <div className="h-full flex flex-col bg-[#050505] text-zinc-200">
      {/* Header */}
      <div className="p-6 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
            <Archive className="text-yellow-500" />
            IDEA VAULT <span className="text-xs bg-yellow-900/20 text-yellow-500 px-2 py-0.5 rounded border border-yellow-800/50 font-mono">INTELLIGENCE BANK</span>
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-1">ARCHIVE DES OPPORTUNITÉS & CARTOGRAPHIE DE MARCHÉ</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold rounded flex items-center gap-2">
                <Download size={14} /> EXPORT CSV
            </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 p-6 border-b border-zinc-900 bg-zinc-900/20">
         <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-500 font-mono uppercase mb-1">Total Idées</div>
            <div className="text-2xl font-bold text-white">{ideas.length}</div>
         </div>
         <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-500 font-mono uppercase mb-1">Secteur Dominant</div>
            <div className="text-lg font-bold text-cyan-400">DIGITAL (45%)</div>
         </div>
         <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-500 font-mono uppercase mb-1">Gold Mines</div>
            <div className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
                12 <Star size={16} fill="currentColor" />
            </div>
         </div>
         <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-500 font-mono uppercase mb-1">Valeur Latente</div>
            <div className="text-xl font-bold text-green-500">EST. INFINIE</div>
         </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-zinc-900 flex items-center gap-4">
        <Search size={16} className="text-zinc-500" />
        <input 
            type="text" 
            placeholder="Rechercher une niche..." 
            className="bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-600 w-64"
        />
        <div className="h-4 w-px bg-zinc-800"></div>
        {['ALL', 'DIGITAL', 'PHYSICAL', 'SERVICE_B2B'].map(f => (
            <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-bold px-3 py-1 rounded transition-colors ${filter === f ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                {f}
            </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="text-xs text-zinc-500 font-mono uppercase border-b border-zinc-800">
                    <th className="pb-3 pl-2">Date</th>
                    <th className="pb-3">Secteur</th>
                    <th className="pb-3">Niche / Contexte</th>
                    <th className="pb-3">Problème (Friction)</th>
                    <th className="pb-3">Solution MVP</th>
                    <th className="pb-3">Profil Source</th>
                    <th className="pb-3 text-right pr-2">Potentiel</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {filteredIdeas.map((idea) => (
                    <tr key={idea.id} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors group">
                        <td className="py-4 pl-2 font-mono text-zinc-500 text-xs">{idea.timestamp.toLocaleDateString()}</td>
                        <td className="py-4">
                            <span className="text-[10px] font-bold px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-zinc-400">
                                {idea.sector}
                            </span>
                        </td>
                        <td className="py-4 font-bold text-zinc-300 group-hover:text-cyan-400 transition-colors">{idea.niche}</td>
                        <td className="py-4 text-red-300/80 text-xs">{idea.problem}</td>
                        <td className="py-4 text-xs font-mono text-zinc-400">{idea.mvp_type}</td>
                        <td className="py-4 text-xs text-zinc-500">{idea.origin_profile}</td>
                        <td className="py-4 text-right pr-2">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded border ${getStatusColor(idea.status)}`}>
                                {idea.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};
