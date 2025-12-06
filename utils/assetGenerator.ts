
import { ClientInput, ModuleItem, GeneratedAsset, AICustomization } from '../types';

/**
 * MOTEUR DE GÉNÉRATION D'ACTIFS 3C - VERSION UNIVERSELLE & DEEP STRUCTURE
 * Applique la rigueur du "Protocole Générateur" (Nœud Directif, Scaffolding, Fractale) à TOUS les scénarios.
 */

const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
const getDate = () => new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');

// Sécurisation des données
const safe = (val: string | undefined, defaultText: string = "NON DÉFINI") => {
  return val ? val : defaultText;
};

const detectUrgency = (input: ClientInput): boolean => {
  const text = (input.raw_report + " " + input.business_context).toLowerCase();
  const time = parseInt(input.timeAvailable) || 0;
  return text.includes('24h') || text.includes('urgent') || text.includes('demain') || time > 300; 
};

// SÉLECTEUR DE "SAVEUR" ARCHITECTURALE (MATRICE D'ADAPTATION CONTEXTUELLE)
// Problème -> Architecture -> Livrable
const selectArchitecture = (input: ClientInput, aiRec?: string): 'SPRINT' | 'VISION' | 'STANDARD' | 'GENERATOR' | 'EMPIRE_BUILDER' => {
  if (aiRec && ['SPRINT', 'VISION', 'STANDARD', 'GENERATOR', 'EMPIRE_BUILDER'].includes(aiRec)) {
    return aiRec as any;
  }

  const text = (input.raw_report + " " + input.business_context + " " + input.goal).toUpperCase();
  const results = input.current_results.toLowerCase();
  const hasValidation = results.includes('vente') || results.includes('client') || results.includes('ca') || results.includes('revenu');

  // Matrice d'Adaptation
  if (input.profileType === 'ARCHITECTE') return 'EMPIRE_BUILDER'; // GOD MODE
  if ((input.goal === 'OPTIMIZE' && hasValidation)) return 'EMPIRE_BUILDER';
  if (text.includes('FORMATION') || text.includes('SAVOIR') || text.includes('COMPETENCE')) return 'GENERATOR';
  if (detectUrgency(input) || text.includes('CASHFLOW') || text.includes('SURVIE')) return 'SPRINT';
  if (text.includes('INNOVATION') || text.includes('CONCEPT')) return 'VISION';
  
  return 'STANDARD'; 
};

const ASCII_SEAL = `
      [ 3C SYSTEM ]
      CONFIDENTIAL
      ///////////
`;

