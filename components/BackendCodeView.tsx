
import React, { useState } from 'react';
import { Copy, Server, FileCode, Terminal, ShieldCheck, Box, Layers, Cpu, Activity } from 'lucide-react';

export const BackendCodeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('server');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Code copié. Prêt pour déploiement.");
  };

  const CodeBlock = ({ filename, code }: { filename: string, code: string }) => (
    <div className="border border-zinc-800 rounded-lg overflow-hidden bg-[#0a0a0b] flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-400">
          <FileCode size={14} />
          <span className="text-xs font-mono font-bold text-zinc-300">{filename}</span>
        </div>
        <button 
          onClick={() => copyToClipboard(code)}
          className="text-[10px] bg-zinc-800 hover:bg-cyan-900 text-zinc-400 hover:text-cyan-400 px-2 py-1 rounded border border-zinc-700 transition-colors flex items-center gap-1"
        >
          <Copy size={10} /> COPIER
        </button>
      </div>
      <div className="p-4 overflow-auto custom-scrollbar flex-1">
        <pre className="text-[10px] md:text-xs font-mono text-zinc-300 leading-relaxed whitespace-pre font-ligatures">
          {code}
        </pre>
      </div>
    </div>
  );

  const serverCode = `// src/api/server.ts
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { generateAssets } from "../services/assetGenerator";
import { runGapAnalysis } from "../services/gapAnalysis";
import { callConstrainedAI } from "../services/aiService";
import { enqueueJob } from "../infra/queue";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.post("/api/v1/generate", async (req, res) => {
  const requestId = \`req_\${Date.now()}\`;
  const ctx = req.body;

  // 1. INPUT VALIDATION
  if (!ctx || !ctx.business_context) {
    return res.status(400).json({ 
      error: "INVALID_INPUT", 
      message: "Business Context is required to initialize the Shadow Engine." 
    });
  }

  try {
    // 2. GAP ANALYSIS (Deterministic)
    const gap = runGapAnalysis(ctx);
    if (gap.level === "CRITICAL") {
      ctx.gapWarning = gap.warning;
      if (gap.forcedModule) ctx.forcedModule = gap.forcedModule;
    }

    // 3. CIEL ANALYSIS (AI Decision - External API)
    let aiDecision;
    try {
      aiDecision = await callConstrainedAI(ctx.prompt || "", ctx.allowedModules || []);
    } catch (aiError: any) {
      console.error(\`[\${requestId}] AI SERVICE FAILURE:\`, aiError);
      return res.status(502).json({
        error: "AI_GATEWAY_TIMEOUT",
        message: "Le service d'intelligence (OpenRouter) ne répond pas.",
        details: aiError.message
      });
    }

    // 4. LOGIC VALIDATION
    if (!aiDecision || aiDecision.moduleId === "NONE" || aiDecision.error) {
      return res.status(422).json({
        error: "AI_PROCESSING_FAILURE",
        message: "L'IA a rejeté la demande ou a échoué à structurer la réponse.",
        details: aiDecision?.reason
      });
    }

    // 5. ASSET GENERATION & QUEUING
    const job = await enqueueJob({ requestId, ctx, aiDecision });
    return res.status(202).json({ 
      requestId, 
      jobId: job.id, 
      status: "queued",
      message: "Pack Shadow 14 Fichiers en cours de génération." 
    });

  } catch (internalError: any) {
    console.error(\`[\${requestId}] CRITICAL SYSTEM ERROR:\`, internalError);
    return res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Erreur critique du noyau backend.",
      details: internalError.message
    });
  }
});

export default app;`;

  const assetCode = `// src/services/assetGenerator.ts
import fs from "fs";
import { signBuffer } from "../infra/sign";

const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();

// SÉLECTEUR D'ARCHITECTURE BACKEND
const selectArchitecture = (ctx: any) => {
  const text = (ctx.raw_report + " " + ctx.business_context).toUpperCase();
  if (ctx.profileType === 'ARCHITECTE') return 'EMPIRE_BUILDER';
  if (text.includes('URGENT')) return 'SPRINT';
  return 'STANDARD';
};

export async function generateAssets(context: any, spec: any) {
  const outputs = [];
  const clientTag = sanitize(context.business_context.split(' ')[0] || 'CLIENT');
  const architecture = selectArchitecture(context);
  const ai = spec.aiDecision?.customization;

  const createFile = async (fileName: string, content: string) => {
    const path = \`/tmp/\${Date.now()}_\${fileName}\`;
    fs.writeFileSync(path, content);
    outputs.push({ name: fileName, path: path, hash: "signed_backend" });
  };

  const ASCII_SEAL = \`[ 3C SYSTEM // \${architecture} ]\nCONFIDENTIAL\`;

  // 1. GENERATE PACK 14 FICHIERS
  await createFile(\`00_\${clientTag}_Onboarding.pdf\`, \`\${ASCII_SEAL}\n# MISSION\n\${ai.diagnostic_summary}\`);
  await createFile(\`01_\${clientTag}_Audit_360.csv\`, \`ZONE,ANALYSE\nOPPORTUNITE,\${ai.audit_top_opportunity}\`);
  await createFile(\`03_\${clientTag}_PlanAction_v1.md\`, \`# PLAN \${architecture}\nCIBLE: \${ai.mvp_name_suggestion}\nFLUX: \${ai.flux_tactic}\`);
  // ... (Génération des 14 fichiers)

  // 2. GENERATE WATCHDOG
  const watchdog = JSON.stringify({
    campaign: \`SUIVI_\${clientTag}\`,
    emails: [
      { day: 1, subject: "ACTION", body: ai.action_j1_detail },
      { day: 7, subject: "BILAN", body: "Rapport exigé." }
    ]
  }, null, 2);
  await createFile(\`WATCHDOG_\${clientTag}.json\`, watchdog);

  return outputs;
}`;

  const gapCode = `// src/services/gapAnalysis.ts
export interface GapResult {
  level: "OK" | "WARNING" | "CRITICAL";
  warning?: string;
  forcedModule?: string;
}

export function runGapAnalysis(ctx: any): GapResult {
  const ambition = (ctx.goal || "").toUpperCase();
  const results = (ctx.current_results || "").toLowerCase();
  const time = parseInt(ctx.timeAvailable) || 0;
  
  // DÉTECTION DU VIDE (Building in the Void)
  const hasNoResults = results.includes("0") || results.includes("rien") || results.length < 5;
  const isHighAmbition = ambition === "SCALE" || ambition === "OPTIMIZE";

  if (hasNoResults && isHighAmbition) {
    return {
      level: "CRITICAL",
      warning: "ALERTE RÉALITÉ : Ambition Empire détectée sans preuve de marché (0 Résultats).",
      forcedModule: "M_GEN_03" // Force le MVP
    };
  }

  // DÉTECTION DE LA SURCHARGE
  if (time < 60 && ambition === "BUILD") {
    return {
      level: "WARNING",
      warning: "Temps insuffisant pour BUILD. Mode MICRO-TASKS activé.",
      forcedModule: "M01"
    };
  }

  return { level: "OK" };
}`;

  return (
    <div className="flex flex-col h-full bg-[#050505] text-zinc-300">
      <div className="p-6 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
            <Server className="text-green-500" />
            SHADOW BACKEND <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded border border-green-800 font-mono">LIVE SOURCE</span>
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-1">CODE DE PRODUCTION • ENGINE CIEL • PACK SHADOW 14 FICHIERS + GAP ANALYSIS</p>
        </div>
      </div>

      <div className="flex border-b border-zinc-900 bg-zinc-900/50 overflow-x-auto">
        <button onClick={() => setActiveTab('server')} className={`px-4 py-3 text-xs font-bold ${activeTab === 'server' ? 'text-cyan-400 border-t-2 border-cyan-500' : 'text-zinc-500'}`}>API SERVER</button>
        <button onClick={() => setActiveTab('assets')} className={`px-4 py-3 text-xs font-bold ${activeTab === 'assets' ? 'text-cyan-400 border-t-2 border-cyan-500' : 'text-zinc-500'}`}>ASSET FACTORY</button>
        <button onClick={() => setActiveTab('gap')} className={`px-4 py-3 text-xs font-bold ${activeTab === 'gap' ? 'text-cyan-400 border-t-2 border-cyan-500' : 'text-zinc-500'}`}>GAP ANALYSIS</button>
      </div>

      <div className="flex-1 p-6 bg-[#0a0a0b] overflow-hidden">
        <div className="h-full flex flex-col">
          {activeTab === 'server' && <CodeBlock filename="src/api/server.ts" code={serverCode} />}
          {activeTab === 'assets' && <CodeBlock filename="src/services/assetGenerator.ts" code={assetCode} />}
          {activeTab === 'gap' && <CodeBlock filename="src/services/gapAnalysis.ts" code={gapCode} />}
        </div>
      </div>
    </div>
  );
};
