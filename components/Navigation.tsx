
import React, { useState } from 'react';
import { FileText, TrendingUp, Factory, Server, Sparkles, Code, Cpu, Archive, Shield, Zap, Lock, ChevronRight, Hexagon, ChevronLeft, Layout, Menu } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

// ARBRE SYSTÉMIQUE CONNECTÉ
const SYSTEM_TREE = [
  {
    layer: 'L0 : GENESIS',
    desc: 'Code Source & ADN',
    color: 'border-l-zinc-700',
    nodes: [
      { id: ViewState.DOC_PROFILE, label: 'PROFIL ARCHITECTE', icon: UserIcon },
      { id: ViewState.DOC_CONCEPT, label: 'NOYAU LOGIQUE 3C', icon: HexagonIcon },
    ]
  },
  {
    layer: 'L1 : INTELLIGENCE',
    desc: 'Analyse & Synthèse',
    color: 'border-l-cyan-900',
    nodes: [
      { id: ViewState.AGENT_GUIDE, label: 'CIEL ENGINE (AI)', icon: Sparkles, glow: true },
      { id: ViewState.IDEA_VAULT_VIEW, label: 'IDEA VAULT', icon: Archive },
    ]
  },
  {
    layer: 'L2 : PRODUCTION',
    desc: 'Usine de Réalité',
    color: 'border-l-green-900',
    nodes: [
      { id: ViewState.DOC_INDUSTRIAL, label: 'PROTOCOLE USINE', icon: FileText },
      { id: ViewState.FACTORY_VIEW, label: 'FACTORY (ASSETS)', icon: Factory, highlight: true },
    ]
  },
  {
    layer: 'L3 : DOMINION',
    desc: 'Expansion & Contrôle',
    color: 'border-l-yellow-900',
    nodes: [
      { id: ViewState.DOC_ECONOMY, label: 'EMPIRE ECONOMY', icon: TrendingUp },
      { id: ViewState.NEXUS_DASHBOARD, label: 'NEXUS PRIME', icon: Cpu, special: true },
    ]
  },
  {
    layer: 'L4 : INFRASTRUCTURE',
    desc: 'Serveurs & Code',
    color: 'border-l-purple-900',
    nodes: [
      { id: ViewState.DOC_BACKEND, label: 'DOC BACKEND', icon: Server },
      { id: ViewState.DOC_SAAS, label: 'SAAS POLYMORPHE', icon: Server, special: true },
      { id: ViewState.BACKEND_CODE_VIEW, label: 'SOUCHE SERVEUR', icon: Code },
    ]
  }
];

