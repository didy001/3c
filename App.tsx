
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import { DocumentViewer } from './components/DocumentViewer';
import { FactoryView } from './components/FactoryView';
import { AgentView } from './components/AgentView';
import { BackendCodeView } from './components/BackendCodeView';
import { NexusView } from './components/NexusView';
import { IdeaVaultView } from './components/IdeaVaultView';
import { PROFILE_DOCUMENT, CONCEPT_DOCUMENT, ROADMAP_DOCUMENT, AUDIT_DOCUMENT, ECONOMY_DOCUMENT, INDUSTRIAL_DOCUMENT, BACKEND_DOCUMENT, SAAS_POLYMORPH_DOCUMENT } from './constants';
import { ViewState } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.FACTORY_VIEW); 

  const renderContent = () => {
    switch (currentView) {
      case ViewState.NEXUS_DASHBOARD: return <NexusView />;
      case ViewState.AGENT_GUIDE: return <AgentView />;
      case ViewState.FACTORY_VIEW: return <FactoryView />;
      case ViewState.BACKEND_CODE_VIEW: return <BackendCodeView />;
      case ViewState.IDEA_VAULT_VIEW: return <IdeaVaultView />;
      case ViewState.DOC_PROFILE: return <DocumentViewer document={PROFILE_DOCUMENT} />;
      case ViewState.DOC_CONCEPT: return <DocumentViewer document={CONCEPT_DOCUMENT} />;
      case ViewState.DOC_ROADMAP: return <DocumentViewer document={ROADMAP_DOCUMENT} />;
      case ViewState.DOC_AUDIT: return <DocumentViewer document={AUDIT_DOCUMENT} />;
      case ViewState.DOC_ECONOMY: return <DocumentViewer document={ECONOMY_DOCUMENT} />;
      case ViewState.DOC_INDUSTRIAL: return <DocumentViewer document={INDUSTRIAL_DOCUMENT} />;
      case ViewState.DOC_BACKEND: return <DocumentViewer document={BACKEND_DOCUMENT} />;
      case ViewState.DOC_SAAS: return <DocumentViewer document={SAAS_POLYMORPH_DOCUMENT} />;
      default: return <div className="p-10 text-zinc-500 font-mono">Module '{currentView}' en cours d'initialisation...</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#030304] text-zinc-100 overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Navigation (Menu) - Gère sa propre largeur */}
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      {/* Main Content (Brain) */}
      <main className="flex-1 relative h-full overflow-hidden flex flex-col transition-all duration-300">
        
        {/* AMBIENT BACKGROUND SYSTEM */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/30 via-[#030304] to-[#030304]"></div>
          {/* Subtle Grid */}
          <div 
            className="absolute inset-0 opacity-[0.04]" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, 
              backgroundSize: '60px 60px'
            }}
          />
          {/* Active Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,182,212,0.02)_50%,transparent_100%)] bg-[length:100%_200%] animate-[scan_8s_linear_infinite] pointer-events-none"></div>
        </div>
        
        {/* VIEWPORT */}
        <div className="relative z-10 flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
