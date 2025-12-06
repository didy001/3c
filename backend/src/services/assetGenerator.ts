
import fs from "fs";
import { signBuffer } from "../infra/sign";

const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
const getDate = () => new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');

// SÉLECTEUR DE "SAVEUR" ARCHITECTURALE (MATRICE D'ADAPTATION)
const selectArchitecture = (ctx: any): 'SPRINT' | 'VISION' | 'STANDARD' | 'GENERATOR' | 'EMPIRE_BUILDER' => {
  const text = (ctx.raw_report + " " + ctx.business_context + " " + ctx.goal).toUpperCase();
  const results = (ctx.current_results || "").toLowerCase();
  const hasValidation = results.includes('vente') || results.includes('client') || results.includes('ca');

  if (ctx.profileType === 'ARCHITECTE') return 'EMPIRE_BUILDER'; // Priorité Absolue
  if ((ctx.goal === 'OPTIMIZE' && hasValidation)) return 'EMPIRE_BUILDER';
  if (text.includes('FORMATION') || text.includes('SAVOIR') || text.includes('COMPETENCE')) return 'GENERATOR';
  if (text.includes('URGENT') || text.includes('24H') || text.includes('SURVIE')) return 'SPRINT';
  if (text.includes('INNOVATION') || text.includes('CONCEPT')) return 'VISION';
  
  return 'STANDARD';
};

