type AiRequest = {
  system: string;
  prompt: string;
};

import { runAIJson } from "./ai-client";

export async function runAiJson<TFallback>(request: AiRequest, fallback: TFallback): Promise<TFallback> {
  const result = await runAIJson({
    system: request.system,
    prompt: request.prompt,
    fallback,
    schemaName: "legacy-ai-response"
  });

  return result.output;
}
