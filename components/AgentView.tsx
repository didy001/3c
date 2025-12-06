
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Terminal, ShieldAlert, Cpu, Settings, Key, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../types';
import { streamOpenRouterResponse, AVAILABLE_MODELS } from '../utils/openRouterService';

export const AgentView: React.FC = () => {
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openrouter_key') || '');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [showSettings, setShowSettings] = useState(!localStorage.getItem('openrouter_key'));
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'agent',
      content: "Système 3C Connecté. \nJe suis relié à OpenRouter et j'ai ingéré le DOC-001 (Ton Profil) et le DOC-002 (La Logique). \n\nEn attente de directive...",
      timestamp: new Date(),
    }
  ]);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('openrouter_key', key);
    if(key) setShowSettings(false);
  };

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;
    if (isStreaming) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);
    setError(null);

    // Placeholder pour le message de l'agent qui va se remplir
    const agentMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: agentMsgId,
      role: 'agent',
      content: "", // Vide au début
      timestamp: new Date()
    }]);

    await streamOpenRouterResponse(
      [...messages, userMsg],
      apiKey,
      selectedModel,
      (chunk) => {
        setMessages(prev => prev.map(msg => 
          msg.id === agentMsgId 
            ? { ...msg, content: msg.content + chunk }
            : msg
        ));
      },
      () => setIsStreaming(false),
      (err) => {
        setError(err);
        setIsStreaming(false);
        setMessages(prev => prev.map(msg => 
          msg.id === agentMsgId 
            ? { ...msg, content: "ERREUR SYSTÈME: " + err }
            : msg
        ));
      }
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-5xl mx-auto bg-[#0f0f10] border border-zinc-800 rounded-lg overflow-hidden shadow-2xl relative">
      {/* Header Agent */}
      <div className="bg-zinc-900/90 p-4 border-b border-zinc-800 flex items-center justify-between backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full border relative ${isStreaming ? 'bg-cyan-950/50 border-cyan-500' : 'bg-zinc-800 border-zinc-700'}`}>
            <Bot className={isStreaming ? "text-cyan-400" : "text-zinc-500"} size={20} />
            {isStreaming && (
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">GUIDE SYSTÉMIQUE 3C</h2>
            <p className="text-[10px] text-cyan-600 font-mono uppercase">
              {isStreaming ? 'PROCESSING DATA...' : 'SYSTEM STANDBY'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Model Selector */}
           <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs rounded px-2 py-1 font-mono focus:border-cyan-500 outline-none"
          >
            {AVAILABLE_MODELS.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded hover:bg-zinc-800 transition-colors ${!apiKey ? 'text-red-500 animate-pulse' : 'text-zinc-500'}`}
            title="Configuration API"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Settings Panel (Overlay) */}
      {showSettings && (
        <div className="absolute top-16 left-0 right-0 z-20 px-6 animate-in slide-in-from-top-2">
          <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-xl max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-cyan-400">
              <Key size={16} />
              <h3 className="text-sm font-bold uppercase tracking-wider">Configuration OpenRouter</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Pour connecter l'Intelligence Réelle, une clé API OpenRouter est requise. 
              Elle est stockée uniquement dans votre navigateur (localStorage).
            </p>
            <div className="flex gap-2">
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => handleSaveKey(e.target.value)}
                placeholder="sk-or-..."
                className="flex-1 bg-zinc-950 border border-zinc-700 text-zinc-200 text-sm rounded px-3 py-2 focus:border-cyan-500 outline-none font-mono"
              />
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold rounded uppercase"
              >
                Valider
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-zinc-500">
              <ShieldAlert size={10} />
              <span>Connexion sécurisée client-side. Aucune donnée ne transite par un serveur tiers autre qu'OpenRouter.</span>
            </div>
          </div>
        </div>
      )}

      {/* Zone de Chat */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#0f0f10] to-[#050505]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-zinc-800 text-zinc-100' : 'bg-cyan-950/10 border border-cyan-900/30 text-cyan-100'} rounded-lg p-4 shadow-md`}>
              
              {msg.role === 'agent' && (
                <div className="text-[10px] font-mono text-cyan-600 mb-2 flex items-center gap-2 select-none">
                  <Terminal size={12} /> SYSTEM OUTPUT // {selectedModel.split('/')[1]}
                </div>
              )}
              
              <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{msg.content}</div>
              
              {/* Effet curseur clignotant pendant le streaming du dernier message */}
              {isStreaming && msg.id === messages[messages.length - 1].id && (
                <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 animate-pulse align-middle"></span>
              )}
            </div>
          </div>
        ))}
        
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-2 rounded text-xs flex items-center gap-2">
              <AlertTriangle size={14} />
              {error}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 backdrop-blur-sm">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isStreaming}
            placeholder={apiKey ? "Entrez une donnée brute pour analyse..." : "Veuillez configurer votre clé API ci-dessus"}
            className="w-full bg-[#0a0a0b] border border-zinc-700 text-zinc-200 text-sm rounded-md py-3 pl-4 pr-12 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono shadow-inner disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isStreaming || !apiKey}
            className="absolute right-2 p-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-[10px] text-zinc-600 text-center mt-2 font-mono flex justify-center gap-4">
          <span>STATUS: {apiKey ? 'LINKED' : 'OFFLINE'}</span>
          <span>MODE: REAL-TIME INFERENCE</span>
        </div>
      </div>
    </div>
  );
};
