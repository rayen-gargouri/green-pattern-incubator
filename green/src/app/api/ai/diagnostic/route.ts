import { NextResponse } from "next/server";
import { generateDiagnostic } from "@/lib/ai/ai-service";
import { createAIRoute } from "../_utils";

export async function GET() {
  return NextResponse.json({
    available: true,
    module: "Green Coach IA",
    version: "mvp",
    demoMode: !process.env.AI_API_KEY,
    message:
      "Le diagnostic IA analyse le projet, retourne un score, des risques, des opportunites et des actions prioritaires.",
    features: [
      "Diagnostic intelligent du projet",
      "Recommandations prioritaires",
      "Mode demonstration IA si aucune cle API n'est configuree"
    ]
  });
}

export const POST = createAIRoute(generateDiagnostic);
