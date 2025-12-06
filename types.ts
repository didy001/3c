


export enum ViewState {
  NEXUS_DASHBOARD = 'NEXUS_DASHBOARD', 
  AGENT_GUIDE = 'AGENT_GUIDE',
  DOC_PROFILE = 'DOC_PROFILE',
  DOC_CONCEPT = 'DOC_CONCEPT',
  DOC_ROADMAP = 'DOC_ROADMAP',
  DOC_AUDIT = 'DOC_AUDIT',
  DOC_ECONOMY = 'DOC_ECONOMY',
  DOC_INDUSTRIAL = 'DOC_INDUSTRIAL',
  DOC_BACKEND = 'DOC_BACKEND',
  DOC_SAAS = 'DOC_SAAS',
  FACTORY_VIEW = 'FACTORY_VIEW',
  BACKEND_CODE_VIEW = 'BACKEND_CODE_VIEW',
  IDEA_VAULT_VIEW = 'IDEA_VAULT_VIEW',
}

export interface DocumentSection {
  title: string;
  content: string[];
  highlight?: string;
}

export interface MasterDocument {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  version: string;
  sections: DocumentSection[];
}

export interface ActionStep {
  order: number;
  instruction: string;
  duration_min: number;
  critical: boolean;
}

export interface ModuleItem {
  id: string;
  name: string;
  category: 'C1' | 'C2' | 'C3';
  duration: string;
  description: string;
  action_steps: ActionStep[];
  c3_proof: string;
}

export interface ClientInput {
  profileType: string;
  business_context: string;
  current_results: string;
  raw_report: string;
  goal: string;
  frictions: string[];
  timeAvailable: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'system' | 'agent';
  content: string;
  timestamp: Date;
  actions?: string[]; 
  refDocument?: string; 
}

// DEEP CUSTOMIZATION : LA STRUCTURE QUI COUVRE LES 14 FICHIERS
export interface AICustomization {
  // Global & Diagnostic
  diagnostic_summary: string;
  niche_insight: string;
  risk_mitigation: string;
  
  // Fichier 01: Audit
  audit_top_opportunity: string;
  audit_critical_flaw: string;
  
  // Fichier 02: Shadow Map
  shadow_axis_1: string; // Modèle
  shadow_axis_2: string; // Méthode
  shadow_axis_3: string; // Mental
  impact_point_unique: string;

  // Fichier 03: Plan Action
  mvp_name_suggestion: string;
  mvp_price_strategy: string;
  flux_tactic: string;
  
  // Fichier 04: Checklist
  action_j1_detail: string;
  action_j2_detail: string;
  action_j3_detail: string;

  // Fichier 05: SOPs (Standard Operating Procedures)
  sop_1_title: string; // ex: "Création Offre"
  sop_1_process: string; // Liste des étapes
  sop_2_title: string; // ex: "Closing WhatsApp"
  sop_2_process: string;

  // Fichier 06: Scripts & Templates & Funnel
  content_hook_j1: string;
  email_subject_line: string;
  whatsapp_opening_line: string;
  facebook_handraiser_text: string; 
  tiktok_hook_script: string; 
  whatsapp_closing_sequence: string; 
  ai_content_prompt: string; 
  system_evangelism_script: string; // SCRIPT D'AUTORITÉ POUR LE SYSTÈME

  // Fichier 07: Dashboard KPI
  kpi_1_name: string; // ex: "Leads Qualifiés"
  kpi_1_target: string; // ex: "10/semaine"
  kpi_2_name: string;
  kpi_2_target: string;

  // Fichier 08: Delivery Notes
  delivery_note_intro: string; // Message formel de livraison

  // Fichier 12: Playbook Evolution
  next_level_mechanism: string; // Comment passer au niveau supérieur
}

export interface AIResponse {
  rationale: string;
  selected_modules: string[]; 
  custom_instructions: string;
  recommended_architecture?: string;
  customization?: AICustomization;
}

export interface GeneratedAsset {
  id: string;
  type: 'STRATEGY_PDF' | 'EXECUTION_XLS' | 'SCRIPT_TXT' | 'SYSTEM_JSON' | 'ARCHIVE_ZIP';
  title: string;
  content: string;
  description: string;
}

export interface SystemNode {
  id: string;
  label: string;
  status: 'OPTIMAL' | 'STABLE' | 'CRITICAL' | 'OFFLINE';
  load: number; 
  connections: string[]; 
}

export interface SimulationResult {
  probability_success: number;
  projected_revenue: string;
  risk_factors: string[];
  recommended_sequence: string[];
  impact_analysis: string;
}

export interface StoredIdea {
  id: string;
  timestamp: Date;
  sector: string;
  niche: string;
  problem: string;
  mvp_type: string;
  origin_profile: string;
  status: 'RAW' | 'VALIDATED' | 'GOLD_MINE';
}
