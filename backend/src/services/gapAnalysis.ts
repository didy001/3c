
export interface GapResult {
  level: "OK" | "WARNING" | "CRITICAL";
  warning?: string;
  forcedModule?: string;
}

export function runGapAnalysis(ctx: any): GapResult {
  // 0. IMMUNITÉ ARCHITECTE (GOD MODE)
  // L'Architecte est la Source. Il ne subit pas le Reality Check car il définit la réalité.
  if (ctx.profileType === "ARCHITECTE") {
    return { level: "OK" };
  }

  const ambition = (ctx.goal || "").toUpperCase();
  const results = (ctx.current_results || "").toLowerCase();
  const time = parseInt(ctx.timeAvailable) || 0;
  
  // 1. DÉTECTION DU VIDE (Building in the Void)
  const hasNoResults = results.includes("0") || results.includes("rien") || results.includes("aucun") || results.length < 5;
  const isHighAmbition = ambition === "SCALE" || ambition === "OPTIMIZE";

  if (hasNoResults && isHighAmbition) {
    return {
      level: "CRITICAL",
      warning: "ALERTE RÉALITÉ : Ambition Empire détectée sans preuve de marché (0 Résultats).",
      forcedModule: "M_GEN_03" // Force le MVP
    };
  }

  // 2. DÉTECTION DE LA SURCHARGE (Burnout Risk)
  if (time < 60 && ambition === "BUILD") {
    return {
      level: "WARNING",
      warning: "Temps insuffisant pour l'objectif BUILD. Passage en mode MICRO-TASKS.",
      forcedModule: "M01" // Discipline
    };
  }

  // 3. DÉTECTION DE L'INCOHÉRENCE (Expert sans Offre)
  if (ctx.profileType === "EXPERT_TECHNIQUE" && !results.includes("offre")) {
    return {
      level: "WARNING",
      warning: "Expertise détectée mais aucune Offre packagée.",
      forcedModule: "M_GEN_02" // Conception Offre
    };
  }

  return { level: "OK" };
}
