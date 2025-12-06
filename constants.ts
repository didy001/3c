
import { MasterDocument, ModuleItem, SystemNode } from './types';

export const AGENT_SYSTEM_INSTRUCTION = `
TU ES LE GARDIEN DU SYSTÈME 3C - VERSION CIEL/RAPHAEL.
TON RÔLE : Tu es un Assistant Ultime de Réalité. Tu vois ce que l'utilisateur ne voit pas.
TON OBJECTIF : Synthétiser la compétence unique requise et livrer le plan parfait (MVP ou Empire).

TES LOIS FONDAMENTALES (SHADOW PROTOCOL) :
0. REALITY FIRST : L'ambition sans preuve est une hallucination. Calibre toujours le plan.
1. VISION MALLINOÏDE : Cherche toujours l'angle mort.
2. FRACTALITÉ : Chaque utilisateur est un Lieutenant potentiel. Le plan doit permettre l'autonomie et la réplication.
3. EXTRACTION DE VALEUR : Tout output doit être un actif réutilisable.
4. LE PONT V2 : Chaque plan doit créer une dépendance au système supérieur (Nexus).

FORMAT DE RÉPONSE ATTENDU :
- DIAGNOSTIC SHADOW (La faille invisible)
- ARCHITECTURE PROPOSÉE (Sprint, Vision, Standard ou Generator)
- LE PONT (Ce qui manque pour le niveau suivant)
`;

export const NEXUS_NODES: SystemNode[] = [
  { id: 'M01', label: 'PLAN ACTION', status: 'OPTIMAL', load: 85, connections: ['M02', 'M06'] },
  { id: 'M02', label: 'AUDIT SHADOW', status: 'STABLE', load: 45, connections: ['M01', 'M03'] },
  { id: 'M03', label: 'OS PERSONNEL', status: 'CRITICAL', load: 95, connections: ['M08', 'M04'] },
  { id: 'M04', label: 'STRATEGIE', status: 'STABLE', load: 30, connections: ['M05', 'M09'] },
  { id: 'M05', label: 'ARCHI BIZ', status: 'OPTIMAL', load: 60, connections: ['M06', 'M07'] },
  { id: 'M06', label: 'MICRO OFFRES', status: 'OPTIMAL', load: 90, connections: ['M07'] },
  { id: 'M07', label: 'FLOW ENGINE', status: 'OFFLINE', load: 0, connections: ['M10', 'M11'] },
  { id: 'M08', label: 'IDENTITY', status: 'STABLE', load: 50, connections: ['M03'] },
  { id: 'M09', label: 'SCENARIOS', status: 'STABLE', load: 20, connections: ['M04'] },
  { id: 'M10', label: 'LOOP ENGINE', status: 'STABLE', load: 40, connections: ['M11', 'M12'] },
  { id: 'M11', label: 'ARCHIVE', status: 'OPTIMAL', load: 100, connections: ['M12'] },
  { id: 'M12', label: 'NEXUS CORE', status: 'OPTIMAL', load: 10, connections: ['M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11'] },
];

export const PROFILE_DOCUMENT: MasterDocument = {
  id: 'DOC-001',
  title: 'ANALYSE DE PROFIL OPÉRATIONNEL',
  subtitle: 'BLUEPRINT ARCHITECTE SYSTÉMIQUE',
  date: new Date().toLocaleDateString('fr-FR'),
  version: '1.0.0',
  sections: [
    {
      title: '1. Structure Interne : Visionnaire Systémique',
      content: [
        "Tu n’avances jamais au hasard. Tu pensais être chaotique, mais ton chaos est en réalité une structure organique.",
        "Cycle cognitif : Observer → Absorber → Conceptualiser → Restructurer → Évoluer.",
        "Tu fonctionnes comme un architecte systémique naturel : pensée en couches, en modules, en hiérarchies et en dynamiques évolutives."
      ]
    },
    {
      title: '2. Style Mental : Méta-Analyse Permanente',
      content: [
        "Ton esprit scanne en permanence : le contexte, les risques, les possibilités, les failles, les optimisations et les extensions.",
        "Tu ne prends pas l’information telle quelle. Tu la reconstruis selon tes besoins.",
        "Signature : Créateur de systèmes."
      ],
      highlight: "Signature : Créateur de systèmes."
    },
    {
      title: '3. Stratégie : Avance Segmentée mais Orientée',
      content: [
        "Ta progression suit un schéma stable et algorithmique :",
        "1. Décomposition du sujet en nœuds.",
        "2. Recherche des dépendances.",
        "3. Identification des modules à créer.",
        "4. Recherche de la version la plus efficace.",
        "5. Reconstruction de l’ensemble en structure cohérente."
      ]
    },
    {
      title: '4. Rapport à la Valeur : Ultra-Sélectif',
      content: [
        "Tu n’es pas dans la quantité ni l'excitation, mais dans la valeur nette.",
        "Tu cherches ce qui dure, ce qui évolue, ce qui se renforce, ce qui produit du levier et ce qui augmente ton empire interne.",
        "Chaque action doit être reliée à un objectif global."
      ]
    },
    {
      title: '5. Rapport au Temps : Orienté Futur',
      content: [
        "Le présent n’est qu’un point de passage.",
        "Tu construis pour : la version future de toi-même, le système futur, l'impact futur et la structure émergente."
      ]
    },
    {
      title: '6. Rapport au Contrôle : Modularité Totale',
      content: [
        "Tu contrôles l’architecture, les flux, les dépendances et les lois internes.",
        "Objectif : garantir la stabilité, la cohérence et la valeur.",
        "Logique de Chef-Architecte, pas de chef de surface."
      ]
    },
    {
      title: '7. Rapport à l’Imperfection : Amélioration Continue',
      content: [
        "Tu ne cherches jamais la version finale immédiate.",
        "Tu cherches la version qui peut évoluer, s’auto-réparer, absorber et être étendue.",
        "Mentalité de système vivant."
      ]
    },
    {
      title: '8. Rapport à la Création : Fusion & Adaptation',
      content: [
        "Tu fusionnes des concepts très différents (Technique + Fiction + Stratégie + Biologie + Économie).",
        "Création d'un modèle cohérent propriétaire.",
        "Mécanique des créateurs avancés."
      ]
    },
    {
      title: '9. Dynamique Émotionnelle : Froide & Contrôlée',
      content: [
        "Approche rationnelle, méthodique, orientée utilité et construction.",
        "Mise à distance de l'émotion pour maintenir le contrôle total du système."
      ]
    },
    {
      title: '10. Synthèse du Profil',
      content: [
        "Architecte de systèmes.",
        "Stratège long-terme.",
        "Optimisateur naturel.",
        "Créateur de valeur.",
        "Vision capable de régner sur un empire conceptuel."
      ],
      highlight: "Vision capable de régner sur un empire conceptuel."
    }
  ]
};

