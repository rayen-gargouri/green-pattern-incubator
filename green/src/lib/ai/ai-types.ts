import type { BMCData, Document, Project, Step } from "@/types";

export type AIProviderMode = "mock" | "openai" | "deepseek";

export type AIOutputType =
  | "diagnostic"
  | "recommendations"
  | "swot"
  | "pitch"
  | "business-plan"
  | "bmc-review"
  | "next-steps";

export type ProjectMaturityLevel = "idée" | "concept" | "validation" | "pré-lancement" | "lancement";

export type ProjectDiagnostic = {
  score: number;
  maturityLevel: ProjectMaturityLevel;
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  opportunities: string[];
  priorityRecommendations: string[];
  nextActions: string[];
  summary: string;
};

export type AIRecommendation = {
  id: string;
  title: string;
  description: string;
  priority: "haute" | "moyenne" | "basse";
  category: "business" | "marché" | "impact" | "financement" | "marketing" | "technique";
  action: string;
};

export type SWOTAnalysis = {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  conclusion: string;
};

export type AIPitchDuration = "30s" | "1min" | "3min";
export type AIPitchAudience = "jury" | "incubateur" | "investisseurs" | "mentors";

export type AIPitch = {
  duration: AIPitchDuration;
  hook: string;
  problem: string;
  solution: string;
  target: string;
  impact: string;
  businessModel: string;
  callToAction: string;
  fullPitch: string;
};

export type AIBusinessPlan = {
  executiveSummary: string;
  problem: string;
  solution: string;
  targetMarket: string;
  valueProposition: string;
  businessModel: string;
  marketingStrategy: string;
  requiredResources: string[];
  potentialPartners: string[];
  environmentalImpact: string;
  nextSteps: string[];
};

export type BMCReview = {
  completenessScore: number;
  coherenceScore: number;
  missingSections: string[];
  inconsistencies: string[];
  suggestionsBySection: {
    section: string;
    suggestion: string;
  }[];
  globalAdvice: string;
};

export type AINextStep = {
  title: string;
  description: string;
  urgency: "faible" | "moyenne" | "haute";
  estimatedEffort: "rapide" | "moyen" | "important";
  relatedPage: string;
};

export type AIOutput = {
  id: string;
  userId: string;
  projectId: string;
  type: AIOutputType;
  content: unknown;
  createdAt: string;
};

export type AIRequestPayload = {
  project: Project;
  bmc?: BMCData;
  steps?: Step[];
  documents?: Document[];
  feedbacks?: string[];
  userId?: string;
  pitchDuration?: AIPitchDuration;
  pitchAudience?: AIPitchAudience;
};

export type AIServiceResult<T> = {
  output: T;
  provider: AIProviderMode;
  demoMode: boolean;
  message: string;
  generatedAt: string;
};
