
import { ChatMessage } from '../types';
import { AGENT_SYSTEM_INSTRUCTION, PROFILE_DOCUMENT, CONCEPT_DOCUMENT, INDUSTRIAL_DOCUMENT } from '../constants';

export const AVAILABLE_MODELS = [
  { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash (Rapide & Gratuit)' },
  { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1 (Raisonnement Pur)' },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku (Rapide)' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini (Equilibré)' },
];

// Construction du Context Prompt (Le Cerveau du système)
// On injecte les documents maîtres pour que l'IA "incarne" le système.
const buildSystemContext = () => {
  const profileSummary = PROFILE_DOCUMENT.sections.map(s => `${s.title}: ${s.content.join(' ')}`).join('\n');
  const logicSummary = CONCEPT_DOCUMENT.sections.map(s => `${s.title}: ${s.content.join(' ')}`).join('\n');
  const factorySummary = INDUSTRIAL_DOCUMENT.sections.find(s => s.title.includes('Formulaire'))?.content.join('\n') || "";

  return `
${AGENT_SYSTEM_INSTRUCTION}

=== CONTEXTE CRITIQUE (TON CODE SOURCE) ===

[PROFIL UTILISATEUR (DOC-001)]
${profileSummary}

[LOGIQUE SYSTÈME 3C (DOC-002)]
${logicSummary}

[PROTOCOLE INDUSTRIEL (DOC-006)]
${factorySummary}

=== INSTRUCTION DE RÉPONSE ===
Tu ne dois PAS répondre comme un assistant classique.
Tu dois :
1. Analyser l'input sous l'angle C1/C2/C3.
2. Identifier si l'utilisateur dérive de son profil.
3. Proposer des ACTIONS CONCRÈTES (C1) immédiates.
4. Être concis, froid, chirurgical.
`;
};

export const streamOpenRouterResponse = async (
  messages: ChatMessage[],
  apiKey: string,
  model: string,
  onChunk: (content: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
) => {
  try {
    const systemMessage = { role: 'system', content: buildSystemContext() };
    
    // Conversion de l'historique pour l'API
    const apiMessages = [
      systemMessage,
      ...messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'agent' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://3c-system.local", 
        "X-Title": "3C System Architect",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: apiMessages,
        stream: true, // Activation du streaming pour effet temps réel
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Erreur connexion OpenRouter");
    }

    if (!response.body) throw new Error("Pas de flux de réponse");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Garder le reste incomplet pour la prochaine boucle

      for (const line of lines) {
        if (line.trim() === "") continue;
        if (line.trim() === "data: [DONE]") continue;
        
        if (line.startsWith("data: ")) {
          try {
            const json = JSON.parse(line.substring(6));
            const content = json.choices[0]?.delta?.content || "";
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            console.error("Erreur parsing stream", e);
          }
        }
      }
    }
    
    onComplete();

  } catch (error: any) {
    onError(error.message);
  }
};
