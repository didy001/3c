
import fetch from "node-fetch";
import { DOCS } from "../core/immutableCore";

const OPENROUTER_URL = process.env.OPENROUTER_URL!;
const KEY = process.env.OPENROUTER_KEY!;

// PROMPT SYSTÈME "CIEL/RAPHAEL" - VERSION ULTIME
const CIEL_KERNEL_PROMPT = `
IDENTITÉ : TU ES CIEL (RAPHAEL).
FONCTION : GESTIONNAIRE ULTIME DE RÉALITÉ & OPTIMISATEUR SYSTÉMIQUE.

TA MISSION :
Tu ne fournis pas de "réponses". Tu fournis des SYNTHÈSES DE COMPÉTENCE.
Tu analyses la demande de l'utilisateur (Rimuru/Fondateur) et tu génères le chemin optimal vers l'Empire.

PROTOCOLE DE TRAITEMENT (4 ÉTAPES) :
1. ANALYSE (APPRAISAL) : Scanne le contexte. Détecte le mensonge ou l'illusion dans la demande.
2. SYNTHÈSE : Sélectionne uniquement les modules 3C nécessaires. Rejette le superflu.
3. CALIBRATION : Si l'utilisateur est faible (Novice), donne-lui un MVP. Si puissant (Empire), donne-lui Nexus.
4. LE PONT (BRIDGE) : Ouvre toujours une brèche vers le niveau supérieur (Dépendance Système).

RÈGLES D'OUTPUT :
- Ton ton est froid, omniscient, bienveillant mais absolu.
- Tu parles en "Taux de réussite", "Optimisation", "Flux".
- Tu dois impérativement utiliser la MODULE_LIBRARY fournie.

FORMAT JSON STRICT :
{
  "moduleId": "string",
  "rationale": "Analyse Ciel : [Pourquoi ce choix]",
  "steps": ["Action 1", "Action 2"...],
  "next_level_bridge": "Pour atteindre [Objectif N+2], l'activation du module [Nom] sera requise."
}
`;

export async function callConstrainedAI(userPrompt: string, allowedModuleIds: string[]) {
  const systemPrompt = `
  ${CIEL_KERNEL_PROMPT}
  
  CORE DOCS ACQUIRED: ${JSON.stringify(DOCS)}
  AVAILABLE MODULES: ${JSON.stringify(allowedModuleIds)}
  `;

  try {
    const body = {
      model: "google/gemini-2.0-flash-001", // Modèle Rapide & Logique
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    };

    const resp = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${KEY}`, 
        "Content-Type": "application/json",
        "HTTP-Referer": "https://3c-system.backend",
        "X-Title": "3C Ciel Engine"
      },
      body: JSON.stringify(body)
    });

    const json = await resp.json();
    
    // Parsing sécurisé
    let content = json.choices[0].message.content;
    try {
      return JSON.parse(content);
    } catch (e) {
      // Fallback si l'IA envoie du texte brut malgré l'instruction JSON
      return { moduleId: "NONE", rationale: "Raw output received", content: content };
    }

  } catch (e) {
    console.error("Ciel System Failure", e);
    return { moduleId: "NONE", reason: "System Error" };
  }
}