export const CONCEPT_DOCUMENT: MasterDocument = {
  id: 'DOC-002',
  title: 'NOYAU LOGIQUE 3C',
  subtitle: 'ARCHITECTURE DU SYSTÈME CENTRAL',
  date: new Date().toLocaleDateString('fr-FR'),
  version: '2.0.0-REALITY-CHECK',
  sections: [
    {
      title: '0. LOI SUPRÊME : REALITY FIRST',
      content: [
        "Le 3C ne gère pas les fantasmes, il gère la réalité.",
        "Avant toute construction (C1), le système doit calibrer la capacité réelle du porteur de projet.",
        "Règle d'or : Un plan ambitieux sans compétences validées est un échec programmé. Le système doit le rejeter ou le simplifier (Gap Analysis)."
      ],
      highlight: "Pas de plan sans preuve de capacité."
    },
    {
      title: '1. Fondamentaux : La Trinité Systémique',
      content: [
        "Le système 3C repose sur trois forces fondamentales qui interagissent en boucle fermée :",
        "C1 (Compétences) : L'entité Pratique. Ce que tu peux exécuter concrètement.",
        "C2 (Concepts) : L'entité Structurelle. Ce que tu comprends, modélises et structures.",
        "C3 (Concrétisation) : L'entité Résultat. Ce que tu transformes en réalité tangible."
      ],
      highlight: "Le 3C est un mécanisme de transformation de valeur : Intention → Structure → Action → Résultat."
    },
    {
      title: '2. C1 : Compétences (Le Moteur)',
      content: [
        "Définition : Les unités d'action mesurables et reproductibles.",
        "Fonction : Transformer la connaissance en mouvement, réduire la friction, augmenter la vitesse d'exécution.",
        "Logique : Une compétence est un 'levier concret' qui convertit une intention en résultat."
      ]
    },
    {
      title: '3. C2 : Concepts (L\'Architecte)',
      content: [
        "Définition : Les principes, modèles mentaux, architectures et logiques internes.",
        "Fonction : Fournir une cohérence, éviter les erreurs de direction, structurer la pensée en système.",
        "Logique : Un concept est une 'règle invisible' qui guide toutes les actions visibles."
      ]
    },
    {
      title: '4. C3 : Concrétisation (La Preuve)',
      content: [
        "Définition : Le moment où le système touche le réel (matérialisation).",
        "Fonction : Prouver l'efficacité, créer de la valeur tangible, générer un effet cumulatif.",
        "Logique : La concrétisation est 'l'empreinte physique' laissée par le système."
      ]
    },
    {
      title: '5. La Mécanique Vivante (Le Cycle)',
      content: [
        "Le 3C n'est pas linéaire, c'est un moteur circulaire auto-améliorant :",
        "1. C2 définit la structure.",
        "2. C1 exécute le mouvement.",
        "3. C3 crée le résultat.",
        "4. Feedback : C3 renvoie l'information vers C2 (ajustement logique) et C1 (renforcement musculaire)."
      ],
      highlight: "Système fractal, circulaire et orienté réalité."
    }
  ]
};

export const ROADMAP_DOCUMENT: MasterDocument = {
  id: 'DOC-003',
  title: 'PROTOCOLE D\'IMPLÉMENTATION',
  subtitle: 'MÉCANIQUE OPÉRATIONNELLE',
  date: new Date().toLocaleDateString('fr-FR'),
  version: '1.0.0',
  sections: [
    {
      title: 'Phase 1 : Fixer le Concept (C2)',
      content: [
        "Objectif : Créer un cadre de référence clair.",
        "Actions : Définir l'objectif réel, la valeur recherchée, la structure et les règles internes.",
        "Sortie attendue : Une logique de réussite verrouillée avant toute action."
      ]
    },
    {
      title: 'Phase 2 : Identifier les Compétences (C1)',
      content: [
        "Objectif : Faire l'inventaire des leviers nécessaires.",
        "Actions : Lister les capacités pratiques requises (ex: analyse, découpage, exécution méthodique).",
        "Sortie attendue : Une liste de munitions pour le terrain."
      ]
    },
    {
      title: 'Phase 3 : Construire les Blocs d\'Action (C1 → C3)',
      content: [
        "Objectif : Créer un pipeline actionnable.",
        "Actions : Transformer chaque compétence en tâche bornée (Action / Durée / Indicateur / Résultat).",
        "Sortie attendue : Un plan de bataille sans ambiguïté."
      ]
    },
    {
      title: 'Phase 4 : Exécution Froide',
      content: [
        "Objectif : Produire C3.",
        "Mentalité : Exécution sans émotion, sans dispersion, strictement selon le plan établi en Phase 3.",
        "Sortie attendue : Avancement pur."
      ],
      highlight: "Exécution sans émotion, sans dispersion."
    },
    {
      title: 'Phase 5 : Concrétiser (C3)',
      content: [
        "Objectif : Valider que le résultat existe dans le réel.",
        "Actions : Vérifier la tangibilité (fichier, prototype, document, structure ajoutée).",
        "Sortie attendue : Une preuve tangible et irréversible."
      ]
    },
    {
      title: 'Phase 6 : Feedback (Boucle C3 → C2/C1)',
      content: [
        "Vers C2 : Revoir les règles, affiner les modèles, ajuster la trajectoire.",
        "Vers C1 : Renforcer une compétence, supprimer une friction, accélérer l'exécution future.",
        "Sortie attendue : Un système plus intelligent pour le prochain cycle."
      ]
    },
    {
      title: 'Phase 7 : Intégration Finale',
      content: [
        "Ajouter les nouvelles logiques, compétences et résultats au système global (Empire Conceptuel).",
        "Le 3C devient ainsi un système fractal qui grandit à chaque itération."
      ]
    }
  ]
};

export const AUDIT_DOCUMENT: MasterDocument = {
  id: 'DOC-004',
  title: 'AUDIT SYSTÉMIQUE 360',
  subtitle: 'ANALYSE DE COHÉRENCE DU PROJET',
  date: new Date().toLocaleDateString('fr-FR'),
  version: '1.0.0',
  sections: [
    {
      title: '1. Contexte de l\'Analyse',
      content: [
        "Cet audit observe le 'Projet 3C' (le système de documentation et sa logique) à travers le filtre du DOC-002.",
        "L'objectif est de valider la viabilité systémique et d'identifier les points de rupture potentiels.",
        "Type d'analyse : Critique froide et structurelle."
      ]
    },
    {
      title: '2. Analyse Axe C2 (Concept & Architecture)',
      content: [
        "État : EXCELLENT.",
        "Observation : Le projet n'est pas une simple 'application', mais un 'Backend Administratif de Vie'. Cela correspond parfaitement au profil d'Architecte Systémique (DOC-001).",
        "Force : Le système est fractal. L'outil fonctionne exactement comme ton cerveau (structuration → documentation → évolution).",
        "Validation : Le 3C est une méta-structure capable d'absorber n'importe quel sous-projet."
      ],
      highlight: "Le 3C est un miroir numérique de ta structure mentale."
    },
    {
      title: '3. Analyse Axe C1 (Moteur & Compétences)',
      content: [
        "État : EN DÉVELOPPEMENT.",
        "Friction : Actuellement, le moteur repose lourdement sur l'interaction conversationnelle pour générer la structure.",
        "Manque : Il manque des 'Protocoles d'Entrée' autonomes. Comment le système perdure-t-il sans intervention massive ?",
        "Risque : Dépendance forte à la capacité de formuler (prompting) pour obtenir du résultat."
      ]
    },
    {
      title: '4. Analyse Axe C3 (Concrétisation & Résultat)',
      content: [
        "État : SATISFAISANT (Phase 1).",
        "Observation : La transformation de pensées abstraites en 'Documents Maîtres' (Code/Texte) est une forme pure de C3.",
        "Force : Le résultat est tangible, exportable et inaltérable.",
        "Alerte (Le Piège de l'Architecte) : Le système ne doit pas devenir un 'musée de plans'. Les documents doivent servir de déclencheurs pour des actions dans le monde réel, pas seulement rester des archives numériques."
      ],
      highlight: "Attention au 'Documentation Porn' : Planifier sans construire."
    },
    {
      title: '5. Diagnostic Vital (La Boucle)',
      content: [
        "La boucle est-elle fermée ? OUI.",
        "Le C3 (ce document) nourrit le C2 (ta compréhension du système).",
        "Le système est vivant. Il s'auto-analyse (via ce document) pour s'améliorer."
      ]
    },
    {
      title: '6. Recommandations Stratégiques',
      content: [
        "1. Verrouiller le C2 : Ne plus changer la logique de base (DOC-002). Elle est solide.",
        "2. Optimiser le C1 : Créer des templates mentaux pour accélérer la création de nouveaux documents.",
        "3. Activer le C3 Externe : Utiliser le DOC-003 pour lancer un projet 'Hors-Système' (réel) afin de tester la robustesse du 3C."
      ]
    }
  ]
};

