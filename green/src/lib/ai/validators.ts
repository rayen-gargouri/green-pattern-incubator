import type { BMCData, Document, Project, Step } from "@/types";
import type { AIPitchAudience, AIPitchDuration, AIRequestPayload } from "./ai-types";

const MAX_TEXT_LENGTH = 2500;
const MAX_SHORT_TEXT_LENGTH = 180;

type UnknownRecord = Record<string, unknown>;

const emptyBMC: BMCData = {
  valueProposition: "",
  customerSegments: "",
  channels: "",
  customerRelationships: "",
  revenueStreams: "",
  keyResources: "",
  keyActivities: "",
  keyPartners: "",
  costStructure: ""
};

export class ValidationError extends Error {
  status = 400;

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(source: UnknownRecord, key: string, max = MAX_TEXT_LENGTH): string {
  const value = source[key];
  if (typeof value !== "string") return "";
  return sanitizeText(value, max);
}

function readBoolean(source: UnknownRecord, key: string): boolean {
  return Boolean(source[key]);
}

function readNumber(source: UnknownRecord, key: string, min = 0, max = 100): number {
  const value = source[key];
  const numeric = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return Math.min(max, Math.max(min, Math.round(numeric)));
}

function readStringArray(value: unknown, maxItems = 12): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => sanitizeText(item, MAX_SHORT_TEXT_LENGTH))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function sanitizeText(value: string, maxLength = MAX_TEXT_LENGTH): string {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function toProject(raw: unknown): Project {
  if (!isRecord(raw)) {
    throw new ValidationError("Projet manquant ou invalide.");
  }

  const selectedNeeds = readStringArray(raw.selectedNeeds, 10);
  const sector = readString(raw, "sector", MAX_SHORT_TEXT_LENGTH) || readString(raw, "category", MAX_SHORT_TEXT_LENGTH);
  const stage =
    readString(raw, "advancementLevel", MAX_SHORT_TEXT_LENGTH) ||
    readString(raw, "stage", MAX_SHORT_TEXT_LENGTH) ||
    "Idée initiale";
  const objectives = readString(raw, "objectives") || readString(raw, "shortTermGoals");
  const shortDescription = readString(raw, "shortDescription") || readString(raw, "slogan");
  const needs = readString(raw, "needs") || selectedNeeds.join(", ");

  const project: Project = {
    id: readString(raw, "id", MAX_SHORT_TEXT_LENGTH) || `project_${Date.now()}`,
    userId: readString(raw, "userId", MAX_SHORT_TEXT_LENGTH) || undefined,
    name: readString(raw, "name", MAX_SHORT_TEXT_LENGTH) || "Projet vert",
    slogan: readString(raw, "slogan", MAX_SHORT_TEXT_LENGTH) || shortDescription,
    category: sector,
    sector,
    shortDescription,
    problem: readString(raw, "problem"),
    solution: readString(raw, "solution"),
    targetAudience: readString(raw, "targetAudience"),
    location: readString(raw, "location", MAX_SHORT_TEXT_LENGTH),
    stage,
    advancementLevel: stage,
    environmentalImpact: readString(raw, "environmentalImpact"),
    businessModel: readString(raw, "businessModel"),
    needs,
    selectedNeeds: selectedNeeds as Project["selectedNeeds"],
    objectives,
    availableResources: readString(raw, "availableResources"),
    shortTermGoals: objectives,
    longTermGoals: readString(raw, "longTermGoals"),
    progress: readNumber(raw, "progress"),
    hasMentor: readBoolean(raw, "hasMentor"),
    createdAt: readString(raw, "createdAt", MAX_SHORT_TEXT_LENGTH) || undefined,
    updatedAt: readString(raw, "updatedAt", MAX_SHORT_TEXT_LENGTH) || undefined
  };

  const usefulContent = [project.name, project.problem, project.solution, project.targetAudience].some(
    (item) => item.trim().length > 2
  );

  if (!usefulContent) {
    throw new ValidationError("Le projet doit contenir au moins un nom, un problème, une solution ou une cible.");
  }

  return project;
}

function toBMC(raw: unknown): BMCData | undefined {
  if (!isRecord(raw)) return undefined;

  return {
    id: readString(raw, "id", MAX_SHORT_TEXT_LENGTH) || undefined,
    projectId: readString(raw, "projectId", MAX_SHORT_TEXT_LENGTH) || undefined,
    valueProposition: readString(raw, "valueProposition"),
    customerSegments: readString(raw, "customerSegments"),
    channels: readString(raw, "channels"),
    customerRelationships: readString(raw, "customerRelationships"),
    revenueStreams: readString(raw, "revenueStreams"),
    keyResources: readString(raw, "keyResources"),
    keyActivities: readString(raw, "keyActivities"),
    keyPartners: readString(raw, "keyPartners"),
    costStructure: readString(raw, "costStructure"),
    updatedAt: readString(raw, "updatedAt", MAX_SHORT_TEXT_LENGTH) || undefined
  };
}

function toSteps(raw: unknown): Step[] | undefined {
  if (!Array.isArray(raw)) return undefined;

  return raw
    .filter(isRecord)
    .slice(0, 20)
    .map((step, index) => ({
      id: readString(step, "id", MAX_SHORT_TEXT_LENGTH) || `step_${index + 1}`,
      projectId: readString(step, "projectId", MAX_SHORT_TEXT_LENGTH) || undefined,
      order: readNumber(step, "order", 0, 100) || index + 1,
      title: readString(step, "title", MAX_SHORT_TEXT_LENGTH),
      description: readString(step, "description"),
      tasks: readStringArray(step.tasks, 12),
      status:
        readString(step, "status", MAX_SHORT_TEXT_LENGTH) === "done"
          ? "done"
          : readString(step, "status", MAX_SHORT_TEXT_LENGTH) === "in_progress"
          ? "in_progress"
          : "not_started",
      updatedAt: readString(step, "updatedAt", MAX_SHORT_TEXT_LENGTH) || undefined
    }));
}

function toDocuments(raw: unknown): Document[] | undefined {
  if (!Array.isArray(raw)) return undefined;

  return raw
    .filter(isRecord)
    .slice(0, 30)
    .map((doc, index) => ({
      id: readString(doc, "id", MAX_SHORT_TEXT_LENGTH) || `doc_${index + 1}`,
      projectId: readString(doc, "projectId", MAX_SHORT_TEXT_LENGTH) || undefined,
      type: (readString(doc, "type", MAX_SHORT_TEXT_LENGTH) || "project_idea") as Document["type"],
      title: readString(doc, "title", MAX_SHORT_TEXT_LENGTH),
      description: readString(doc, "description"),
      content: readString(doc, "content") || undefined,
      status:
        readString(doc, "status", MAX_SHORT_TEXT_LENGTH) === "completed"
          ? "completed"
          : readString(doc, "status", MAX_SHORT_TEXT_LENGTH) === "exported"
          ? "exported"
          : "draft",
      createdAt: readString(doc, "createdAt", MAX_SHORT_TEXT_LENGTH) || undefined,
      updatedAt: readString(doc, "updatedAt", MAX_SHORT_TEXT_LENGTH) || undefined
    }));
}

function readPitchDuration(value: unknown): AIPitchDuration {
  return value === "30s" || value === "1min" || value === "3min" ? value : "1min";
}

function readPitchAudience(value: unknown): AIPitchAudience {
  return value === "jury" || value === "investisseurs" || value === "mentors" || value === "incubateur"
    ? value
    : "incubateur";
}

export function validateAIRequest(body: unknown): AIRequestPayload {
  if (!isRecord(body)) {
    throw new ValidationError("Corps de requête invalide.");
  }

  return {
    project: toProject(body.project),
    bmc: toBMC(body.bmc) ?? emptyBMC,
    steps: toSteps(body.steps),
    documents: toDocuments(body.documents),
    feedbacks: readStringArray(body.feedbacks, 10),
    userId: readString(body, "userId", MAX_SHORT_TEXT_LENGTH) || undefined
  };
}

export function validatePitchAIRequest(body: unknown): AIRequestPayload {
  const payload = validateAIRequest(body);
  const record = isRecord(body) ? body : {};

  return {
    ...payload,
    pitchDuration: readPitchDuration(record.duration ?? record.pitchDuration),
    pitchAudience: readPitchAudience(record.audience ?? record.pitchAudience)
  };
}