export async function generateAssets(context: any, spec: { aiDecision?: any }) {
  const outputs: { name: string; path: string; hash: string }[] = [];
  const clientTag = sanitize(context.business_context.split(' ')[0] || 'CLIENT');
  const architecture = selectArchitecture(context);
  const isGodMode = context.profileType === 'ARCHITECTE';
  
  // Données IA (Fallback si manquant ou échec IA)
  const ai = spec.aiDecision?.customization || {
    diagnostic_summary: "Analyse Standard Systemique.",
    mvp_name_suggestion: "Protocole Alpha",
    action_j1_detail: "Initialisation",
    action_j2_detail: "Construction",
    action_j3_detail: "Validation",
    audit_top_opportunity: "Optimisation Flux",
    audit_critical_flaw: "Manque de Structure",
    shadow_axis_1: "Modèle",
    shadow_axis_2: "Méthode",
    shadow_axis_3: "Mental",
    impact_point_unique: "Exécution",
    flux_tactic: "Canal Direct",
    facebook_handraiser_text: "Script FB",
    tiktok_hook_script: "Script TikTok",
    next_level_mechanism: "Nexus Integration",
    system_evangelism_script: "J'ai utilisé le Système 3C.",
    kpi_1_name: "Cash",
    kpi_1_target: "Positif",
    sop_1_title: "Procédure 1",
    sop_1_process: "Étapes...",
    sop_2_title: "Procédure 2",
    sop_2_process: "Étapes...",
    content_hook_j1: "Hook J1",
    email_subject_line: "Sujet",
    whatsapp_opening_line: "Salut",
    whatsapp_closing_sequence: "Lien",
    ai_content_prompt: "Prompt Content",
    kpi_2_name: "Volume",
    kpi_2_target: "Cible",
    delivery_note_intro: "Voici vos ordres."
  };

  const aiDirective = spec.aiDecision?.rationale || "Exécution Standard.";

  const createFile = async (fileName: string, content: string) => {
    const path = `/tmp/${Date.now()}_${fileName}`;
    fs.writeFileSync(path, content);
    outputs.push({ name: fileName, path: path, hash: "signed_backend" });
  };

  const ASCII_SEAL = `[ 3C SYSTEM // BACKEND GENERATED ]\nCONFIDENTIAL // ARCHITECTURE: ${architecture}`;

  // --- BRANCHE SPÉCIALE : GOD MODE (ADMIN) ---
  if (isGodMode) {
    // 1. LE MASTER PLAN (Pour toi)
    await createFile(`00_MASTER_PLAN_3C_ORIGIN.md`, `
${ASCII_SEAL}
# PLAN MAÎTRE : EXPANSION 3C (GOD MODE)
## CIBLE : VENTE DU SYSTÈME LUI-MÊME

### OBJECTIF SUPRÊME
Ne plus vendre de temps. Vendre l'OS (Operating System).
Transformer 3C en standard industriel.

### PHASE 1 : LA PREUVE PAR L'EXEMPLE (J1-J14)
- Utiliser le système pour générer 3 Business Cases réels.
- Documenter le processus (Building in Public).
- Action : Lancer une offre "Bêta-Testeur" pour valider le moteur.

### PHASE 2 : L'OFFRE FRANCHISE (J15-J30)
- Créer le "Kit Lieutenant" (M_EMPIRE_02).
- Vendre la licence d'utilisation à 5 consultants.
- Prix : 2000€ Setup + 10% Royalties.

### PHASE 3 : AUTOMATISATION NEXUS (J30+)
- Connecter l'API (ce backend) à une interface publique simple.
- Laisser le système tourner en SaaS.
`);

    // 2. LE SCRIPT DE VENTE DU SYSTÈME (Pour closer les Lieutenants)
    await createFile(`SCRIPT_VENTE_LICENCE_3C.txt`, `
[CONTEXTE]
Tu parles à un Coach/Consultant épuisé.

[ACCROCHE]
"Tu passes combien de temps à écrire des plans pour tes clients ? 10h ?
J'ai codé un Architecte Numérique qui le fait en 30 secondes. Mieux que toi."

[DÉMO]
"Donne-moi un problème client."
(Tu entres le problème dans l'Usine. Tu montres le PDF généré).
"Voilà. Le plan, le contrat, les scripts. Tout est prêt."

[CLOSING]
"Je ne te vends pas un logiciel. Je te vends ta liberté.
Tu deviens Lieutenant 3C. Tu utilises ma technologie. Tu gardes 90% du cash."
`);

    // 3. LA CARTE DE L'EMPIRE
    await createFile(`CARTOGRAPHIE_EMPIRE_FRACTAL.csv`, `
NIVEAU,ROLE,REVENU_POTENTIEL,ACTION
0,SOURCE (TOI),ILLIMITÉ,Améliorer le Code
1,LIEUTENANT (Franchisé),5k-10k/mois,Vendre des Plans
2,OPERATEUR (Client),1k-5k/mois,Exécuter le Plan
`);

    return outputs; // Fin anticipée pour l'Architecte
  }

  // --- BRANCHE STANDARD (CLIENTS) ---

  // 00. ONBOARDING
  await createFile(`00_${clientTag}_Onboarding.pdf`, `${ASCII_SEAL}\n# MISSION BRIEFING\n${ai.diagnostic_summary}\n\nORDRE J0: Signer Fichier 09.`);
  
  // 01. AUDIT
  await createFile(`01_${clientTag}_Audit_360.csv`, `ZONE,ANALYSE\nOPPORTUNITE,${ai.audit_top_opportunity}\nFAILLE,${ai.audit_critical_flaw}`);

  // 02. SHADOW MAP
  await createFile(`02_${clientTag}_ShadowMap.pdf`, `# SHADOW MAP\nPoint Impact: ${ai.impact_point_unique}\nAxe Modele: ${ai.shadow_axis_1}`);

  // 03. PLAN D'ACTION (UNIVERSEL DÉTAILLÉ)
  let planContent = `# MANUEL OPÉRATOIRE ${architecture}\nCIBLE: ${ai.mvp_name_suggestion}\n\n`;
  
  if (architecture === 'SPRINT') {
    planContent += `[PHASE 1: ARMEMENT]\nObjectif: Offre Prête.\nAction: ${ai.action_j1_detail}\nScaffolding: "Vitesse = Survie."\n\n[PHASE 2: ASSAUT]\nObjectif: 10 Leads.\nAction: ${ai.flux_tactic}\n\n[PHASE 3: ENCAISSEMENT]\nAction: ${ai.action_j3_detail}\nSync Nexus: Rapport immédiat.`;
  } else {
    planContent += `[PHASE 1: OFFRE]\nObjectif: ${ai.mvp_name_suggestion}.\nAction: ${ai.action_j1_detail}\nScaffolding: "Validez l'offre avant de construire."\n\n[PHASE 2: FLUX]\nMéthode: ${ai.flux_tactic}\nAction: ${ai.action_j2_detail}\n\n[PHASE 3: SCALE]\nAction: ${ai.content_hook_j1}\nNexus Sync: ${ai.next_level_mechanism}`;
  }
  
  planContent += `\n\n[NOTES PÉDAGOGIQUES]\n${aiDirective}`;
  
  await createFile(`03_${clientTag}_PlanAction_v1.md`, planContent);

  // 04. CHECKLIST (UNIVERSELLE)
  await createFile(`04_${clientTag}_Checklist.csv`, `JOUR,ACTION,KPI,PREUVE,SCAFFOLDING,SYNC_STATUS\nJ1,${ai.action_j1_detail},Offre Prête,PDF,Focus Clarté,[]\nJ2,${ai.action_j2_detail},Support Prêt,Fichier,Simplicité,[]`);

  // 05. SOPs
  await createFile(`05_${clientTag}_SOPs.txt`, `# SOP 1: ${ai.sop_1_title}\n${ai.sop_1_process}`);

  // 06. ARSENAL SCRIPTS
  await createFile(`06_${clientTag}_Scripts.txt`, `FB: ${ai.facebook_handraiser_text}\nTIKTOK: ${ai.tiktok_hook_script}\n\n[SCRIPT AUTORITÉ SYSTÈME]\n"${ai.system_evangelism_script}"`);

  // 07. DASHBOARD
  await createFile(`07_${clientTag}_KPIs.csv`, `METRIQUE,CIBLE\n${ai.kpi_1_name},${ai.kpi_1_target}`);

  // 08. DELIVERY NOTE
  await createFile(`08_${clientTag}_Ordre_Mission.docx`, `ORDRE DE MISSION\n${ai.delivery_note_intro}`);

  // 09. CONTRAT
  await createFile(`09_${clientTag}_Contrat.pdf`, `PACTE D'ALLIANCE 3C\nProjet: ${ai.mvp_name_suggestion}`);

  // 12. EVOLUTION
  await createFile(`12_${clientTag}_Evolution.md`, `NIVEAU SUIVANT VERROUILLÉ (LIEUTENANT)\nCondition: ${ai.next_level_mechanism}`);

  // 13. EMPIRE KIT (Conditionnel)
  if (architecture === 'EMPIRE_BUILDER') {
    await createFile(`13_${clientTag}_Franchise_Kit.zip`, `[MANUEL LIEUTENANT]\n[CONTRAT FRANCHISE]`);
  }

  // 15. EXPANSION (SELF-SELLING)
  await createFile(`15_${clientTag}_System_Referral.pdf`, `# KIT D'EXPANSION 3C\nTransformez votre succès en rente. Devenez Lieutenant.`);

  // AUTOMATION WATCHDOG
  const watchdog = JSON.stringify({
    campaign: `SUIVI_${clientTag}`,
    emails: [
      { day: 1, subject: "ACTION", body: ai.action_j1_detail },
      { day: 7, subject: "BILAN", body: "Rapport exigé." }
    ]
  }, null, 2);
  await createFile(`WATCHDOG_${clientTag}.json`, watchdog);

  return outputs;
}