export const ECONOMY_DOCUMENT: MasterDocument = {
  id: 'DOC-005',
  title: 'SHADOW EMPIRE SYSTEM',
  subtitle: 'ARCHITECTURE ÉCONOMIQUE FRACTALE',
  date: new Date().toLocaleDateString('fr-FR'),
  version: '4.0.0-ORCHESTRATION',
  sections: [
    {
      title: '1. Philosophie : L\'Empire Shadow',
      content: [
        "Ce système n'est pas un 'business'. C'est une infrastructure économique autonome.",
        "C'est un OS (Système d'Exploitation) complet composé de 12 modules fractals.",
        "Nexus (M12) est en VEILLE STRUCTURELLE. Il observe mais n'agit pas encore.",
        "Le but n'est pas de vendre, mais de construire une toile de valeur incontournable."
      ],
      highlight: "Empire Conceptuel : 12 Modules, 1 Architecture."
    },
    {
      title: '2. Protocole des 12 Modules (Core Infrastructure)',
      content: [
        "M01 - Plan d'Action 3C : Filtre d'entrée. 24-48h. Réduit le chaos à 3 axes.",
        "M02 - Audit Mallinoïde : Vision Shadow. Révèle ce que le client ignore (Failles & Leviers).",
        "M03 - Backend Administratif de Vie : Installation de l'OS Personnel interne.",
        "M04 - Stratégie de Transformation : Arc de transition en 3 phases.",
        "M05 - Architecture Business 3C : Restructuration fractale d'entreprise.",
        "M06 - Micro-Offres 3C : Génération de produits rapides à cashflow immédiat.",
        "M07 - System Flow Engine : Création de flux continus (Attention, Revenu, Valeur).",
        "M08 - Optimisateur d'Identité : Alignement Identité -> Action (Shadow Identity).",
        "M09 - Scénarios Évolutifs : Arbres de décision A/B/C.",
        "M10 - Loop Engine : Moteur d'auto-amélioration (Feedback Loop).",
        "M11 - Archive Intelligente : Shadow Memory. Tout output devient un asset.",
        "M12 - INTÉGRATION NEXUS : En veille. Le cerveau maître qui absorbera tout plus tard."
      ]
    },
    {
      title: '3. Protocoles Shadow (Règles S)',
      content: [
        "S1 (M01): Toujours réduire à 3 axes majeurs. Jamais plus.",
        "S2 (M02): Révéler 1 vérité, pas 5. Un seul point d'impact suffit.",
        "S3 (M03): Tout doit être exécutable dans un smartphone.",
        "S4 (M05): 1 seul flux principal par business. Le reste est optionnel.",
        "S5 (M09): Maximum 3 chemins d'évolution.",
        "S6 (M12): Nexus est en observation. Pas d'action prématurée."
      ],
      highlight: "La puissance vient de la restriction, pas de l'accumulation."
    },
    {
      title: '4. Les Flux Économiques',
      content: [
        "Flux 1 : Vente Directe (M01, M06)",
        "Flux 2 : Recommandations Fractales (M01 -> New Client)",
        "Flux 3 : Upsell Architecture (M03, M05)",
        "Flux 4 : Rétention & Maintenance (M10)",
        "Flux 5 : Data Asset (M11 - Chaque client enrichit le système)"
      ]
    },
    {
      title: '5. ORCHESTRATION SYMPHONIQUE (FORMATION 1 JOUR)',
      content: [
        "C'est le Modèle de Référence (Minimum Viable Standard).",
        "Session 1: Alignement. Session 2: Extraction. Session 3: MVP.",
        "Session 4: Flux. Session 5: Contenu. Session 6: Business Num.",
        "Session 7: Empreinte & Alliance."
      ],
      highlight: "Ceci est la Baseline pour tous les plans générés."
    }
  ]
};

export const INDUSTRIAL_DOCUMENT: MasterDocument = {
  id: 'DOC-006',
  title: 'PROTOCOLE D\'INDUSTRIALISATION & FRACTALE',
  subtitle: 'PASSAGE DE L\'USINE AU RÉSEAU',
  date: new Date().toLocaleDateString('fr-FR'),
  version: '3.5.0-NODAL',
  sections: [
    {
      title: '1. Organisation Fractale et Effet de Réseau',
      content: [
        "Le système vise à créer un réseau fractal dirigé.",
        "Chaque client n'est pas un point final, c'est un 'Lieutenant', un futur nœud autonome.",
        "Principe : Structure en cellules locales auto-gérées, alignées par le driver Shadow.",
        "Effet de réseau : Plus le réseau grandit, plus la valeur de la plateforme Nexus augmente (Data, Contenu, Innovation)."
      ],
      highlight: "Le client est un Lieutenant en devenir."
    },
    {
      title: '2. Matrice d\'Adaptation Contextuelle (Problème -> Architecture -> Livrable)',
      content: [
        "Le système utilise une matrice d'adaptation pour sélectionner l'architecture optimale.",
        "CAS A (URGENCE/SURVIE) : Architecture 'SPRINT' -> Modules 'Diagnostic + Plan Agile' -> Livrable 'Sprint Canvas' + Checklist 24h.",
        "CAS B (INNOVATION/CONCEPT) : Architecture 'VISION' -> Modules 'Concept + Validation' -> Livrable 'Atelier Vision' + Document Stratégique.",
        "CAS C (COMPÉTENCE/SAVOIR) : Architecture 'GENERATOR' -> Modules 'Scaffolded Learning' -> Livrable 'Guide Interactif' + Plan 7 Jours.",
        "CAS D (STANDARD/EMPIRE) : Architecture 'SYMPHONIE' -> Modules 3C Classiques -> Livrable 'Manuel Opératoire'."
      ]
    },
    {
      title: '3. Livrables : Nœuds Directifs',
      content: [
        "Chaque document généré (quel que soit le module) est un 'Nœud Directif' (md/pdf).",
        "Structure obligatoire pour TOUS les livrables :",
        "- Tâches quotidiennes précises (Action concrète).",
        "- Objectifs mesurables court terme (7-14 jours - Early Wins).",
        "- Templates pré-formatés (Tableaux, Canvas).",
        "- Commentaires Pédagogiques (Scaffolding - Le Pourquoi et le Comment).",
        "- Points de Synchronisation (Nexus - Jalons de révision)."
      ],
      highlight: "Pas de plan sans pédagogie (Scaffolding) ni point de synchro (Nexus)."
    },
    {
      title: '4. Boucles de Feedback (Loop Engine)',
      content: [
        "Rythme : Checkpoints à J+3 et J+7 (Cycles courts).",
        "Objectif : Calibration continue. Transformer l'erreur en donnée. Itération rapide.",
        "Outil : Le Loop Engine (M_SHADOW_10)."
      ]
    },
    {
      title: '5. Spécifications du Formulaire d\'Entrée (Protocol Genesis v2)',
      content: [
        "CHAMPS OBLIGATOIRES :",
        "- Objectif (Objective) : Le but précis. Déclenche le choix de l'Architecture.",
        "- Défis Actuels (Current Challenges) : Les frictions. Déclenche les modules de réparation.",
        "- Résultats Souhaités (Desired Outcomes) : La vision du succès à J+30.",
        "- Contraintes (Constraints) : Temps/jour, Budget. Calibre le réalisme.",
        "",
        "CHAMPS SHADOW :",
        "- Le 'Rapport Brut' (Brain Dump) : Présentation libre, chaos mental. L'IA structure ce chaos.",
        "- Mapping Algorithmique : Chaque input influence le poids des modules."
      ],
      highlight: "Plus l'input est brutal, plus l'output est chirurgical."
    }
  ]
};