function UserIcon({size, className}: any) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function HexagonIcon({size, className}: any) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> }

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav 
      className={`${isCollapsed ? 'w-20' : 'w-full md:w-72'} bg-black/95 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen sticky top-0 z-50 transition-all duration-500 ease-in-out shadow-[10px_0_30px_-10px_rgba(0,0,0,0.5)]`}
    >
      
      {/* HEADER: SYSTEM STATUS */}
      <div className={`p-4 border-b border-white/5 relative overflow-hidden group flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/20 blur-[40px] rounded-full group-hover:bg-cyan-500/30 transition-all duration-700 pointer-events-none"></div>

        <div className={`relative z-10 flex items-center gap-3 ${isCollapsed ? 'hidden' : 'flex'}`}>
           <div className="p-1.5 bg-cyan-950/30 border border-cyan-900/50 rounded">
             <Hexagon className="text-cyan-500" size={20} strokeWidth={1.5} />
           </div>
           <div>
             <h1 className="text-lg font-black text-white tracking-widest font-mono leading-none">
               3C<span className="text-cyan-500">.OS</span>
             </h1>
             <div className="flex gap-2 mt-1">
                <span className="text-[8px] text-zinc-500 font-mono uppercase">ARCHITECT</span>
                <span className="text-[8px] font-mono text-green-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span> ONLINE
                </span>
             </div>
           </div>
        </div>

        {/* Logo only when collapsed */}
        {isCollapsed && (
           <div className="p-2 bg-cyan-950/30 border border-cyan-900/50 rounded animate-in fade-in">
             <Hexagon className="text-cyan-500" size={24} strokeWidth={1.5} />
           </div>
        )}

        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 hover:bg-white/10 rounded-md text-zinc-500 hover:text-white transition-colors ${isCollapsed ? 'absolute bottom-20 left-1/2 -translate-x-1/2 z-50 bg-black border border-zinc-800' : ''}`}
          title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* SYSTEM SPINE */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 relative">
        {/* La Colonne Vertébrale (The Spine) */}
        <div className={`absolute top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent z-0 transition-all duration-500 ${isCollapsed ? 'left-1/2 -translate-x-1/2' : 'left-[23px]'}`}></div>

        <div className="space-y-6 relative z-10">
          {SYSTEM_TREE.map((layer, lIndex) => (
            <div key={layer.layer} className={`relative transition-all duration-500 ${isCollapsed ? 'pl-0 flex flex-col items-center' : 'pl-8'}`}>
              
              {/* Layer Connector Point */}
              <div className={`absolute top-2 w-[7px] h-[7px] bg-black border border-zinc-600 rounded-full z-10 transition-all duration-500 ${isCollapsed ? 'left-1/2 -translate-x-[3.5px] border-cyan-900' : 'left-[20px]'}`}></div>
              
              {/* Layer Header */}
              {!isCollapsed && (
                <div className="mb-2 animate-in slide-in-from-left-2 duration-300">
                   <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">{layer.layer}</h3>
                </div>
              )}

              {/* Modules List */}
              <div className={`space-y-1 transition-all duration-500 ${isCollapsed ? 'w-full flex flex-col items-center gap-2 mt-4' : `border-l ${layer.color} pl-3 ml-[-11px]`}`}>
                {layer.nodes.map((node) => {
                  const isActive = currentView === node.id;
                  // @ts-ignore
                  const isSpecial = node.special;
                  // @ts-ignore
                  const isGlow = node.glow;

                  return (
                    <button
                      key={node.id}
                      onClick={() => onViewChange(node.id)}
                      className={`group relative transition-all duration-300 rounded-lg flex items-center ${
                        isCollapsed 
                          ? `justify-center w-10 h-10 ${isActive ? 'bg-cyan-950/50 border border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200'}`
                          : `w-full p-2 justify-between border ${isActive ? 'bg-zinc-900/80 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]' : 'border-transparent hover:bg-zinc-900/40'}`
                      }`}
                      title={isCollapsed ? node.label : ''} // Native tooltip for collapsed
                    >
                      <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                        <div className={`transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                          <node.icon size={isCollapsed ? 18 : 16} className={isGlow && !isActive ? "animate-pulse text-cyan-600" : ""} />
                        </div>
                        {!isCollapsed && (
                          <span className={`text-[11px] font-medium font-mono tracking-tight whitespace-nowrap ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                            {node.label}
                          </span>
                        )}
                      </div>
                      
                      {!isCollapsed && isActive && <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_5px_cyan]"></div>}
                      {!isCollapsed && !isActive && isSpecial && <Lock size={10} className="text-zinc-700" />}
                      
                      {/* Hover Tooltip for Collapsed Mode (Custom) */}
                      {isCollapsed && (
                        <div className="absolute left-14 bg-zinc-900 border border-zinc-700 text-zinc-200 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 font-mono tracking-wider shadow-xl">
                          {node.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className={`p-4 border-t border-white/5 bg-black/50 backdrop-blur-md transition-all duration-300 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          {!isCollapsed && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-2">
              <span className="text-[10px] font-bold text-zinc-300 tracking-wider">BACKEND LINKED</span>
              <span className="text-[8px] font-mono text-zinc-600">LATENCY: 12ms</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
