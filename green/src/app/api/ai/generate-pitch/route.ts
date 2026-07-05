import { generatePitch } from "@/lib/ai/pitchGenerator";
import { createAiRoute } from "../_utils";

export const POST = createAiRoute(generatePitch);