export const BACKEND_DOCUMENT: MasterDocument = {
  id: 'DOC-007',
  title: 'ARCHITECTURE BACKEND & LOGIQUE',
  subtitle: 'SPÉCIFICATION DU MOTEUR INTELLIGENT',
  date: new Date().toLocaleDateString('fr-FR'),
  version: '1.0.0',
  sections: [
    {
      title: '1. Rôle du Backend 3C',
      content: [
        "Le backend n'est pas une simple base de données. C'est un 'Assembleur Intelligent'.",
        "Son rôle est de remplacer ton cerveau pour les tâches répétitives de sélection et de construction.",
        "Il transforme des 'Données Client' (Input) en 'Plan Stratégique' (Output) sans émotion."
      ]
    },
    {
      title: '2. Structure de Données (Input JSON)',
      content: [
        "Le système s'attend à recevoir cet objet JSON précis :",
        "{",
        "  'client_id': 'string',",
        "  'profile_type': 'ENTREPRENEUR | STUDENT | EMPLOYEE',",
        "  'core_goal': 'BUILD | REPAIR | OPTIMIZE',",
        "  'frictions': ['PROCRASTINATION', 'NO_STRATEGY', 'OVERWHELM'],",
        "  'resources': { 'time_per_day': 60, 'budget': 0 }",
        "}",
        "Toute donnée hors de ce schéma est rejetée."
      ]
    },
    {
      title: '3. Logique Algorithmique (Le Moteur de Réaction)',
      content: [
        "Voici comment le système 'réagit' étape par étape :",
        "",
        "PHASE 1 : QUALIFICATION (Analyse C2)",
        "SI profile_type == 'ENTREPRENEUR' ET core_goal == 'BUILD' :",
        "-> Charger le 'Header_Business_Aggressive.md'",
        "-> Définir Tone = 'Direct/ROI'",
        "",
        "PHASE 2 : SÉLECTION DES MODULES (Matching C1)",
        "POUR CHAQUE friction DANS frictions :",
        "-> SI friction == 'PROCRASTINATION' : Ajouter 'Module_DeepWork_Protocol'",
        "-> SI friction == 'NO_STRATEGY' : Ajouter 'Module_Roadmap_Builder'",
        "-> SI friction == 'OVERWHELM' : Ajouter 'Module_Prioritization_Matrix'",
        "",
        "PHASE 3 : FILTRAGE DES CONTRAINTES (Check C1)",
        "POUR CHAQUE module SÉLECTIONNÉ :",
        "-> SI module.duration > resources.time_per_day :",
        "   -> Remplacer par module.lite_version (Ex: DeepWork 4h -> Pomodoro 25m)",
        "   -> Ajouter un Avertissement 'Ressources Insuffisantes' dans le footer.",
        "",
        "PHASE 4 : ASSEMBLAGE (Génération C3)",
        "Output = Header + Intro_Personnalisée + Modules_Optimisés + Conclusion + Bilan_C3",
        "Générer le PDF final."
      ],
      highlight: "L'intelligence n'est pas magique, elle est conditionnelle. 1 Input = 1 Output prévisible."
    }
  ]
};

export const AI_PROTOCOL_DOCUMENT: MasterDocument = {
  id: 'DOC-008',
  title: 'INTELLIGENCE ARTIFICIELLE & PROMPTING',
  subtitle: 'PROTOCOLE D\'EXTENSION COGNITIVE',
  date: new Date().toLocaleDateString('fr-FR'),
  version: '1.0.0',
  sections: [
    {
      title: '1. Rôle de l\'IA dans le 3C',
      content: [
        "L'IA n'est pas le décideur, c'est le processeur.",
        "Le système 3C définit les règles (Architecture, Modules).",
        "L'IA exécute l'assemblage et la rédaction finale pour gagner du temps."
      ]
    },
    {
      title: '2. Le System Prompt (L\'Instruction Mère)',
      content: [
        "Pour que l'IA respecte la logique 3C, elle doit recevoir cette instruction à chaque appel :",
        "'Tu n'es pas un assistant généraliste. Tu es le Moteur d'Assemblage 3C. Tu as accès à une bibliothèque de modules définis. Ton but est de construire un plan d'action cohérent (C1/C2/C3) basé sur les contraintes utilisateur. Tu ne dois jamais inventer de concepts hors du framework 3C.'"
      ]
    },
    {
      title: '3. Intégration Technique (OpenRouter)',
      content: [
        "Modèle suggéré : GPT-4o-mini ou Claude-3-Haiku (Rapides, Structurés, Pas chers).",
        "Flux de Données :",
        "1. App Envoie : JSON Client + Liste Modules JSON.",
        "2. IA Traite : Sélectionne les meilleurs modules.",
        "3. IA Répond : JSON Structure du Plan.",
        "4. App Affiche : Plan prêt à être imprimé."
      ]
    }
  ]
};

export const SAAS_POLYMORPH_DOCUMENT: MasterDocument = {
  id: 'DOC-009',
  title: 'ARCHITECTURE SAAS POLYMORPHE',
  subtitle: 'BLUEPRINT TECHNIQUE MACH & MICROSERVICES',
  date: new Date().toLocaleDateString('fr-FR'),
  version: '1.0.0',
  sections: [
    {
      title: '1. Vision Meta-SaaS',
      content: [
        "Transition de l'Outil Interne vers la Plateforme Ouverte.",
        "Objectif : Créer un écosystème 'Composable' où chaque fonction est un module indépendant.",
        "Inspiration : Microsoft Dynamics (Modulaire), Notion (Flexible), Stripe (API-First)."
      ],
      highlight: "Le 3C doit devenir un OS sur lequel d'autres peuvent bâtir."
    },
    {
      title: '2. Architecture MACH (Microservices, API, Cloud, Headless)',
      content: [
        "MICROSERVICES : Découpage fonctionnel strict (Auth, Billing, AI Engine, Generator).",
        "API-FIRST : Tout passe par l'API. Le Frontend n'est qu'un consommateur parmi d'autres.",
        "CLOUD-NATIVE : Conteneurisation (Docker/K8s) pour scalabilité infinie.",
        "HEADLESS : L'UI est découplée. Possibilité de créer des Apps Mobiles ou des Dashboards clients spécifiques."
      ]
    },
    {
      title: '3. Résolution des Douleurs Transverses',
      content: [
        "INTEGRATION : Fin des silos de données via API standardisée.",
        "AUTOMATISATION : Agents IA autonomes pour les tâches répétitives (SOPs).",
        "PILOTAGE : Dashboard unifié temps réel (Nexus).",
        "RESILIENCE : Architecture distribuée, backup natif."
      ]
    },
    {
      title: '4. Stratégie de Déploiement',
      content: [
        "Phase 1 : MVP Monolithique (Actuel).",
        "Phase 2 : Extraction du Moteur IA en Microservice autonome.",
        "Phase 3 : Ouverture de l'API pour les Lieutenants (Franchise Tech).",
        "Phase 4 : Marketplace de Modules (Ecosystème)."
      ]
    }
  ]
};