export const generateIndustrialAssets = (
  input: ClientInput, 
  modules: ModuleItem[], 
  aiDirective: string,
  customization?: AICustomization,
  aiArchitecture?: string
): GeneratedAsset[] => {
  const assets: GeneratedAsset[] = [];
  const clientTag = sanitize(input.business_context.split(' ')[0] || 'CLIENT');
  const architecture = selectArchitecture(input, aiArchitecture);
  const ai = customization || {} as AICustomization; 
  const isGodMode = input.profileType === 'ARCHITECTE';

  // --- GOD MODE : PLAN MAÎTRE POUR L'ADMIN ---
  if (isGodMode) {
    assets.push({
      id: 'MASTER_PLAN',
      type: 'STRATEGY_PDF',
      title: '00_MASTER_PLAN_3C_ORIGIN.md',
      description: 'GOD MODE - Plan de Domination du Système.',
      content: `
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
      `
    });

    assets.push({
      id: 'SCRIPT_LICENCE',
      type: 'SCRIPT_TXT',
      title: 'SCRIPT_VENTE_LICENCE_3C.txt',
      description: 'GOD MODE - Vendre la Franchise.',
      content: `
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
      `
    });

    return assets;
  }

  // --- STANDARDISATION UNIVERSELLE : NŒUDS DIRECTIFS ---
  // Peu importe l'architecture, on livre la PROFONDEUR TOTALE (Directive, Scaffolding, Nexus Sync).

  // 00. ONBOARDING (MISSION BRIEFING)
  assets.push({
    id: '00_ONBOARDING',
    type: 'STRATEGY_PDF',
    title: `00_${clientTag}_Onboarding_Mission.pdf`,
    description: 'J0 - Instructions de démarrage immédiat.',
    content: `
${ASCII_SEAL}
# MISSION BRIEFING: ${clientTag}
## DATE: ${getDate()} | MODE: ${architecture}

> "L'ambition sans système est une hallucination."

### 1. DIAGNOSTIC SYSTÉMIQUE (CONTEXTE C2)
${safe(ai.diagnostic_summary, "Analyse en cours...")}

### 2. INTELLIGENCE TACTIQUE (SHADOW INSIGHT)
${safe(ai.niche_insight, "Marché saturé. Différenciation requise.")}

### 3. ACTION IMMÉDIATE (H+1)
[ ] Confirmer réception du dossier (Ce fichier)
[ ] Signer le contrat d'Alliance (Fichier 09)
[ ] Exécuter la première action de la Checklist (Fichier 04)

---
*Ceci n'est pas un conseil. C'est un protocole d'exécution.*
`
  });

  // 01. AUDIT 360 (NOEUD D'ANALYSE)
  assets.push({
    id: '01_AUDIT',
    type: 'EXECUTION_XLS',
    title: `01_${clientTag}_Audit_360.csv`,
    description: 'J0/J1 - Diagnostic complet & Points d\'Impact.',
    content: `ZONE,RADAR,ANALYSE_SHADOW,ACTION_PRIORITAIRE
OPPORTUNITE,DETECTEE,"${safe(ai.audit_top_opportunity)}","ACTIVER MAINTENANT"
FAILLE,CRITIQUE,"${safe(ai.audit_critical_flaw)}","CORRIGER MAINTENANT"
STRATEGIE,PIVOT,"${safe(ai.niche_insight)}","ADAPTER OFFRE"
RISQUE,VITAL,"${safe(ai.risk_mitigation)}","EXECUTER PROTOCOLE"
`
  });

  // 02. SHADOW MAP (VISUAL)
  assets.push({
    id: '02_SHADOWMAP',
    type: 'STRATEGY_PDF',
    title: `02_${clientTag}_ShadowMap_v1.pdf`,
    description: 'J1 - Synthèse visuelle des axes.',
    content: `
# SHADOW MAP TACTIQUE
=========================================
      [MODELE: ${safe(ai.shadow_axis_1)}]
            /  \\
           /    \\
[METHODE: ${safe(ai.shadow_axis_2)}]--[MENTAL: ${safe(ai.shadow_axis_3)}]
=========================================

>>> POINT D'IMPACT UNIQUE (THE ONE THING) <<<
[ ${safe(ai.impact_point_unique)} ]
`
  });

  // 03. PLAN D'ACTION PRINCIPAL (STRUCTURE NŒUD DIRECTIF)
  // Structure universelle : Tâche > Objectif > Template > Scaffolding > Nexus Sync.
  
  let planStructure = "";
  
  if (architecture === 'SPRINT') {
    planStructure = `
### PHASE 1 : ARMEMENT (H+1 - H+4)
Objectif Court Terme : Offre Minimale Viable prête.
Action : ${safe(ai.action_j1_detail)}
Outil : Fichier 06 (Scripts)
Scaffolding (Pourquoi) : "Pas de perfection. Vitesse = Survie."

### PHASE 2 : ASSAUT (H+5 - H+12)
Objectif Court Terme : 10 Conversations qualifiées.
Action : ${safe(ai.flux_tactic)}
KPI : 10 Conversations.
Scaffolding (Comment) : "Utilisez le script Facebook Handraiser."

### PHASE 3 : ENCAISSEMENT (H+13 - H+24)
Objectif Court Terme : Première transaction validée.
Action : ${safe(ai.action_j3_detail)}
Sync Nexus : Rapport immédiat dans le groupe.
`;
  } else {
    planStructure = `
### PHASE 1 : ALIGNEMENT & OFFRE (J1-J2)
Objectif Court Terme (Early Win) : ${safe(ai.mvp_name_suggestion)} validé.
Concept (C2) : ${safe(ai.shadow_axis_1)}
Action Clé (C3) : ${safe(ai.action_j1_detail)}
Scaffolding Pédagogique : "Cette étape sert à valider la pertinence de votre offre auprès du public cible avant de construire."

### PHASE 2 : FLUX & SYSTÈME (J3-J5)
Objectif Court Terme : Machine à distribuer active.
Méthode (C1) : ${safe(ai.flux_tactic)}
Action Clé : ${safe(ai.action_j2_detail)}
Outil : SOP 1 (Fichier 05)
Scaffolding Pédagogique : "Ne vendez pas. Proposez une solution à un problème identifié."

### PHASE 3 : AUTORITÉ & SCALE (J6-J7)
Objectif Court Terme : Domination de niche.
Action Clé : ${safe(ai.content_hook_j1)}
Feedback Loop : Checkpoint J+7 (Fichier 11).
Nexus Sync : ${safe(ai.next_level_mechanism)}
`;
  }

  assets.push({
    id: '03_PLAN',
    type: 'STRATEGY_PDF',
    title: `03_${clientTag}_Manuel_Operatoire_v1.md`,
    description: 'J1 - Le Manuel Complet (Nœud Directif).',
    content: `
# MANUEL OPÉRATOIRE : ${clientTag}
## MODE: ${architecture} | CIBLE: ${safe(ai.mvp_name_suggestion)}

> "Ce document est un Nœud Directif. Il remplace l'incertitude par un processus."

${planStructure}

### NOTES PÉDAGOGIQUES DE L'ARCHITECTE (SCAFFOLDING)
1. Pourquoi ce plan ? : ${safe(aiDirective)}
2. Le piège à éviter : ${safe(ai.risk_mitigation)}
3. La clé du succès : L'exécution radicale des Checklist J1-J7.
`
  });

  // 04. CHECKLIST (QUEST LOG - UNIVERSEL)
  // Structure enrichie pour tous : Action | KPI | Preuve | Commentaire Pédagogique | Sync Status
  assets.push({
    id: '04_CHECKLIST',
    type: 'EXECUTION_XLS',
    title: `04_${clientTag}_Journal_Execution.csv`,
    description: 'J1-J7 - La grille de pilotage quotidienne.',
    content: `JOUR,ACTION_PRINCIPALE,KPI_CIBLE,PREUVE_REQUISE,SCAFFOLDING_PEDAGOGIQUE,NEXUS_SYNC_STATUS
J1,Lancement ${safe(ai.mvp_name_suggestion)},Offre Prête,PDF Offre,"Ne cherchez pas la perfection, cherchez la clarté.",[]
J2,Construction Support,Support Finalisé,Fichier Final,"Le support doit délivrer la promesse J1.",[]
J3,Activation Flux,10 Contacts,Screenshot Conv,"Allez chercher le marché, ne l'attendez pas.",[]
J4,Signal Autorité,${safe(ai.kpi_1_target)},Lien Post,"Montrez votre expertise, ne la dites pas.",[]
J5,Relance & Closing,${safe(ai.kpi_2_target)},Screenshot Vente,"L'argent est dans la relance.",[]
J6,Optimisation,Analyse Data,Rapport J6,"Regardez ce qui a marché, tuez le reste.",[]
J7,Bilan & Alliance,Contrat Signé,Fichier 09,"Engagement pour le cycle suivant (Lieutenant).",[SYNC REQUIRED]
`
  });

  // 05. SOPs (PROCÉDURES)
  assets.push({
    id: '05_SOP',
    type: 'SCRIPT_TXT',
    title: `05_${clientTag}_SOPs_Standard.md`,
    description: 'J2 - Procédures standardisées.',
    content: `
# SOP 1 : ${safe(ai.sop_1_title).toUpperCase()}
CONTEXTE : ${architecture}
PROCÉDURE PAS-À-PAS :
${safe(ai.sop_1_process)}

# SOP 2 : ${safe(ai.sop_2_title).toUpperCase()}
CONTEXTE : CLOSING / FLUX
PROCÉDURE PAS-À-PAS :
${safe(ai.sop_2_process)}
`
  });

  // 06. TEMPLATES & ARSENAL
  assets.push({
    id: '06_TEMPLATES',
    type: 'SCRIPT_TXT',
    title: `06_${clientTag}_Arsenal_Tactique.txt`,
    description: 'J2 - Scripts et Templates prêts à l\'emploi.',
    content: `
=== ARSENAL DE COMMUNICATION ===

[GUIDE IA CONTENT]
Prompt Maître : "${safe(ai.ai_content_prompt)}"

[CANAL 1 : FACEBOOK/LINKEDIN]
Script d'accroche : "${safe(ai.facebook_handraiser_text)}"

[CANAL 2 : TIKTOK/REELS]
Script Hook : "${safe(ai.tiktok_hook_script)}"

[CANAL 3 : MESSAGERIE DIRECTE]
Ouverture : "${safe(ai.whatsapp_opening_line)}"
Closing : "${safe(ai.whatsapp_closing_sequence)}"

[EMAIL]
Sujet : ${safe(ai.email_subject_line)}

[SCRIPT D'AUTORITÉ DU SYSTÈME]
Objectif : Vous positionner comme référence tout en validant votre méthode.
Script : "${safe(ai.system_evangelism_script)}"
Usage : À utiliser lors de votre première victoire publique pour expliquer le "Comment".
`
  });

  // 07. DASHBOARD KPI
  assets.push({
    id: '07_DASHBOARD',
    type: 'EXECUTION_XLS',
    title: `07_${clientTag}_Dashboard_KPIs.csv`,
    description: 'J2 - Tableau de bord de pilotage.',
    content: `METRIQUE,OBJECTIF_SEMAINE,ACTUEL,ECART
${safe(ai.kpi_1_name, "LEADS QUALIFIÉS")},${safe(ai.kpi_1_target, "10")},0,=C2-B2
${safe(ai.kpi_2_name, "VENTES VALIDÉES")},${safe(ai.kpi_2_target, "1")},0,=C3-B3
TAUX_CONVERSION,10%,0,=C3/C2
REVENUS,PROFITABLE,0,-
`
  });

  // 08. DELIVERY NOTES
  assets.push({
    id: '08_NOTES',
    type: 'STRATEGY_PDF',
    title: `08_${clientTag}_Note_Livraison.docx`,
    description: 'J2 - Ordre de mission officiel.',
    content: `ORDRE DE MISSION OFFICEL\n\n${safe(ai.delivery_note_intro)}\n\nCe pack contient votre système d'exploitation complet pour la semaine à venir. Exécution immédiate demandée.`
  });

  // 09. CONTRAT
  assets.push({
    id: '09_CONTRAT',
    type: 'STRATEGY_PDF',
    title: `09_${clientTag}_Pacte_Alliance.pdf`,
    description: 'J0 - Accord d\'Empreinte (Fidélité).',
    content: `PACTE D'ALLIANCE 3C\n\nENGAGEMENT SUR L'HONNEUR\nProjet: ${safe(ai.mvp_name_suggestion)}\n\nJe m'engage à exécuter ce plan et à reverser l'empreinte convenue (3-5%) sur les résultats générés.\n\nSigné: ___________________`
  });

  // 12. PLAYBOOK EVOLUTION (LE PONT FRACTAL)
  assets.push({
    id: '12_PLAYBOOK',
    type: 'SCRIPT_TXT',
    title: `12_${clientTag}_Next_Level_Key.md`,
    description: 'J7 - Clé vers le niveau supérieur (Lieutenant).',
    content: `
# ACCÈS NIVEAU 2 (VERROUILLÉ)
Félicitations. Si vous lisez ceci, vous êtes prêt à devenir un LIEUTENANT du réseau fractal.

MÉCANIQUE D'ÉVOLUTION VERS L'EMPIRE :
${safe(ai.next_level_mechanism)}

Pour débloquer NEXUS et l'automatisation totale, contactez l'Architecte avec le code : "SHADOW_ASCENSION".
`
  });

  // 13. EMPIRE SPECIFIC ASSETS (Si Mode Empire, on ajoute encore plus)
  if (architecture === 'EMPIRE_BUILDER') {
    assets.push({
      id: '13_EMPIRE_KIT',
      type: 'ARCHIVE_ZIP',
      title: `13_${clientTag}_Franchise_Kit.zip`,
      description: 'EMPIRE - Protocole de Réplication.',
      content: `
[KIT DE FRANCHISE AUTOMATISÉ]
1. Manuel Opératoire du Lieutenant (Comment gérer les ops sans vous)
2. Contrat de Licence Fractale (Juridique)
3. Matrice de Viralité (Calculateur LTV > CAC)
      `
    });
  }

  // 14. RESSOURCES
  assets.push({
    id: '14_RESSOURCES',
    type: 'SCRIPT_TXT',
    title: `14_${clientTag}_Armurerie_FAQ.md`,
    description: 'Support continu.',
    content: `# ARMURERIE & FAQ\nRéponses tactiques pour le terrain ${clientTag}.\n\nQ: Que faire si ça ne marche pas J1 ?\nR: Revoyez l'offre, pas le marché.\n\nQ: Comment scaler ?\nR: Activez le Fichier 12.`
  });

  // 15. KIT D'EXPANSION SYSTÉMIQUE (SELF-SELLING PROTOCOL)
  assets.push({
    id: '15_EXPANSION',
    type: 'STRATEGY_PDF',
    title: `15_${clientTag}_System_Referral_Kit.pdf`,
    description: 'BONUS - Comment monétiser votre succès avec 3C.',
    content: `
# KIT D'EXPANSION DU SYSTÈME 3C
> "Votre succès est la meilleure publicité du Système. Monétisez-la."

### POURQUOI DEVENIR LIEUTENANT ?
Vous venez d'utiliser l'Arme. Maintenant, vendez les munitions.
En tant que Lieutenant certifié, vous touchez 10% sur chaque Plan 3C généré pour vos contacts.

### VOTRE SCÉNARIO DE RECOMMANDATION
Quand on vous demande : "Comment as-tu fait pour ${safe(ai.mvp_name_suggestion)} ?"
Ne dites pas : "J'ai travaillé dur."
Dites : "J'ai utilisé le Système d'Exploitation 3C. C'est une machine à générer de la certitude."

### LIEN D'ACTIVATION
Pour activer votre code Lieutenant : [LIEN_NEXUS_PROFIL]
`
  });

  // --- 2. SÉQUENCE WATCHDOG (MACHINE READABLE) ---
  assets.push({
    id: 'WATCHDOG_SEQ',
    type: 'SYSTEM_JSON',
    title: `WATCHDOG_${clientTag}_SEQUENCE.json`,
    description: 'AUTOMATION - Séquence de suivi J1-J7.',
    content: JSON.stringify({
      campaign_name: `3C_SUIVI_${clientTag}`,
      emails: [
        { day: 1, subject: "ACTION J1", body: `Action requise : ${safe(ai.action_j1_detail)}. Preuve attendue.` },
        { day: 3, subject: "FLUX J3", body: `Activez le flux : ${safe(ai.flux_tactic)}.` },
        { day: 7, subject: "BILAN J7", body: `Rapport final exigé. Nexus Sync Check.` }
      ]
    }, null, 2)
  });

  return assets;
};
