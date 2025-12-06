
import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, AlertTriangle, FileText, ChevronRight, Bot, FileInput, Download, Copy, FileSpreadsheet, Eye, X, ShieldCheck, Activity, Cpu, Layers, Hexagon, Zap, ArrowRight, Play, Settings2 } from 'lucide-react';
import { MODULE_LIBRARY } from '../constants';
import { ModuleItem, GeneratedAsset, AICustomization } from '../types';
import { generatePlanWithAI } from '../utils/aiService';
import { generateIndustrialAssets } from '../utils/assetGenerator';
import { saveIdeaToVault } from '../utils/ideaStorage';

// SCÉNARIOS
const SCENARIOS = [
  { id: 'SC1', label: 'ARCHITECTE', desc: 'Optimisation cognitive', data: { profileType: 'ENTREPRENEUR', goal: 'OPTIMIZE', frictions: ['OVERWHELM'], timeAvailable: '240', business_context: "Système 3C.", current_results: "Backend prêt.", raw_report: "Saturé d'idées." } },
  { id: 'SC2', label: 'CLIENT PEUR', desc: 'Blocage vente', data: { profileType: 'ÉTUDIANT', goal: 'BUILD', frictions: ['FEAR_SALES'], timeAvailable: '60', business_context: "Freelance Copywriter.", current_results: "0 CA.", raw_report: "Peur de vendre." } },
  { id: 'SC4', label: 'EXPERT EXCEL', desc: 'Compétence forte', data: { profileType: 'EXPERT_TECHNIQUE', goal: 'BUILD', frictions: ['UNKNOWN_MARKET'], timeAvailable: '70', business_context: "Consulting Excel.", current_results: "Expertise validée.", raw_report: "Je veux devenir référence." } },
  { id: 'SC5', label: 'AGRI-BIZ', desc: 'Projet physique', data: { profileType: 'ENTREPRENEUR', goal: 'BUILD', frictions: ['NO_STRATEGY'], timeAvailable: '120', business_context: "Ferme Avicole.", current_results: "Terrain acquis.", raw_report: "Vente directe." } }
];

