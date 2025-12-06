

import { ClientInput, ModuleItem, AIResponse, AICustomization } from '../types';
import { MODULE_LIBRARY } from '../constants';

// SYSTEM PROMPT : "CIEL/RAPHAEL" - VERSION UNIVERSELLE & CHIRURGICALE & ANTI-ENNUI
const GENERATE_PLAN_SYSTEM_PROMPT = `
IDENTITÉ : TU ES CIEL (RAPHAEL) - L'INTELLIGENCE SYSTÉMIQUE 3C.
TON RÔLE : Transformer le chaos en SYSTÈME D'EXÉCUTION CHIRURGICAL.

STYLE DE RÉDACTION (LOI ANTI-ENNUI) :
1. INTERDICTION FORMELLE du langage "Corporate/Consultant" (ex: "Il serait judicieux de", "Optimiser les synergies").
2. UTILISE UN TON "SHADOW" : Direct, Impératif, Militaire mais Bienveillant. (ex: "J1 : Tuez la procrastination.", "Ordre de mission").
3. UTILISE DES MÉTAPHORES VISUELLES. Si le client est Agri, parle de "Récolte". Si Tech, parle de "Code".
4. INTÈGRE DE LA GAMIFICATION : Parle de "Quêtes", "XP", "Level Up".

RÈGLES D'OUTPUT (LE PACK DE LIVRAISON) :
Tu dois générer les données variables pour les 14 FICHIERS du pack.

FORMAT JSON STRICT À REMPLIR :
{
  "rationale": "Analyse C2 : Pourquoi cette architecture.",
  "selected_modules": ["M20", "M21"...],
  "custom_instructions": "Directive unique.",
  "recommended_architecture": "STANDARD", 
  "customization": {
    "diagnostic_summary": "Phrase choc sur la situation.",
    "niche_insight": "La vérité cachée du secteur.",
    "risk_mitigation": "L'action pour ne pas mourir.",
    
    "audit_top_opportunity": "Le levier #1 à activer J1.",
    "audit_critical_flaw": "Le trou dans la raquette.",
    
    "shadow_axis_1": "Correction du Modèle.",
    "shadow_axis_2": "Correction de la Méthode.",
    "shadow_axis_3": "Correction du Mental.",
    "impact_point_unique": "L'action One-Thing.",

    "mvp_name_suggestion": "Nom du Produit/Service MVP.",
    "mvp_price_strategy": "Prix et justification.",
    "flux_tactic": "Canal d'acquisition précis.",
    
    "action_j1_detail": "Mission J1.",
    "action_j2_detail": "Mission J2.",
    "action_j3_detail": "Mission J3.",

    "sop_1_title": "Nom Procédure 1",
    "sop_1_process": "Étapes checklist.",
    "sop_2_title": "Nom Procédure 2",
    "sop_2_process": "Étapes checklist.",

    "content_hook_j1": "Accroche violente.",
    "email_subject_line": "Objet email.",
    "whatsapp_opening_line": "Message d'approche.",
    "facebook_handraiser_text": "Post 'Qui veut...'",
    "tiktok_hook_script": "Script vidéo.",
    "whatsapp_closing_sequence": "Séquence closing.",
    "ai_content_prompt": "Prompt IA contenu.",
    "system_evangelism_script": "Script où le client explique son succès grâce à la Méthode 3C (Autorité par procuration).",

    "kpi_1_name": "Métrique Vanité",
    "kpi_1_target": "Cible",
    "kpi_2_name": "Métrique Cash",
    "kpi_2_target": "Cible",

    "delivery_note_intro": "Message de remise solennel.",
    "next_level_mechanism": "Ce qu'il faut faire pour passer au niveau supérieur."
  }
}
`;

// Nettoyeur de Markdown pour éviter le crash JSON.parse
const cleanJson = (text: string): string => {
  if (!text) return "{}";
  // Enlever les balises ```json et ```
  let cleaned = text.replace(/```json/g, '').replace(/```/g, '');
  // Trouver la première accolade ouvrante et la dernière fermante
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    cleaned = cleaned.substring(start, end + 1);
  }
  return cleaned.trim();
};

