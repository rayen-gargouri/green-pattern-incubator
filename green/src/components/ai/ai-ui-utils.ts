import { demoProjects } from "@/lib/data";
import {
  getAIOutputsByProjectId,
  getBMC,
  getDocuments,
  getProject,
  getSteps,
  saveAIOutput
} from "@/lib/storage";
import type { AIOutputType, BMCData, Document, Project, Step } from "@/types";

export type AIAPIResponse<T> = {
  success: boolean;
  provider: "mock" | "openai";
  demoMode: boolean;
  message: string;
  output: T;
  generatedAt: string;
  error?: string;
};

export type ClientAIPayload = {
  project: Project;
  bmc?: BMCData | null;
  steps?: Step[] | null;
  documents?: Document[] | null;
  userId?: string;
  duration?: string;
  audience?: string;
};

export function getCurrentProject(fallbackProject?: Project): Project {
  return getProject() ?? fallbackProject ?? (demoProjects[0] as Project);
}

export function buildClientAIPayload(fallbackProject?: Project): ClientAIPayload {
  const project = getCurrentProject(fallbackProject);

  return {
    project,
    bmc: getBMC(),
    steps: getSteps(),
    documents: getDocuments(),
    userId: project.userId ?? "local-user"
  };
}

export async function postAI<T>(endpoint: string, payload: ClientAIPayload): Promise<AIAPIResponse<T>> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const json = (await response.json()) as AIAPIResponse<T>;

  if (!response.ok || !json.success) {
    throw new Error(json.error || "Impossible de generer l'analyse pour le moment");
  }

  return json;
}

export function persistAIOutput(type: AIOutputType, project: Project, content: unknown) {
  saveAIOutput({
    id: `ai_${type}_${Date.now()}`,
    userId: project.userId ?? "local-user",
    projectId: project.id,
    type,
    content,
    createdAt: new Date().toISOString()
  });
}

export function getLatestAIOutput<T>(type: AIOutputType, project: Project): T | null {
  const output = getAIOutputsByProjectId(project.id).find((item) => item.type === type);
  return output ? (output.content as T) : null;
}

export function listToMarkdown(title: string, items: string[]) {
  return [`## ${title}`, ...items.map((item) => `- ${item}`)].join("\n");
}
