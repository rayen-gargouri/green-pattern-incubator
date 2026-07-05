import { generateRecommendations } from "@/lib/ai/ai-service";
import { createAIRoute } from "../_utils";

export const POST = createAIRoute(generateRecommendations);