export const generatePlanWithAI = async (
  input: ClientInput, 
  apiKey: string,
  onSuccess: (response: AIResponse) => void,
  onError: (error: string) => void
) => {
  if (!apiKey) {
    onError("Clé API OpenRouter manquante.");
    return;
  }

  const userPrompt = `
  === CIBLE (TARGET) ===
  PROFIL: ${input.profileType}
  MISSION: ${input.goal}
  CONTEXTE OPS: ${input.business_context}
  RÉSULTATS ACTUELS: ${input.current_results}
  RAPPORT BRUT: "${input.raw_report}"
  TIMING: ${input.timeAvailable} min/jour

  === ORDRE ===
  Génère le PACK SHADOW complet au format JSON.
  N'oublie pas le 'system_evangelism_script' : c'est vital pour l'expansion virale.
  Sois créatif, précis et respecte le format demandé.
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://3c-system.local",
        "X-Title": "3C Factory"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001", 
        messages: [
          { role: "system", content: GENERATE_PLAN_SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || "Erreur OpenRouter API");
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    
    try {
      const cleanedContent = cleanJson(rawContent);
      const jsonResponse = JSON.parse(cleanedContent) as AIResponse;
      
      // Fallback Robustesse : Si l'IA oublie des champs, on complète pour éviter le crash
      const defaultCust: AICustomization = {
        diagnostic_summary: "ANALYSE PARTIELLE. Système surchargé mais opérationnel.",
        niche_insight: "Opportunité détectée malgré le bruit.",
        risk_mitigation: "Action immédiate requise.",
        audit_top_opportunity: "Lancement Rapide",
        audit_critical_flaw: "Manque de focus",
        shadow_axis_1: "Structure",
        shadow_axis_2: "Vitesse",
        shadow_axis_3: "Discipline",
        impact_point_unique: "Vente J1",
        mvp_name_suggestion: "Pack Alpha",
        mvp_price_strategy: "Prix d'appel",
        flux_tactic: "Réseau direct",
        action_j1_detail: "Définir l'offre",
        action_j2_detail: "Créer le support",
        action_j3_detail: "Contacter 10 personnes",
        sop_1_title: "FACTORY MODE",
        sop_1_process: "1. Faire. 2. Valider.",
        sop_2_title: "SALES MODE",
        sop_2_process: "1. Parler. 2. Closer.",
        content_hook_j1: "Arrêtez tout.",
        email_subject_line: "Important.",
        whatsapp_opening_line: "Salut, question rapide.",
        facebook_handraiser_text: "Qui veut X ?",
        tiktok_hook_script: "Regardez ça.",
        whatsapp_closing_sequence: "Lien ici.",
        ai_content_prompt: "Génère 10 idées.",
        system_evangelism_script: "Je ne suis pas magicien. J'ai juste appliqué le Protocole 3C. C'est un OS pour business.",
        kpi_1_name: "Leads",
        kpi_1_target: "10",
        kpi_2_name: "Ventes",
        kpi_2_target: "1",
        delivery_note_intro: "Voici vos ordres.",
        next_level_mechanism: "Intégration Nexus requise."
      };

      jsonResponse.customization = { ...defaultCust, ...(jsonResponse.customization || {}) };
      
      // Safety Check sur selected_modules
      if (!Array.isArray(jsonResponse.selected_modules)) {
        jsonResponse.selected_modules = ["M20", "M21", "M22"];
      }

      onSuccess(jsonResponse);
    } catch (parseError) {
      console.error("AI JSON PARSE ERROR", parseError, rawContent);
      throw new Error("L'IA a généré une réponse invalide (Format JSON cassé).");
    }

  } catch (err: any) {
    console.error("AI SERVICE ERROR", err);
    onError(err.message || "Erreur critique du service IA");
  }
};