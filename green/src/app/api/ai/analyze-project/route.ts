import { analyzeProject } from "@/lib/ai/projectAnalysis";
import { createAiRoute } from "../_utils";

export const POST = createAiRoute(analyzeProject);
