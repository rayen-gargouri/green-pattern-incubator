import { NextResponse } from "next/server";
import type { Project } from "@/lib/types";
import type { AIRequestPayload, AIServiceResult } from "@/lib/ai/ai-types";
import { ValidationError, validateAIRequest, validatePitchAIRequest } from "@/lib/ai/validators";

type AIRouteOptions = {
  pitch?: boolean;
};

export function createAIRoute<T>(
  handler: (payload: AIRequestPayload) => Promise<AIServiceResult<T>>,
  options: AIRouteOptions = {}
) {
  return async function POST(request: Request) {
    try {
      const body = await request.json().catch(() => {
        throw new ValidationError("JSON invalide.");
      });
      const payload = options.pitch ? validatePitchAIRequest(body) : validateAIRequest(body);
      const result = await handler(payload);

      return NextResponse.json({
        success: true,
        provider: result.provider,
        demoMode: result.demoMode,
        message: result.message,
        output: result.output,
        generatedAt: result.generatedAt
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json({ success: false, error: error.message }, { status: error.status });
      }

      console.error("AI route error", error);
      return NextResponse.json(
        { success: false, error: "Impossible de generer l'analyse pour le moment." },
        { status: 500 }
      );
    }
  };
}

export function createAiRoute(handler: (project: Project) => Promise<unknown>) {
  return async function POST(request: Request) {
    try {
      const body = (await request.json()) as { project?: Project };
      if (!body.project) {
        return NextResponse.json({ error: "Projet manquant." }, { status: 400 });
      }

      const output = await handler(body.project);
      return NextResponse.json({
        configured: Boolean(process.env.AI_API_KEY),
        demoMode: !process.env.AI_API_KEY,
        message: process.env.AI_API_KEY
          ? "Resultat genere par le fournisseur IA configure."
          : "Assistant IA non configure: resultat de demonstration retourne.",
        output
      });
    } catch (error) {
      console.error("Legacy AI route error", error);
      return NextResponse.json({ error: "Impossible de generer le resultat IA." }, { status: 500 });
    }
  };
}
