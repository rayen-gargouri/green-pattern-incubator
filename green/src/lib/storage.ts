/**
 * lib/storage.ts
 * Helper centralisé pour la persistance localStorage (mode MVP).
 * Structure préparée pour remplacement par appels API Supabase.
 */

import type { AIOutput, BMCData, Document, Project, Step } from "@/types";

// ============================================================
// Clés localStorage
// ============================================================
const KEYS = {
  project: "gpi_project",
  steps: "gpi_steps",
  bmc: "gpi_bmc",
  documents: "gpi_documents",
  aiOutputs: "green_pattern_ai_outputs"
} as const;

// ============================================================
// Helpers génériques
// ============================================================
function readStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn("localStorage write failed", key);
  }
}

// ============================================================
// Projet
// ============================================================
export function getProject(): Project | null {
  return readStorage<Project>(KEYS.project);
}

export function saveProject(project: Project): void {
  writeStorage(KEYS.project, { ...project, updatedAt: new Date().toISOString() });
}

export function clearProject(): void {
  if (typeof window !== "undefined") localStorage.removeItem(KEYS.project);
}

// ============================================================
// Étapes du parcours
// ============================================================
export function getSteps(): Step[] | null {
  return readStorage<Step[]>(KEYS.steps);
}

export function saveSteps(steps: Step[]): void {
  writeStorage(KEYS.steps, steps);
}

export function markStepDone(stepId: string, currentSteps: Step[]): Step[] {
  const updated = currentSteps.map((s) =>
    s.id === stepId ? { ...s, status: "done" as const, updatedAt: new Date().toISOString() } : s
  );
  saveSteps(updated);
  return updated;
}

export function markStepUndone(stepId: string, currentSteps: Step[]): Step[] {
  const updated = currentSteps.map((s) =>
    s.id === stepId ? { ...s, status: "not_started" as const, updatedAt: new Date().toISOString() } : s
  );
  saveSteps(updated);
  return updated;
}

export function computeProgress(steps: Step[]): number {
  if (steps.length === 0) return 0;
  const done = steps.filter((s) => s.status === "done").length;
  return Math.round((done / steps.length) * 100);
}

// ============================================================
// Business Model Canvas
// ============================================================
export function getBMC(): BMCData | null {
  return readStorage<BMCData>(KEYS.bmc);
}

export function saveBMC(data: BMCData): void {
  writeStorage(KEYS.bmc, { ...data, updatedAt: new Date().toISOString() });
}

export function clearBMC(): void {
  if (typeof window !== "undefined") localStorage.removeItem(KEYS.bmc);
}

// ============================================================
// Documents
// ============================================================
export function getDocuments(): Document[] | null {
  return readStorage<Document[]>(KEYS.documents);
}

export function saveDocuments(docs: Document[]): void {
  writeStorage(KEYS.documents, docs);
}

export function updateDocument(id: string, updates: Partial<Document>, current: Document[]): Document[] {
  const updated = current.map((d) =>
    d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
  );
  saveDocuments(updated);
  return updated;
}

export function getAIOutputs(): AIOutput[] {
  return readStorage<AIOutput[]>(KEYS.aiOutputs) ?? [];
}

export function getAIOutputsByProjectId(projectId: string): AIOutput[] {
  return getAIOutputs().filter((output) => output.projectId === projectId);
}

export function saveAIOutput(output: AIOutput): void {
  const current = getAIOutputs();
  writeStorage(KEYS.aiOutputs, [output, ...current.filter((item) => item.id !== output.id)]);
}

export function deleteAIOutput(id: string): void {
  writeStorage(
    KEYS.aiOutputs,
    getAIOutputs().filter((output) => output.id !== id)
  );
}

// ============================================================
// Téléchargement de fichier .md
// ============================================================
export function downloadMarkdown(filename: string, content: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
