import { generateBusinessModel } from "@/lib/ai/businessModelGenerator";
import { createAiRoute } from "../_utils";

export const POST = createAiRoute(generateBusinessModel);