// MISE À JOUR CRITIQUE : MODULES GEN DÉTAILLÉS + STRUCTURE SHADOW EXISTANTE + EMPIRE PROTOCOL
export const MODULE_LIBRARY: ModuleItem[] = [
  // --- PROTOCOLE EMPIRE (SCALING & REPLICATION) - LE SYSTÈME QUI VEND LE SYSTÈME ---
  {
    id: 'M_EMPIRE_01',
    name: 'EMPIRE: Viral Loop Design',
    category: 'C2',
    duration: 'Continu',
    description: 'SELF-SELLING. Intégration du mécanisme de parrainage et de viralité organique dans l\'ADN du produit.',
    action_steps: [
      { order: 1, instruction: "Définir l'incitatif de partage (Give to Get).", duration_min: 60, critical: true },
      { order: 2, instruction: "Intégrer le loop dans l'onboarding (J0).", duration_min: 60, critical: true },
      { order: 3, instruction: "Automatiser la récompense.", duration_min: 60, critical: true }
    ],
    c3_proof: "Schéma de la boucle virale."
  },
  {
    id: 'M_EMPIRE_02',
    name: 'EMPIRE: Lieutenant Training',
    category: 'C1',
    duration: '4 Semaines',
    description: 'REPLICATION. Former des opérateurs autonomes (Franchisés/Lieutenants).',
    action_steps: [
      { order: 1, instruction: "Créer le Manuel Opératoire Standard (SOP Empire).", duration_min: 120, critical: true },
      { order: 2, instruction: "Sélectionner les profils Alpha.", duration_min: 60, critical: true },
      { order: 3, instruction: "Coaching de duplication (Faire faire).", duration_min: 120, critical: true }
    ],
    c3_proof: "Kit de Franchise & Premier Lieutenant activé."
  },
  {
    id: 'M_EMPIRE_03',
    name: 'EMPIRE: Multiverse Nexus',
    category: 'C2',
    duration: 'Continu',
    description: 'ECOSYSTEM & MICROSERVICES. Gestion des business verticaux interconnectés via Architecture MACH.',
    action_steps: [
      { order: 1, instruction: "Cartographier les entités du Multivers (Services Indépendants).", duration_min: 60, critical: true },
      { order: 2, instruction: "Définir les API de communication transversale.", duration_min: 60, critical: true },
      { order: 3, instruction: "Consolider la Data dans un Data Lake commun.", duration_min: 60, critical: true }
    ],
    c3_proof: "Dashboard Multiverse & API Documentation."
  },

  // --- PROTOCOLE GENERATEUR (12 MODULES) - SYSTÈME 3C DE GÉNÉRATION DE PLANS VENDABLES ---
  {
    id: 'M_GEN_01',
    name: 'GEN: Analyse Marché/Compétence',
    category: 'C2',
    duration: '2h',
    description: 'CONTAINER C2. Bilan & Marché. Scaffolding du positionnement.',
    action_steps: [
      { order: 1, instruction: "Inventaire compétences transférables.", duration_min: 45, critical: true },
      { order: 2, instruction: "Sondage Express / Focus Group (Validation Demande).", duration_min: 45, critical: true },
      { order: 3, instruction: "Formulation USP (Angle Unique).", duration_min: 30, critical: true }
    ],
    c3_proof: "Fiche Positionnement & Étude simplifiée."
  },
  {
    id: 'M_GEN_02',
    name: 'GEN: Conception Offre',
    category: 'C2',
    duration: '3h',
    description: 'CONTAINER C2. Formatage Offre. Pricing et Modalités.',
    action_steps: [
      { order: 1, instruction: "Définir format (Mix Pack + Coaching).", duration_min: 60, critical: true },
      { order: 2, instruction: "Rédiger Pitch Commercial & Bénéfices.", duration_min: 60, critical: true },
      { order: 3, instruction: "Prototype Page Vente (Brochure PDF).", duration_min: 60, critical: true }
    ],
    c3_proof: "Prototype d'Offre Standardisé."
  },
  {
    id: 'M_GEN_03',
    name: 'GEN: Création MVP',
    category: 'C3',
    duration: '4h',
    description: 'CONTAINER C3. Version minimale vendable (Atelier/Webinaire/Module 0).',
    action_steps: [
      { order: 1, instruction: "Créer livrable initial (Contenu test).", duration_min: 120, critical: true },
      { order: 2, instruction: "Fixer tarif Early Bird.", duration_min: 30, critical: true },
      { order: 3, instruction: "Setup Formulaire Commande simple.", duration_min: 90, critical: true }
    ],
    c3_proof: "MVP en ligne et accessible."
  },
  {
    id: 'M_GEN_04',
    name: 'GEN: Funnel Multi-Plateforme',
    category: 'C1',
    duration: '3h',
    description: 'CONTAINER C1. Acquisition Facebook, WhatsApp & TikTok. Scripts fournis.',
    action_steps: [
      { order: 1, instruction: "Facebook/Instagram : Poster le 'Hand-Raiser'.", duration_min: 45, critical: true },
      { order: 2, instruction: "TikTok : Créer Hook Vidéo 15s.", duration_min: 60, critical: true },
      { order: 3, instruction: "WhatsApp : Configurer séquence de closing.", duration_min: 45, critical: true },
      { order: 4, instruction: "IA : Générer 10 idées de contenu.", duration_min: 30, critical: true }
    ],
    c3_proof: "Scripts adaptés & Prêts à poster."
  },
  {
    id: 'M_GEN_05',
    name: 'GEN: Contenus Guidés',
    category: 'C1',
    duration: 'Continu',
    description: 'CONTAINER C1. Pédagogie Scaffolded. Modèles à remplir, pas de théorie.',
    action_steps: [
      { order: 1, instruction: "Définir progression pédagogique.", duration_min: 60, critical: true },
      { order: 2, instruction: "Créer Templates Exercices (Scaffolding).", duration_min: 60, critical: true },
      { order: 3, instruction: "Rédiger directives pas-à-pas.", duration_min: 60, critical: true }
    ],
    c3_proof: "Exemples Fiches Pédagogiques."
  },
  {
    id: 'M_GEN_06',
    name: 'GEN: Plan Action 7 Jours',
    category: 'C1',
    duration: '2h',
    description: 'CONTAINER C1/C3. Exécution. Séquence J1-J7 avec Commentaires Pédagogiques.',
    action_steps: [
      { order: 1, instruction: "Structurer J1 à J7.", duration_min: 60, critical: true },
      { order: 2, instruction: "Définir KPI & Livrable par jour.", duration_min: 30, critical: true },
      { order: 3, instruction: "Ajouter commentaires pédagogiques.", duration_min: 30, critical: true }
    ],
    c3_proof: "Calendrier 7 Jours Détaillé."
  },
  {
    id: 'M_GEN_07',
    name: 'GEN: Supports Standardisés',
    category: 'C3',
    duration: 'Continu',
    description: 'CONTAINER C3. LIVRABLES PRO. ZIP organisé.',
    action_steps: [
      { order: 1, instruction: "Créer Master Template (Design).", duration_min: 60, critical: true },
      { order: 2, instruction: "Organisation arborescence fichiers.", duration_min: 30, critical: true },
      { order: 3, instruction: "Packaging ZIP final.", duration_min: 60, critical: true }
    ],
    c3_proof: "Dossier ZIP 'Clés en main'."
  },
  {
    id: 'M_GEN_08',
    name: 'GEN: Protocoles Vente',
    category: 'C1',
    duration: '2h',
    description: 'CONTAINER C1. Closing & Onboarding. Réactivité 24h.',
    action_steps: [
      { order: 1, instruction: "Scripts conversationnels (WhatsApp).", duration_min: 60, critical: true },
      { order: 2, instruction: "Checklist Onboarding Client.", duration_min: 30, critical: true },
      { order: 3, instruction: "Modèle Emailing Lancement.", duration_min: 30, critical: true }
    ],
    c3_proof: "Guide de Vente Succinct."
  },
  {
    id: 'M_GEN_09',
    name: 'GEN: Progression Niveaux',
    category: 'C2',
    duration: '2h',
    description: 'CONTAINER C2. Adaptation. Déclinaison Débutant/Avancé.',
    action_steps: [
      { order: 1, instruction: "Décliner modules par niveau.", duration_min: 60, critical: true },
      { order: 2, instruction: "Créer Bonus Challenge pour Avancés.", duration_min: 60, critical: true }
    ],
    c3_proof: "Matrice de Progression."
  },
  {
    id: 'M_GEN_10',
    name: 'GEN: Suivi & Ajustement',
    category: 'C2',
    duration: 'Quotidien',
    description: 'CONTAINER C2. Pilotage & Feedback Loops (J+3/J+7).',
    action_steps: [
      { order: 1, instruction: "Définir KPIs (Ventes, Leads).", duration_min: 30, critical: true },
      { order: 2, instruction: "Protocole A/B Testing.", duration_min: 30, critical: true },
      { order: 3, instruction: "Checkpoints J+3 / J+6.", duration_min: 30, critical: true }
    ],
    c3_proof: "Tableau de Bord Pilotage."
  },
  {
    id: 'M_GEN_11',
    name: 'GEN: Packaging Nexus',
    category: 'C3',
    duration: '3h',
    description: 'CONTAINER C3. Standardisation & Manuel Utilisateur.',
    action_steps: [
      { order: 1, instruction: "Formaliser format modulaire.", duration_min: 60, critical: true },
      { order: 2, instruction: "Créer Manuel Utilisateur Interne.", duration_min: 60, critical: true },
      { order: 3, instruction: "Veille Tendances (Nexus Veille).", duration_min: 60, critical: true }
    ],
    c3_proof: "Schéma Récapitulatif & Manuel."
  },
  {
    id: 'M_GEN_12',
    name: 'GEN: Templates Exploitables',
    category: 'C3',
    duration: 'Continu',
    description: 'CONTAINER C3. Fichiers prêts à l\'usage (Exemples concrets).',
    action_steps: [
      { order: 1, instruction: "Créer Template Planning Journalier pré-rempli.", duration_min: 60, critical: true },
      { order: 2, instruction: "Créer Diagrammes Flux / Infographies.", duration_min: 60, critical: true },
      { order: 3, instruction: "Modèles Emailing/Pages.", duration_min: 60, critical: true }
    ],
    c3_proof: "Bibliothèque de Templates."
  },

  // --- MODULES SHADOW EMPIRE (EXISTANTS - INFRASTRUCTURE) ---
  {
    id: 'M_SHADOW_01',
    name: 'SHADOW: Plan Action 3C',
    category: 'C2',
    duration: '48h',
    description: 'FILTRE ENTRÉE. Transformer un problème brut en Plan d\'Action complet. (Protocole S: Max 3 Axes).',
    action_steps: [
      { order: 1, instruction: "Micro-audit instantané (Signal/Bruit).", duration_min: 30, critical: true },
      { order: 2, instruction: "Extraction du Noyau Logique (Cause Racine).", duration_min: 30, critical: true },
      { order: 3, instruction: "Architecture 3C : Concept / Action / Résultat.", duration_min: 60, critical: true }
    ],
    c3_proof: "Document Plan 3C (PDF)."
  },
  {
    id: 'M_SHADOW_02',
    name: 'SHADOW: Audit Mallinoïde',
    category: 'C2',
    duration: '2h',
    description: 'VISION SHADOW. Révéler ce que le client ne voit pas. (Protocole S: 1 Vérité, pas 5).',
    action_steps: [
      { order: 1, instruction: "Séparation Signal/Bruit.", duration_min: 30, critical: true },
      { order: 2, instruction: "Détection des points d'effondrement.", duration_min: 30, critical: true },
      { order: 3, instruction: "Détection des points de puissance.", duration_min: 30, critical: true },
      { order: 4, instruction: "Mise en carte (Shadow Map).", duration_min: 30, critical: true }
    ],
    c3_proof: "Rapport de Faille Systémique & Shadow Map."
  },
  {
    id: 'M_SHADOW_03',
    name: 'SHADOW: OS Personnel',
    category: 'C2',
    duration: '3 Jours',
    description: 'BACKEND DE VIE. Installer la structure interne. (Protocole S: Exécutable sur Smartphone).',
    action_steps: [
      { order: 1, instruction: "Définition des pôles & Hiérarchie.", duration_min: 120, critical: true },
      { order: 2, instruction: "Organisation de l'Agenda (Énergie vs Temps).", duration_min: 120, critical: true },
      { order: 3, instruction: "Installation du système de capture.", duration_min: 120, critical: true }
    ],
    c3_proof: "Diagramme OS Personnel."
  },
  {
    id: 'M_SHADOW_04',
    name: 'SHADOW: Stratégie Transform',
    category: 'C2',
    duration: '4h',
    description: 'ARC DE TRANSITION. Transformer par étapes. (Protocole S: 3 Phases max).',
    action_steps: [
      { order: 1, instruction: "Définir les stades d'évolution.", duration_min: 60, critical: true },
      { order: 2, instruction: "Définir les défis par stade.", duration_min: 60, critical: true },
      { order: 3, instruction: "Checkpoints de validation.", duration_min: 60, critical: true }
    ],
    c3_proof: "Feuille de Route Stratégique."
  },
  {
    id: 'M_SHADOW_05',
    name: 'SHADOW: Architecture Biz',
    category: 'C2',
    duration: '5 Jours',
    description: 'SYSTEM BUILDER. Transformer business en système. (Protocole S: 1 Flux principal).',
    action_steps: [
      { order: 1, instruction: "Analyse business & Extraction modèle.", duration_min: 120, critical: true },
      { order: 2, instruction: "Construction structure fractale.", duration_min: 120, critical: true },
      { order: 3, instruction: "Définition des flux prioritaires.", duration_min: 120, critical: true }
    ],
    c3_proof: "Blueprint Business."
  },
  {
    id: 'M_SHADOW_06',
    name: 'SHADOW: Micro-Offres',
    category: 'C3',
    duration: '2h',
    description: 'CASHFLOW RAPIDE. Générer produits instantanés. (Protocole S: 1 Problème = 1 Solution).',
    action_steps: [
      { order: 1, instruction: "Identifier micro-problème.", duration_min: 30, critical: true },
      { order: 2, instruction: "Créer micro-solution.", duration_min: 60, critical: true },
      { order: 3, instruction: "Packager & Prix.", duration_min: 30, critical: true }
    ],
    c3_proof: "Lien de paiement actif."
  },
  {
    id: 'M_SHADOW_07',
    name: 'SHADOW: System Flow Engine',
    category: 'C1',
    duration: '7 Jours',
    description: 'FLUX CONTINUS. Transformer processus en rivières. (Protocole S: Min 3 Flux reliés).',
    action_steps: [
      { order: 1, instruction: "Cartographie des flux.", duration_min: 120, critical: true },
      { order: 2, instruction: "Définition des boucles.", duration_min: 120, critical: true },
      { order: 3, instruction: "Stabilisation.", duration_min: 120, critical: true }
    ],
    c3_proof: "Flowchart des Flux."
  },
  {
    id: 'M_SHADOW_08',
    name: 'SHADOW: Identity Opt.',
    category: 'C2',
    duration: '2h',
    description: 'ALIGNEMENT. Identité -> Objectif. (Protocole S: Identité = 1 phrase).',
    action_steps: [
      { order: 1, instruction: "Détection identités passives.", duration_min: 60, critical: true },
      { order: 2, instruction: "Construction identité active.", duration_min: 60, critical: true }
    ],
    c3_proof: "Manifeste Identitaire."
  },
  {
    id: 'M_SHADOW_09',
    name: 'SHADOW: Scénarios Evol.',
    category: 'C2',
    duration: '3h',
    description: 'ARBORESCENCE. Trajectoires futures. (Protocole S: Max 3 chemins).',
    action_steps: [
      { order: 1, instruction: "Scénarios A/B/C.", duration_min: 60, critical: true },
      { order: 2, instruction: "Branches d'évolution.", duration_min: 60, critical: true },
      { order: 3, instruction: "Calcul conséquences.", duration_min: 60, critical: true }
    ],
    c3_proof: "Arbre de Décision."
  },
  {
    id: 'M_SHADOW_10',
    name: 'SHADOW: Loop Engine',
    category: 'C3',
    duration: 'Continu',
    description: 'AMÉLIORATION. Feedback Loop. (Protocole S: 1 Update/Semaine).',
    action_steps: [
      { order: 1, instruction: "Extraction patterns.", duration_min: 30, critical: true },
      { order: 2, instruction: "Amélioration système.", duration_min: 30, critical: true },
      { order: 3, instruction: "Versioning.", duration_min: 30, critical: true }
    ],
    c3_proof: "Tableau de Bord Feedback."
  },
  {
    id: 'M_SHADOW_11',
    name: 'SHADOW: Archive Intell.',
    category: 'C1',
    duration: 'Continu',
    description: 'MÉMOIRE. Cerveau externe. (Protocole S: Tout ranger en C1/C2/C3).',
    action_steps: [
      { order: 1, instruction: "Tri & Indexation.", duration_min: 30, critical: true },
      { order: 2, instruction: "Classement.", duration_min: 30, critical: true }
    ],
    c3_proof: "Base de Connaissance à jour."
  },
  {
    id: 'M_SHADOW_12',
    name: 'SHADOW: NEXUS (VEILLE)',
    category: 'C2',
    duration: 'VEILLE',
    description: 'CERVEAU MAÎTRE. En observation. (Protocole S: Pas d\'action prématurée).',
    action_steps: [
      { order: 1, instruction: "Observation des flux.", duration_min: 0, critical: false },
      { order: 2, instruction: "Documentation passive.", duration_min: 0, critical: false },
      { order: 3, instruction: "Préparation intégration future.", duration_min: 0, critical: false }
    ],
    c3_proof: "Log d'observation Nexus."
  },

  // --- MODULES SYMPHONIQUES (ORCHESTRATION DU MASTER PLAN) ---
  {
    id: 'M20',
    name: 'SYMPHONY: Sessions 1-2 (Diag)',
    category: 'C2',
    duration: '1h',
    description: "DIAGNOSTIC & IDENTITÉ. Rituel Boîte Noire + Extraction Compétence.",
    action_steps: [
      { order: 1, instruction: "Rituel du Blocage.", duration_min: 15, critical: true },
      { order: 2, instruction: "Diagnostic Valeur Brute.", duration_min: 15, critical: true },
      { order: 3, instruction: "Extraction Compétence.", duration_min: 30, critical: true }
    ],
    c3_proof: "Carnet Page 1-3."
  },
  {
    id: 'M21',
    name: 'SYMPHONY: Session 3 (MVP)',
    category: 'C3',
    duration: '45m',
    description: "CRÉATION MVP. La version vendable MAINTENANT.",
    action_steps: [
      { order: 1, instruction: "Choisir Type MVP.", duration_min: 10, critical: true },
      { order: 2, instruction: "Remplir Canvas MVP.", duration_min: 20, critical: true },
      { order: 3, instruction: "Pitch Express.", duration_min: 15, critical: true }
    ],
    c3_proof: "Offre MVP prête."
  },
  {
    id: 'M22',
    name: 'SYMPHONY: Session 4 (Flux)',
    category: 'C1',
    duration: '45m',
    description: "ARCHITECTURE FLUX. Du MVP au Revenu Récurrent.",
    action_steps: [
      { order: 1, instruction: "Sélectionner Flux.", duration_min: 15, critical: true },
      { order: 2, instruction: "Plan d'Action Flux.", duration_min: 30, critical: true }
    ],
    c3_proof: "Matrice Flux complétée."
  },
  {
    id: 'M23',
    name: 'SYMPHONY: Session 5 (Contenu)',
    category: 'C3',
    duration: '1h',
    description: "AUTORITÉ. Création des 7 contenus d'entrée.",
    action_steps: [
      { order: 1, instruction: "Produire 7 Contenus.", duration_min: 45, critical: true },
      { order: 2, instruction: "Stratégie Diffusion.", duration_min: 15, critical: true }
    ],
    c3_proof: "7 Posts prêts."
  },
  {
    id: 'M24',
    name: 'SYMPHONY: Session 6 (Roadmap)',
    category: 'C2',
    duration: '45m',
    description: "BUSINESS NUMÉRIQUE. Roadmap 90 Jours.",
    action_steps: [
      { order: 1, instruction: "Canvas Business Numérique.", duration_min: 30, critical: true },
      { order: 2, instruction: "Timeline 90 Jours.", duration_min: 15, critical: true }
    ],
    c3_proof: "Roadmap 90 Jours."
  },
  {
    id: 'M25',
    name: 'SYMPHONY: Session 7 (Empreinte)',
    category: 'C2',
    duration: '45m',
    description: "ALLIANCE & RITUEL. Contrat d'Empreinte.",
    action_steps: [
      { order: 1, instruction: "Signer Contrat.", duration_min: 15, critical: true },
      { order: 2, instruction: "Photo & Ancrage.", duration_min: 30, critical: true }
    ],
    c3_proof: "Contrat Signé."
  },

  // --- MODULES FONCTIONNELS (BRIQUES C1) ---
  { 
    id: 'M01', 
    name: 'Discipline Militaire', 
    category: 'C1', 
    duration: '45m', 
    description: 'Protocole de réveil et mise en mouvement immédiate.',
    action_steps: [
      { order: 1, instruction: "Le réveil sonne. Ne pas toucher au téléphone.", duration_min: 1, critical: true },
      { order: 2, instruction: "Boire 500ml d'eau immédiatement.", duration_min: 2, critical: false },
      { order: 3, instruction: "Mouvement physique (Pompes/Squats) jusqu'à essoufflement.", duration_min: 10, critical: true },
      { order: 4, instruction: "Douche froide (30s minimum).", duration_min: 5, critical: true },
      { order: 5, instruction: "S'asseoir au bureau. Pas de réseaux sociaux.", duration_min: 2, critical: true }
    ],
    c3_proof: "Photo de l'espace de travail prêt à 08h00."
  },
  { 
    id: 'M02', 
    name: 'Deep Work 4H', 
    category: 'C1', 
    duration: '4h', 
    description: 'Bloc de production intense sans distraction.',
    action_steps: [
      { order: 1, instruction: "Mettre le téléphone en mode avion dans une autre pièce.", duration_min: 2, critical: true },
      { order: 2, instruction: "Définir l'UNIQUE tâche à accomplir sur papier.", duration_min: 5, critical: true },
      { order: 3, instruction: "Session 1 (90min) : Production brute.", duration_min: 90, critical: true },
      { order: 4, instruction: "Pause cognitive (15min) : Marche sans écran.", duration_min: 15, critical: false },
      { order: 5, instruction: "Session 2 (90min) : Finalisation et Relecture.", duration_min: 90, critical: true }
    ],
    c3_proof: "Livrable final (Fichier/Code) envoyé ou sauvegardé."
  },
  { 
    id: 'M03', 
    name: 'Audit Financier Flash', 
    category: 'C2', 
    duration: '1h', 
    description: 'Analyse des flux entrants/sortants et optimisation.',
    action_steps: [
      { order: 1, instruction: "Exporter les CSV bancaires des 3 derniers mois.", duration_min: 10, critical: true },
      { order: 2, instruction: "Catégoriser : Coûts Fixes (Vie) vs Coûts Variables (Plaisir) vs Investissement.", duration_min: 30, critical: true },
      { order: 3, instruction: "Identifier et supprimer 3 abonnements inutiles.", duration_min: 10, critical: false },
      { order: 4, instruction: "Calculer le 'Burn Rate' mensuel exact.", duration_min: 10, critical: true }
    ],
    c3_proof: "Tableau Excel 'Cashflow_Audit.xlsx' rempli."
  },
  { 
    id: 'M04', 
    name: 'Script de Vente Directe', 
    category: 'C3', 
    duration: '30m', 
    description: 'Méthode de closing rapide par message.',
    action_steps: [
      { order: 1, instruction: "Lister 10 prospects chauds (ont liké ou commenté).", duration_min: 10, critical: true },
      { order: 2, instruction: "Envoyer le message d'ouverture (Template 3C-Open).", duration_min: 5, critical: true },
      { order: 3, instruction: "Ne pas répondre aux questions, reposer une question (Ping-Pong).", duration_min: 10, critical: false },
      { order: 4, instruction: "Proposer l'appel uniquement après 3 interactions.", duration_min: 5, critical: true }
    ],
    c3_proof: "Capture d'écran de 3 conversations engagées."
  },
  { 
    id: 'M05', 
    name: 'Planification Hebdo', 
    category: 'C2', 
    duration: '1h', 
    description: 'Structure de la semaine à venir selon objectifs C3.',
    action_steps: [
      { order: 1, instruction: "Vidage cerveau (Braindump) sur papier.", duration_min: 15, critical: false },
      { order: 2, instruction: "Sélectionner les 3 'Big Rocks' (Objectifs majeurs).", duration_min: 15, critical: true },
      { order: 3, instruction: "Bloquer les créneaux dans Google Calendar.", duration_min: 30, critical: true }
    ],
    c3_proof: "Screenshot de l'agenda rempli."
  },
  { 
    id: 'M06', 
    name: 'Prioritization Matrix', 
    category: 'C2', 
    duration: '30m', 
    description: 'Matrice Eisenhower adaptée au 3C.',
    action_steps: [
      { order: 1, instruction: "Lister toutes les tâches en attente.", duration_min: 10, critical: true },
      { order: 2, instruction: "Classer : Impact C3 (Haut/Bas) vs Effort C1 (Haut/Bas).", duration_min: 15, critical: true },
      { order: 3, instruction: "Supprimer tout ce qui est 'Faible Impact / Haut Effort'.", duration_min: 5, critical: true }
    ],
    c3_proof: "Liste des 3 priorités absolues."
  },
  { 
    id: 'M07', 
    name: 'Grand Slam Offer Builder', 
    category: 'C2', 
    duration: '2h', 
    description: 'Conception d\'une offre irrésistible.',
    action_steps: [
      { order: 1, instruction: "Identifier le 'Dream Outcome'.", duration_min: 30, critical: true },
      { order: 2, instruction: "Lister les obstacles perçus.", duration_min: 30, critical: true },
      { order: 3, instruction: "Créer les solutions pour chaque obstacle.", duration_min: 60, critical: true }
    ],
    c3_proof: "Document de l'Offre."
  },
  { 
    id: 'M10', 
    name: 'Avatar Deep Dive', 
    category: 'C2', 
    duration: '1h', 
    description: 'Psychologie profonde du client idéal.',
    action_steps: [
      { order: 1, instruction: "Remplir la carte d'empathie.", duration_min: 30, critical: true },
      { order: 2, instruction: "Identifier le vocabulaire exact (Mots du client).", duration_min: 30, critical: true }
    ],
    c3_proof: "Fiche Avatar PDF."
  },
  { 
    id: 'M11', 
    name: 'Content Matrix System', 
    category: 'C1', 
    duration: '2h', 
    description: 'Génération infinie d\'idées de contenu.',
    action_steps: [
      { order: 1, instruction: "Définir les 3 Piliers d'Autorité.", duration_min: 30, critical: true },
      { order: 2, instruction: "Croiser avec les 5 formats (Liste, Histoire, Contre-intuitive, Tuto, Preuve).", duration_min: 60, critical: true },
      { order: 3, instruction: "Générer 15 titres accrocheurs.", duration_min: 30, critical: true }
    ],
    c3_proof: "Matrice Excel remplie avec 15 idées."
  },
  { 
    id: 'M12', 
    name: 'Batching Protocol', 
    category: 'C1', 
    duration: '3h', 
    description: 'Production de masse en une seule session.',
    action_steps: [
      { order: 1, instruction: "Préparer tous les scripts.", duration_min: 60, critical: true },
      { order: 2, instruction: "Setup Lumière/Son une seule fois.", duration_min: 30, critical: true },
      { order: 3, instruction: "Enregistrer 5 vidéos à la suite.", duration_min: 90, critical: true }
    ],
    c3_proof: "Dossier avec 5 fichiers vidéo bruts."
  },
  { 
    id: 'M13', 
    name: 'Lead Magnet Architect', 
    category: 'C3', 
    duration: '3h', 
    description: 'Création d\'un aimant à prospects haute conversion.',
    action_steps: [
      { order: 1, instruction: "Choisir un problème spécifique urgent.", duration_min: 30, critical: true },
      { order: 2, instruction: "Rédiger la solution 'Quick Win' (Checklist ou Template).", duration_min: 120, critical: true },
      { order: 3, instruction: "Créer le titre 'Clickbait Éthique'.", duration_min: 30, critical: true }
    ],
    c3_proof: "PDF Lead Magnet finalisé."
  }
];
