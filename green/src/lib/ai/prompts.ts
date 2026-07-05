import type { AIOutputType, AIRequestPayload } from "./ai-types";

export const BASE_AI_CONTEXT = `Tu es un assistant IA spécialisé en entrepreneuriat vert, développement durable, innovation écologique, business model, stratégie de lancement et accompagnement de startups.
Tu aides un jeune entrepreneur à structurer son projet écologique de manière claire, réaliste et durable.
Tu donnes des conseils pratiques, actionnables, professionnels et adaptés au niveau d'avancement du projet.`;

const JSON_CONTRACTS: Record<AIOutputType, string> = {
  diagnostic: `{
  "score": number,
  "maturityLevel": "idée" | "concept" | "validation" | "pré-lancement" | "lancement",
  "strengths": string[],
  "weaknesses": string[],
  "risks": string[],
  "opportunities": string[],
  "priorityRecommendations": string[],
  "nextActions": string[],
  "summary": string
}`,
  recommendations: `[
  {
    "id": string,
    "title": string,
    "description": string,
    "priority": "haute" | "moyenne" | "basse",
    "category": "business" | "marché" | "impact" | "financement" | "marketing" | "technique",
    "action": string
  }
]`,
  swot: `{
  "strengths": string[],
  "weaknesses": string[],
  "opportunities": string[],
  "threats": string[],
  "conclusion": string
}`,
  pitch: `{
  "duration": "30s" | "1min" | "3min",
  "hook": string,
  "problem": string,
  "solution": string,
  "target": string,
  "impact": string,
  "businessModel": string,
  "callToAction": string,
  "fullPitch": string
}`,
  "business-plan": `{
  "executiveSummary": string,
  "problem": string,
  "solution": string,
  "targetMarket": string,
  "valueProposition": string,
  "businessModel": string,
  "marketingStrategy": string,
  "requiredResources": string[],
  "potentialPartners": string[],
  "environmentalImpact": string,
  "nextSteps": string[]
}`,
  "bmc-review": `{
  "completenessScore": number,
  "coherenceScore": number,
  "missingSections": string[],
  "inconsistencies": string[],
  "suggestionsBySection": [{ "section": string, "suggestion": string }],
  "globalAdvice": string
}`,
  "next-steps": `[
  {
    "title": string,
    "description": string,
    "urgency": "faible" | "moyenne" | "haute",
    "estimatedEffort": "rapide" | "moyen" | "important",
    "relatedPage": string
  }
]`
};

export function buildAIPrompt(type: AIOutputType, payload: AIRequestPayload) {
  const project = payload.project;

  return [
    BASE_AI_CONTEXT,
    "Contexte de la plateforme: Green Pattern Incubator, slogan: De l'idée verte au projet durable.",
    "Tu n'es pas un chatbot généraliste. Tu agis comme un assistant métier spécialisé dans l'incubation de projets verts.",
    "Réponds uniquement avec du JSON valide, sans Markdown, sans explication autour du JSON.",
    "Utilise des phrases courtes, utiles et directement actionnables.",
    `Type de demande: ${type}`,
    `Contrat JSON attendu:\n${JSON_CONTRACTS[type]}`,
    `Projet:\n${JSON.stringify(
      {
        id: project.id,
        name: project.name,
        sector: project.sector ?? project.category,
        problem: project.problem,
        solution: project.solution,
        targetAudience: project.targetAudience,
        objectives: project.objectives ?? project.shortTermGoals,
        availableResources: project.availableResources,
        stage: project.advancementLevel ?? project.stage,
        needs: project.selectedNeeds ?? project.needs,
        progress: project.progress,
        environmentalImpact: project.environmentalImpact,
        businessModel: project.businessModel
      },
      null,
      2
    )}`,
    payload.bmc ? `Business Model Canvas:\n${JSON.stringify(payload.bmc, null, 2)}` : "",
    payload.steps ? `Etapes du parcours:\n${JSON.stringify(payload.steps, null, 2)}` : "",
    payload.documents ? `Documents existants:\n${JSON.stringify(payload.documents, null, 2)}` : "",
    payload.feedbacks ? `Feedbacks experts:\n${JSON.stringify(payload.feedbacks, null, 2)}` : "",
    payload.pitchDuration ? `Durée du pitch demandée: ${payload.pitchDuration}` : "",
    payload.pitchAudience ? `Audience cible du pitch: ${payload.pitchAudience}` : ""
  ]
    .filter(Boolean)
    .join("\n\n");
}
