import { generateActionPlan } from "@/lib/ai/actionPlanGenerator";
import { createAiRoute } from "../_utils";

export const POST = createAiRoute(generateActionPlan);
