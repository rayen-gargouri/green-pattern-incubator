import type { AIProviderMode } from "./ai-types";

type RunAIJsonOptions<T> = {
  system: string;
  prompt: string;
  fallback: T;
  schemaName: string;
};

type RunAITextOptions = {
  system: string;
  prompt: string;
  fallback: string;
};

type RunAIResult<T> = {
  output: T;
  provider: AIProviderMode;
  message: string;
};

type AIConfig = {
  provider: AIProviderMode;
  baseUrl: string;
  model: string;
};

export function isAIConfigured() {
  return Boolean(process.env.AI_API_KEY && process.env.AI_PROVIDER !== "mock");
}

function getAIConfig(): AIConfig {
  if (!isAIConfigured()) {
    return { provider: "mock", baseUrl: "", model: "" };
  }

  const provider: AIProviderMode = process.env.AI_PROVIDER === "deepseek" ? "deepseek" : "openai";
  const baseUrl =
    process.env.AI_BASE_URL ||
    (provider === "deepseek" ? "https://api.deepseek.com" : "https://api.openai.com/v1");
  const model =
    process.env.AI_MODEL ||
    (provider === "deepseek" ? "deepseek-v4-flash" : "gpt-4o-mini");

  return { provider, baseUrl, model };
}

function chatCompletionsUrl(baseUrl: string) {
  return `${baseUrl.replace(/\/$/, "")}/chat/completions`;
}

async function requestChatCompletion({
  system,
  prompt,
  json,
  config
}: {
  system: string;
  prompt: string;
  json: boolean;
  config: AIConfig;
}) {
  const response = await fetch(chatCompletionsUrl(config.baseUrl), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: config.model,
      ...(json ? { response_format: { type: "json_object" } } : {}),
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`AI provider error: ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("AI provider returned an empty response.");
  }

  return content;
}

export async function runAIJson<T>(options: RunAIJsonOptions<T>): Promise<RunAIResult<T>> {
  const config = getAIConfig();

  if (config.provider === "mock") {
    return {
      output: options.fallback,
      provider: "mock",
      message: "Mode demonstration IA active"
    };
  }

  try {
    const content = await requestChatCompletion({
      system: options.system,
      prompt: options.prompt,
      json: true,
      config
    });

    return {
      output: JSON.parse(content) as T,
      provider: config.provider,
      message: "Resultat genere par le fournisseur IA configure"
    };
  } catch (error) {
    console.error(`AI provider failed for ${options.schemaName}, falling back to mock mode`, error);
    return {
      output: options.fallback,
      provider: "mock",
      message: "Impossible de joindre le fournisseur IA. Mode demonstration IA active"
    };
  }
}

export async function runAIText(options: RunAITextOptions): Promise<RunAIResult<string>> {
  const config = getAIConfig();

  if (config.provider === "mock") {
    return {
      output: options.fallback,
      provider: "mock",
      message: "Mode demonstration IA active"
    };
  }

  try {
    const content = await requestChatCompletion({
      system: options.system,
      prompt: options.prompt,
      json: false,
      config
    });

    return {
      output: content,
      provider: config.provider,
      message: "Reponse generee par le fournisseur IA configure"
    };
  } catch (error) {
    console.error("AI provider failed for chatbot, falling back to mock mode", error);
    return {
      output: options.fallback,
      provider: "mock",
      message: "Impossible de joindre le fournisseur IA. Mode demonstration IA active"
    };
  }
}
