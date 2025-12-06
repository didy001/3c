
import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Database, AlertTriangle, Play, ShieldAlert, Layers, Network, Zap, Lock, Terminal, BarChart2 } from 'lucide-react';
import { NEXUS_NODES } from '../constants';
import { SystemNode, SimulationResult } from '../types';

export const NexusView: React.FC = () => {
  const [nodes, setNodes] = useState<SystemNode[]>(NEXUS_NODES);
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [systemHealth, setSystemHealth] = useState(82);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPTIMAL': return 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]';
      case 'STABLE': return 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]';
      case 'CRITICAL': return 'bg-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)]';
      default: return 'bg-zinc-700';
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationResult(null);
    
    // Simulation Algorithm (The Oracle)
    setTimeout(() => {
      setSimulationResult({
        probability_success: 94,
        projected_revenue: "12,450€ / mois (Recurring)",
        risk_factors: ["Burnout du Fondateur (Surcharge M03)", "Complexité Technique (M07)"],
        recommended_sequence: ["REPAIR M03 (OS Personnel)", "ACTIVATE M06 (Micro-Offres)", "SCALE M10 (Loop)"],
        impact_analysis: "L'activation de Nexus a détecté une faille critique dans l'OS Personnel. La réparation de ce nœud augmentera la stabilité globale de 45%."
      });
      setIsSimulating(false);
    }, 2500);
  };

  return (
    <div className="h-full flex flex-col bg-[#050505] text-zinc-200 overflow-hidden relative">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,20,20,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,20,20,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Header */}
      <div className="p-6 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center gap-3">
            <Cpu className="text-cyan-400" />
            NEXUS PRIME <span className="text-xs bg-cyan-900/30 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800 font-mono">V.4.0 ONLINE</span>
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-1">SIMULATEUR STRATÉGIQUE & ORCHESTRATEUR D'EMPIRE</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10px] text-zinc-500 font-mono uppercase">System Health</div>
            <div className={`text-xl font-bold font-mono ${systemHealth > 80 ? 'text-green-500' : 'text-red-500'}`}>{systemHealth}%</div>
          </div>
          <button 
            onClick={handleSimulate}
            disabled={isSimulating}
            className="px-6 py-3 bg-gradient-to-r from-cyan-700 to-blue-700 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSimulating ? <Zap size={18} className="animate-spin" /> : <Play size={18} />}
            {isSimulating ? "CALCUL..." : "LANCER SIMULATION"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: VISUAL NETWORK */}
        <div className="flex-1 relative bg-[#030303] flex items-center justify-center overflow-hidden">
          {/* Central Nexus Core */}
          <div className="relative w-[600px] h-[600px] rounded-full border border-zinc-900/50 flex items-center justify-center animate-[spin_60s_linear_infinite]">
             <div className="absolute inset-0 rounded-full border border-dashed border-zinc-800/30"></div>
          </div>

          {/* Nodes Rendering */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[500px] h-[500px]">
              {nodes.map((node, index) => {
                // Calculate position in circle
                const angle = (index / (nodes.length - 1)) * 2 * Math.PI; // -1 to keep Core separate
                const radius = 220;
                const x = Math.cos(angle) * radius + 250 - 24; // Center offset
                const y = Math.sin(angle) * radius + 250 - 24;
                const isCore = node.id === 'M12';

                if (isCore) return null; // Core is center

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ left: `${x}px`, top: `${y}px` }}
                    className={`absolute w-12 h-12 rounded-full border-2 border-zinc-800 flex items-center justify-center z-10 transition-transform hover:scale-125 group ${selectedNode?.id === node.id ? 'scale-125 border-white' : ''} ${getStatusColor(node.status)}`}
                  >
                    <span className="text-[8px] font-bold text-black group-hover:hidden">{node.id}</span>
                    <Activity size={12} className="text-white hidden group-hover:block" />
                    
                    {/* Label */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-zinc-500 bg-black/80 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {node.label}
                    </div>
                  </button>
                );
              })}

              {/* CENTER CORE */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-black border-2 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.4)] rounded-full flex items-center justify-center z-20">
                <Network size={32} className="text-cyan-400" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: DATA PANEL */}
        <div className="w-[400px] border-l border-zinc-900 bg-zinc-950/90 backdrop-blur-sm p-6 overflow-y-auto">
          
          {simulationResult ? (
            <div className="animate-in slide-in-from-right-10 duration-500 space-y-6">
              <div className="p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-green-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-green-400">
                  <BarChart2 size={18} />
                  <h3 className="font-bold text-sm tracking-widest">RÉSULTAT PROBABILISTE</h3>
                </div>
                <div className="text-4xl font-mono font-bold text-white mb-2">{simulationResult.probability_success}%</div>
                <div className="text-xs text-zinc-400">Probabilité de succès systémique</div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Impact Financier Projeté</h4>
                  <div className="text-xl font-mono text-cyan-400">{simulationResult.projected_revenue}</div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Facteurs de Risque</h4>
                  <ul className="space-y-2">
                    {simulationResult.risk_factors.map((risk, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-red-300 bg-red-950/20 p-2 rounded border border-red-900/30">
                        <AlertTriangle size={12} /> {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Séquence Recommandée par Nexus</h4>
                   <div className="relative pl-4 border-l border-cyan-800 space-y-4">
                     {simulationResult.recommended_sequence.map((step, i) => (
                       <div key={i} className="relative">
                         <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-600 border border-black"></div>
                         <div className="text-sm text-cyan-100 font-mono">{step}</div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          ) : selectedNode ? (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{selectedNode.label}</h2>
                <span className={`px-2 py-1 text-[10px] font-bold rounded border ${
                   selectedNode.status === 'OPTIMAL' ? 'bg-cyan-950 text-cyan-400 border-cyan-800' : 
                   selectedNode.status === 'CRITICAL' ? 'bg-red-950 text-red-400 border-red-800' : 
                   'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}>
                  {selectedNode.status}
                </span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-zinc-500">CHARGE SYSTÈME</span>
                    <span className="text-zinc-300 font-mono">{selectedNode.load}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${selectedNode.load > 80 ? 'bg-red-500' : 'bg-cyan-500'}`} 
                      style={{ width: `${selectedNode.load}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800">
                  <h3 className="text-xs font-bold text-zinc-500 mb-3 flex items-center gap-2">
                    <Layers size={12} /> DÉPENDANCES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.connections.map(conn => (
                       <span key={conn} className="text-[10px] font-mono bg-black border border-zinc-800 px-2 py-1 rounded text-zinc-400">
                         {conn}
                       </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
                  <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded flex items-center justify-center gap-2">
                    <Terminal size={14} /> LANCER DIAGNOSTIC NODE
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600">
              <ShieldAlert size={48} className="mb-4 opacity-20" />
              <p className="text-xs font-mono text-center">SÉLECTIONNEZ UN NŒUD<br/>POUR ANALYSE</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