export const FactoryView: React.FC = () => {
  const [formData, setFormData] = useState({
    profileType: 'ENTREPRENEUR',
    business_context: '',
    current_results: '',
    raw_report: '',
    goal: 'BUILD',
    frictions: [] as string[],
    timeAvailable: '60'
  });

  const [processStep, setProcessStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[] | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<GeneratedAsset | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [useAI, setUseAI] = useState(true);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openrouter_key') || '');
  const [aiError, setAiError] = useState<string | null>(null);
  
  // AUTOMATION VISUELLE ROBUSTE
  useEffect(() => {
    let timer: any;
    if (processStep > 0 && processStep < 4) {
      const stepDuration = processStep === 2 ? 2000 : 1500;
      timer = setTimeout(() => {
        setProcessStep(prev => (prev + 1) as any);
      }, stepDuration);
    }
    // Nettoyage impératif pour éviter fuite de mémoire ou mise à jour sur composant démonté
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [processStep]);

  const loadScenario = (scenario: typeof SCENARIOS[0]) => {
    setFormData({
      profileType: scenario.data.profileType,
      business_context: scenario.data.business_context,
      current_results: scenario.data.current_results,
      raw_report: scenario.data.raw_report,
      goal: scenario.data.goal,
      frictions: scenario.data.frictions,
      timeAvailable: scenario.data.timeAvailable
    });
    setGeneratedAssets(null);
    setProcessStep(0);
    setAiError(null);
  };

  const handleDownload = (asset: GeneratedAsset) => {
    let filename = asset.title;
    let content = asset.content;
    let mimeType = 'text/plain';

    if (filename.endsWith('.csv')) mimeType = 'text/csv';
    if (filename.endsWith('.json')) mimeType = 'application/json';
    if (filename.endsWith('.md')) mimeType = 'text/markdown';
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    if(!formData.business_context) return;
    setProcessStep(1);
    setAiError(null);
    setGeneratedAssets(null);

    // Fonction encapsulée pour éviter que les erreurs ne remontent et cassent l'UI
    const safeGeneration = (modules: ModuleItem[], rationale: string, customization?: AICustomization, architecture?: string) => {
      try {
        const assets = generateIndustrialAssets(formData, modules, rationale, customization, architecture);
        saveIdeaToVault(formData);
        setGeneratedAssets(assets);
        setAiAnalysis(rationale);
      } catch (e: any) {
        console.error("GENERATION ERROR", e);
        setAiError("Erreur lors de la construction des actifs : " + e.message);
        setProcessStep(0);
      }
    };

    if (useAI && apiKey) {
      generatePlanWithAI(
        formData, 
        apiKey,
        (response) => {
          try {
            const fullModules = response.selected_modules.map(id => MODULE_LIBRARY.find(m => m.id === id)).filter(Boolean) as ModuleItem[];
            safeGeneration(fullModules, response.rationale, response.customization, response.recommended_architecture);
          } catch (e: any) {
             setAiError("Erreur traitement réponse IA: " + e.message);
             setProcessStep(0);
          }
        },
        (err) => {
          setAiError(err);
          setProcessStep(0);
        }
      );
    } else {
      // Simulation Mode
      setTimeout(() => {
        try {
          let selectedModules = MODULE_LIBRARY.filter(m => ['M20', 'M21', 'M22', 'M23', 'M24', 'M25'].includes(m.id));
          safeGeneration(selectedModules, "MODE SIMULATION : Orchestration Symphonique activée.");
        } catch (e: any) {
          setAiError("Erreur Simulation: " + e.message);
          setProcessStep(0);
        }
      }, 4000); 
    }
  };

  const getIconForType = (type: string) => {
    switch(type) {
      case 'STRATEGY_PDF': return <FileText className="text-red-400" size={16} />;
      case 'EXECUTION_XLS': return <FileSpreadsheet className="text-green-400" size={16} />;
      case 'SCRIPT_TXT': return <Bot className="text-blue-400" size={16} />;
      case 'SYSTEM_JSON': return <Cpu className="text-yellow-400" size={16} />;
      default: return <FileText className="text-zinc-400" size={16} />;
    }
  };

  const StepIndicator = ({ step, current, label }: any) => (
    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${current >= step ? 'opacity-100 scale-105' : 'opacity-30 scale-95'}`}>
      <div className={`w-3 h-3 rounded-full ${current >= step ? 'bg-cyan-500 shadow-[0_0_10px_cyan]' : 'bg-zinc-700'}`}></div>
      <span className="text-[9px] font-mono tracking-widest uppercase">{label}</span>
    </div>
  );

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      
      {/* 1. HEADER & STATUS BAR */}
      <div className="h-16 flex-none border-b border-white/5 bg-black/20 backdrop-blur-sm flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <Layers className="text-cyan-600" size={20} />
          <div>
            <h1 className="text-sm font-bold text-white tracking-[0.2em]">3C FACTORY</h1>
            <p className="text-[10px] text-zinc-500 font-mono">ASSET GENERATION ENGINE</p>
          </div>
        </div>

        {/* Central Progression */}
        <div className="flex items-center gap-8">
          <StepIndicator step={1} current={processStep} label="SCAN" />
          <div className={`w-12 h-[1px] ${processStep >= 2 ? 'bg-cyan-500' : 'bg-zinc-800'}`}></div>
          <StepIndicator step={2} current={processStep} label="MAP" />
          <div className={`w-12 h-[1px] ${processStep >= 3 ? 'bg-cyan-500' : 'bg-zinc-800'}`}></div>
          <StepIndicator step={3} current={processStep} label="BUILD" />
          <div className={`w-12 h-[1px] ${processStep >= 4 ? 'bg-cyan-500' : 'bg-zinc-800'}`}></div>
          <StepIndicator step={4} current={processStep} label="DONE" />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${useAI ? 'border-cyan-900/50 bg-cyan-950/20' : 'border-zinc-800 bg-zinc-900/50'}`}>
              <Bot size={14} className={useAI ? 'text-cyan-400' : 'text-zinc-600'} />
              <input 
                type="password" 
                value={apiKey} 
                onChange={(e) => {setApiKey(e.target.value); localStorage.setItem('openrouter_key', e.target.value);}} 
                placeholder="API KEY..." 
                className="bg-transparent border-none outline-none text-[10px] w-24 text-zinc-300 font-mono"
              />
           </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE (Fluid Layout) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Background Flow Animation */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
           {processStep > 0 && <div className="absolute top-1/2 left-0 w-20 h-[1px] bg-white blur-[2px] animate-[flow-line_2s_linear_infinite]"></div>}
        </div>

        {/* LEFT PANEL: GENESIS INPUT (Source) */}
        <div className={`flex-1 max-w-[500px] border-r border-white/5 bg-black/40 backdrop-blur-xl p-6 flex flex-col gap-6 transition-all duration-700 ${processStep > 0 && processStep < 4 ? 'opacity-50 grayscale' : 'opacity-100'}`}>
          
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <FileInput size={14} /> DONNÉES SOURCE
            </h2>
            <div className="flex gap-1">
              {SCENARIOS.map((sc) => (
                 <button key={sc.id} onClick={() => loadScenario(sc)} className="text-[8px] px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-cyan-400 hover:border-cyan-900 rounded transition-colors">
                   {sc.id}
                 </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
            {/* Context Group */}
            <div className="space-y-2">
               <label className="text-[9px] text-cyan-600 font-bold uppercase">1. Contexte & Identité</label>
               <textarea 
                  value={formData.business_context} 
                  onChange={(e) => setFormData({...formData, business_context: e.target.value})}
                  className="w-full h-24 bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-200 rounded-md p-3 focus:ring-1 focus:ring-cyan-500/50 resize-none leading-relaxed"
                  placeholder="Décrivez le projet, l'offre, le modèle..."
               />
               <div className="grid grid-cols-2 gap-2">
                  <select value={formData.profileType} onChange={(e) => setFormData({...formData, profileType: e.target.value})} className="bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300 rounded p-2">
                      {['ENTREPRENEUR', 'SALARIÉ', 'ÉTUDIANT', 'EXPERT_TECHNIQUE', 'ARCHITECTE'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})} className="bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300 rounded p-2">
                      {['BUILD', 'REPAIR', 'OPTIMIZE', 'SCALE'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
               </div>
            </div>

            {/* Reality Group */}
            <div className="space-y-2">
               <label className="text-[9px] text-purple-600 font-bold uppercase">2. Réalité & Blocages</label>
               <div className="grid grid-cols-2 gap-2">
                 <input 
                    type="text" 
                    value={formData.current_results} 
                    onChange={(e) => setFormData({...formData, current_results: e.target.value})}
                    className="bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300 rounded p-2"
                    placeholder="Résultats actuels (CA, Data)"
                 />
                 <input 
                    type="number" 
                    value={formData.timeAvailable} 
                    onChange={(e) => setFormData({...formData, timeAvailable: e.target.value})}
                    className="bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300 rounded p-2"
                    placeholder="Min / Jour"
                 />
               </div>
               <textarea 
                  value={formData.raw_report} 
                  onChange={(e) => setFormData({...formData, raw_report: e.target.value})}
                  className="w-full h-24 bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-200 rounded-md p-3 focus:ring-1 focus:ring-purple-500/50 resize-none leading-relaxed"
                  placeholder="Brain Dump : Peurs, Chaos, Tout ce qui bloque..."
               />
            </div>
          </div>

          <div className="mt-auto">
            {aiError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 rounded text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle size={16} />
                {aiError}
              </div>
            )}
            
            <button 
              onClick={handleGenerate}
              disabled={!formData.business_context || processStep > 0}
              className="w-full py-4 bg-gradient-to-r from-cyan-900 to-blue-900 hover:from-cyan-800 hover:to-blue-800 border border-cyan-700/50 text-white font-bold tracking-widest text-xs rounded-lg shadow-lg shadow-cyan-900/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale group"
            >
              {processStep > 0 ? (
                <><Activity className="animate-spin" size={16} /> TRAITEMENT EN COURS...</>
              ) : (
                <><Zap className="fill-cyan-400 text-cyan-200" size={16} /> INITIALISER LE SYSTÈME</>
              )}
            </button>
          </div>
        </div>

        {/* CENTER: VISUALIZER (The Bridge) */}
        <div className="flex-1 flex items-center justify-center relative p-10">
           {/* Connecting Lines */}
           <div className="absolute left-0 top-1/2 w-10 h-[2px] bg-zinc-800"></div>
           <div className="absolute right-0 top-1/2 w-10 h-[2px] bg-zinc-800"></div>

           {processStep === 0 && (
             <div className="text-center opacity-30">
               <Hexagon size={120} strokeWidth={0.5} className="mx-auto text-zinc-500" />
               <p className="mt-4 text-xs font-mono tracking-widest">SYSTEM READY</p>
             </div>
           )}

           {processStep > 0 && processStep < 4 && (
             <div className="relative w-64 h-64">
               <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-ping"></div>
               <div className="absolute inset-4 border border-cyan-500/50 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/80 rounded-full backdrop-blur-md border border-zinc-800">
                  <Cpu size={32} className="text-cyan-400 mb-2 animate-pulse" />
                  <span className="text-[10px] font-mono text-cyan-300">
                    {processStep === 1 ? 'SCANNING...' : processStep === 2 ? 'DEEP MAPPING...' : 'BUILDING...'}
                  </span>
               </div>
             </div>
           )}

           {processStep === 4 && (
             <div className="text-center animate-in zoom-in duration-500">
               <div className="w-24 h-24 bg-green-500/10 rounded-full border border-green-500/50 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                 <CheckCircle size={40} className="text-green-400" />
               </div>
               <h3 className="text-lg font-bold text-white tracking-widest">PRODUCTION TERMINÉE</h3>
               <p className="text-xs text-zinc-500 font-mono mt-1">14 ACTIFS SÉCURISÉS</p>
             </div>
           )}
        </div>

        {/* RIGHT PANEL: ASSET VAULT (Output) */}
        <div className={`flex-1 max-w-[500px] border-l border-white/5 bg-black/40 backdrop-blur-xl p-6 flex flex-col gap-4 transition-all duration-700 ${generatedAssets ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-10 grayscale'}`}>
          
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Database size={14} /> COFFRE D'ACTIFS
            </h2>
            {generatedAssets && <span className="text-[9px] bg-green-900/30 text-green-400 px-2 py-0.5 rounded border border-green-900/50">14 ITEMS</span>}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
            {generatedAssets ? (
              <>
                {/* AI Analysis Block */}
                <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg mb-4">
                  <h4 className="text-[10px] font-bold text-purple-400 uppercase mb-2 flex items-center gap-2"><Bot size={12} /> INTELLIGENCE TACTIQUE</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">{aiAnalysis}</p>
                </div>

                {/* Asset List */}
                {generatedAssets.map((asset, idx) => (
                  <div 
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className="group flex items-center gap-3 p-3 bg-[#080808] hover:bg-zinc-900 border border-zinc-800 hover:border-cyan-900/50 rounded-lg cursor-pointer transition-all animate-in slide-in-from-right-4 duration-300"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="p-2 rounded bg-zinc-950 border border-zinc-800 group-hover:text-cyan-400 transition-colors">
                      {getIconForType(asset.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-300 group-hover:text-white truncate">{asset.title}</h4>
                      <p className="text-[9px] text-zinc-600 truncate">{asset.description}</p>
                    </div>
                    <ChevronRight size={14} className="text-zinc-700 group-hover:text-cyan-500 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-4">
                <ShieldCheck size={48} strokeWidth={0.5} />
                <p className="text-[10px] font-mono tracking-widest text-center">ACCÈS RESTREINT<br/>INITIEZ LE PROTOCOLE</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ASSET MODAL */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-8 animate-in fade-in duration-200">
          <div className="bg-[#0a0a0b] w-full max-w-4xl h-[85vh] border border-zinc-800 rounded-lg shadow-2xl flex flex-col overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-purple-600"></div>
            
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#0c0c0e]">
              <div className="flex items-center gap-3">
                {getIconForType(selectedAsset.type)}
                <span className="font-mono text-sm font-bold text-white">{selectedAsset.title}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDownload(selectedAsset)} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded flex items-center gap-2 transition-colors">
                  <Download size={12} /> EXPORTER
                </button>
                <button onClick={() => setSelectedAsset(null)} className="p-1.5 hover:bg-red-900/20 text-zinc-500 hover:text-red-400 rounded transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-8 custom-scrollbar bg-[#080808]">
              <pre className="font-mono text-xs md:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed max-w-3xl mx-auto">
                {selectedAsset.content}
              </pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
