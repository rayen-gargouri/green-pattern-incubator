import { generateSwot } from "@/lib/ai/swotGenerator";
import { createAiRoute } from "../_utils";

export const POST = createAiRoute(generateSwot);
