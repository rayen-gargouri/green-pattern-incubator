import { analyzeImpact } from "@/lib/ai/impactAnalyzer";
import { createAiRoute } from "../_utils";

export const POST = createAiRoute(analyzeImpact);
