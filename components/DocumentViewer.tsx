
import React, { useRef } from 'react';
import { Download, Copy, FileText, Hash, List, AlertTriangle } from 'lucide-react';
import { MasterDocument } from '../types';

interface DocumentViewerProps {
  document: MasterDocument;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ document }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // 1. SECURITE ANTI-CRASH : Si le document n'est pas passé correctement
  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 p-10 bg-[#0f0f10] border border-red-900/20 m-4 rounded-lg">
        <AlertTriangle size={48} className="text-red-500 mb-4 opacity-50" />
        <h2 className="text-lg font-bold text-zinc-300">DOCUMENT INTROUVABLE</h2>
        <p className="text-xs font-mono mt-2">Erreur système : La référence du document est nulle ou indéfinie.</p>
        <p className="text-[10px] font-mono mt-4 text-zinc-600">CODE: ERR_DOC_UNDEFINED</p>
      </div>
    );
  }

  const copyToClipboard = () => {
    if (contentRef.current) {
      const text = contentRef.current.innerText;
      navigator.clipboard.writeText(text);
      alert("Document copié dans le presse-papier");
    }
  };

  // 2. SECURITE SECTIONS : Valeurs par défaut si les sections sont malformées
  const sections = document.sections || [];

  return (
    <div className="max-w-4xl mx-auto h-full overflow-y-auto custom-scrollbar p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 bg-zinc-900/80 p-4 rounded-lg border border-zinc-800 sticky top-0 backdrop-blur-md z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950 rounded border border-cyan-900">
            <FileText className="text-cyan-400" size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">{document.id || "ID_INCONNU"}</h2>
            <p className="text-xs text-zinc-500 font-mono">Dernière rév: {document.date || "N/A"}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs font-medium transition-colors border border-zinc-700"
          >
            <Copy size={14} />
            <span className="hidden sm:inline">COPIER</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-medium transition-colors shadow-lg shadow-cyan-900/20">
            <Download size={14} />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>

      {/* Document Paper Representation */}
      <div ref={contentRef} className="bg-[#0f0f10] border border-zinc-800 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden min-h-[800px]">
        {/* Decorators */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Hash size={150} className="text-zinc-700" />
        </div>
        <div className="absolute bottom-4 left-4 text-[10px] text-zinc-600 font-mono select-none">
          3C SYSTEM ARCHITECTURE // GENETIC CODE // {document.version || "v1.0"}
        </div>

        {/* Header */}
        <header className="border-b border-zinc-800 pb-8 mb-10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{document.title || "TITRE MANQUANT"}</h1>
              <h2 className="text-sm md:text-lg text-cyan-500 font-medium tracking-widest uppercase">{document.subtitle || "SOUS-TITRE MANQUANT"}</h2>
            </div>
            <div className="text-left md:text-right">
              <div className="text-xs text-zinc-500 font-mono mb-1">VERSION {document.version || "1.0.0"}</div>
              <div className="text-xs text-zinc-500 font-mono bg-zinc-900 px-2 py-1 rounded inline-block">CONFIDENTIEL</div>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        {sections.length > 0 && (
          <div className="mb-12 p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-800/50 pb-2 w-full">
              <List size={14} className="text-zinc-500" />
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Sommaire du Document</h4>
            </div>
            <ul className="space-y-2">
              {sections.map((section, index) => (
                <li key={index}>
                  <a 
                    href={`#section-${index}`}
                    className="flex items-baseline text-sm text-zinc-300 hover:text-cyan-400 transition-colors group cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      window.document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="font-mono text-zinc-600 mr-4 text-xs w-6 text-right group-hover:text-cyan-500/70">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className="tracking-tight truncate opacity-80 group-hover:opacity-100">{section.title}</span>
                    <div className="flex-1 border-b border-zinc-800 border-dotted mx-4 opacity-30 relative -top-1 hidden md:block group-hover:border-cyan-500/30"></div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content */}
        <div className="space-y-16">
          {sections.map((section, index) => (
            <section key={index} id={`section-${index}`} className="relative group scroll-mt-32">
              {/* Section Number Indicator */}
              <div className="absolute -left-8 top-1 text-[10px] text-zinc-800 font-mono opacity-0 group-hover:opacity-100 transition-opacity select-none hidden xl:block">
                 {(index + 1).toString().padStart(2, '0')}
              </div>
              
              <h3 className="text-lg font-bold text-zinc-200 mb-6 border-l-2 border-cyan-500 pl-4 flex items-center gap-2">
                {section.title}
              </h3>
              
              <div className="text-zinc-400 leading-relaxed text-sm space-y-4 pl-5 border-l border-zinc-800/30 ml-[1px]">
                {section.content && section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="hover:text-zinc-300 transition-colors">{paragraph}</p>
                ))}
              </div>
              
              {section.highlight && (
                <div className="mt-6 ml-2 md:ml-5 p-4 bg-cyan-950/10 border-l-2 border-cyan-500/50 text-cyan-400 text-sm italic rounded-r-md flex gap-3">
                   <div className="w-1 h-full bg-cyan-500 rounded-full"></div>
                   <div>"{section.highlight}"</div>
                </div>
              )}
            </section>
          ))}
          
          {sections.length === 0 && (
            <div className="text-center py-20 text-zinc-600 italic">
              Aucun contenu disponible dans ce document.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-zinc-800 flex justify-between items-center text-[10px] text-zinc-600 font-mono uppercase tracking-wider">
          <span>GENERATED BY 3C CORE SYSTEM</span>
          <span>{document.id} // END OF FILE</span>
        </div>
      </div>
      
      {/* Spacer pour le scroll */}
      <div className="h-20"></div>
    </div>
  );
};
