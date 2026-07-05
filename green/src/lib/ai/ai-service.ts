import { buildAIPrompt, BASE_AI_CONTEXT } from "./prompts";
import { runAIJson } from "./ai-client";
import {
  generateMockBMCReview,
  generateMockBusinessPlan,
  generateMockDiagnostic,
  generateMockNextSteps,
  generateMockPitch,
  generateMockRecommendations,
  generateMockSwot
} from "./mock-ai";
import type {
  AIBusinessPlan,
  AINextStep,
  AIPitch,
  AIRecommendation,
  AIRequestPayload,
  AIServiceResult,
  BMCReview,
  ProjectDiagnostic,
  SWOTAnalysis
} from "./ai-types";

async function runService<T>(
  type:
    | "diagnostic"
    | "recommendations"
    | "swot"
    | "pitch"
    | "business-plan"
    | "bmc-review"
    | "next-steps",
  payload: AIRequestPayload,
  fallback: T
): Promise<AIServiceResult<T>> {
  const result = await runAIJson({
    system: BASE_AI_CONTEXT,
    prompt: buildAIPrompt(type, payload),
    fallback,
    schemaName: type
  });

  return {
    output: result.output,
    provider: result.provider,
    demoMode: result.provider === "mock",
    message: result.message,
    generatedAt: new Date().toISOString()
  };
}

export function generateDiagnostic(payload: AIRequestPayload) {
  return runService<ProjectDiagnostic>("diagnostic", payload, generateMockDiagnostic(payload));
}

export function generateRecommendations(payload: AIRequestPayload) {
  return runService<AIRecommendation[]>("recommendations", payload, generateMockRecommendations(payload));
}

export function generateSwotAnalysis(payload: AIRequestPayload) {
  return runService<SWOTAnalysis>("swot", payload, generateMockSwot(payload));
}

export function generatePitch(payload: AIRequestPayload) {
  return runService<AIPitch>("pitch", payload, generateMockPitch(payload));
}

export function generateBusinessPlan(payload: AIRequestPayload) {
  return runService<AIBusinessPlan>("business-plan", payload, generateMockBusinessPlan(payload));
}

export function reviewBusinessModelCanvas(payload: AIRequestPayload) {
  return runService<BMCReview>("bmc-review", payload, generateMockBMCReview(payload));
}

export function generateNextSteps(payload: AIRequestPayload) {
  return runService<AINextStep[]>("next-steps", payload, generateMockNextSteps(payload));
}
