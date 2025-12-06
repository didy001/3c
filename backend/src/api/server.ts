
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
  const requestId = `req_${Date.now()}`;
  const ctx = req.body;

  // 1. INPUT VALIDATION
  if (!ctx || !ctx.business_context) {
    return res.status(400).json({ 
      error: "INVALID_INPUT", 
      message: "Business Context is required to initialize the Shadow Engine." 
    });
  }

  try {
    console.log(`[${requestId}] Starting generation for: ${ctx.business_context.substring(0, 50)}...`);

    // 2. GAP ANALYSIS (Deterministic Backend Logic)
    const gap = runGapAnalysis(ctx);
    if (gap.level === "CRITICAL") {
      console.warn(`[${requestId}] GAP CRITICAL: ${gap.warning}`);
      ctx.gapWarning = gap.warning;
      // On force le module de correction dans le contexte
      if (gap.forcedModule) ctx.forcedModule = gap.forcedModule;
    }

    // 3. CIEL ANALYSIS (AI Decision - External API)
    let aiDecision;
    try {
      aiDecision = await callConstrainedAI(ctx.prompt || "", ctx.allowedModules || []);
    } catch (aiError: any) {
      console.error(`[${requestId}] AI SERVICE FAILURE:`, aiError);
      return res.status(502).json({
        error: "AI_GATEWAY_TIMEOUT",
        message: "Le service d'intelligence (OpenRouter) ne répond pas. Vérifiez votre clé API ou réessayez.",
        details: aiError.message
      });
    }

    // 4. LOGIC VALIDATION
    if (!aiDecision || aiDecision.moduleId === "NONE" || aiDecision.error) {
      console.error(`[${requestId}] AI LOGIC ERROR:`, aiDecision);
      return res.status(422).json({
        error: "AI_PROCESSING_FAILURE",
        message: "L'IA a rejeté la demande ou a échoué à structurer la réponse.",
        details: aiDecision?.reason || "Invalid JSON output"
      });
    }

    // 5. ASSET GENERATION & QUEUING (Backend Factory)
    try {
      // On passe la décision IA au générateur pour injection
      const job = await enqueueJob({ requestId, ctx, aiDecision });
      return res.status(202).json({ 
        requestId, 
        jobId: job.id, 
        status: "queued",
        message: "Pack Shadow 14 Fichiers en cours de génération." 
      });
    } catch (queueError: any) {
      console.error(`[${requestId}] QUEUE ERROR:`, queueError);
      return res.status(503).json({
        error: "QUEUE_FULL",
        message: "Le système de production est saturé.",
        details: queueError.message
      });
    }

  } catch (internalError: any) {
    console.error(`[${requestId}] CRITICAL SYSTEM ERROR:`, internalError);
    return res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Erreur critique du noyau backend.",
      details: internalError.message
    });
  }
});

export default app;
