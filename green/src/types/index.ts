// ============================================================
// Green Pattern Incubator — Types TypeScript complets
// Prêts pour migration vers Supabase/PostgreSQL
// ============================================================

// --- Rôles utilisateur ---
export type UserRole = "entrepreneur" | "expert" | "admin";
export type PrismaUserRole = "ENTREPRENEUR" | "MENTOR" | "ADMIN";

// --- Statuts d'étapes ---
export type StepStatus = "not_started" | "in_progress" | "done";

// --- Statuts de documents ---
export type DocumentStatus = "draft" | "completed" | "exported";

// --- Types de documents ---
export type DocumentType =
  | "project_idea"
  | "business_model_canvas"
  | "swot_analysis"
  | "action_plan"
  | "pitch"
  | "business_plan"
  | "environmental_impact";

// ============================================================
// Modèle Utilisateur
// Table: users
// ============================================================
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  image?: string | null;
};

// Version simplifiée pour la session courante
export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
};

// ============================================================
// Modèle Projet
// Table: projects
// ============================================================
export type ProjectNeeds =
  | "financement"
  | "mentorat"
  | "étude de marché"
  | "business plan"
  | "marketing"
  | "partenariats"
  | "accompagnement technique";

export type Project = {
  id: string;
  userId?: string;
  // Informations générales
  name: string;
  slogan: string;
  category: string;
  shortDescription: string;
  // Analyse du problème et solution
  problem: string;
  solution: string;
  targetAudience: string;
  location: string;
  // Niveau et objectifs
  stage: string;
  environmentalImpact: string;
  businessModel: string;
  needs: string;
  shortTermGoals: string;
  longTermGoals: string;
  // Champs MVP demandés
  sector?: string;
  objectives?: string;
  availableResources?: string;
  advancementLevel?: string;
  selectedNeeds?: ProjectNeeds[];
  // Progression
  progress: number;
  hasMentor: boolean;
  // Métadonnées
  createdAt?: string;
  updatedAt?: string;
};

// ============================================================
// Modèle Étape du parcours
// Table: steps
// ============================================================
export type Step = {
  id: string;
  projectId?: string;
  order: number;
  title: string;
  description: string;
  tasks: string[];
  status: StepStatus;
  updatedAt?: string;
};

// ============================================================
// Modèle Business Model Canvas
// Table: bmc_data
// ============================================================
export type BMCData = {
  id?: string;
  projectId?: string;
  valueProposition: string;       // Proposition de valeur
  customerSegments: string;       // Segments clients
  channels: string;               // Canaux de distribution
  customerRelationships: string;  // Relation client
  revenueStreams: string;         // Sources de revenus
  keyResources: string;           // Ressources clés
  keyActivities: string;          // Activités clés
  keyPartners: string;            // Partenaires clés
  costStructure: string;          // Structure des coûts
  updatedAt?: string;
};

// ============================================================
// Modèle Ressource
// Table: resources
// ============================================================
export type Resource = {
  id: string;
  title: string;
  category: string;
  description: string;
  content?: string;
  type: string;
  url: string;
  createdAt: string;
};

// ============================================================
// Modèle Document
// Table: documents
// ============================================================
export type Document = {
  id: string;
  projectId?: string;
  type: DocumentType;
  title: string;
  description: string;
  content?: string;
  status: DocumentStatus;
  createdAt?: string;
  updatedAt?: string;
};

// ============================================================
// Types utilitaires pour les formulaires
// ============================================================
export type ProjectFormData = Omit<Project, "id" | "userId" | "progress" | "hasMentor" | "createdAt" | "updatedAt">;

export type BMCFormData = Omit<BMCData, "id" | "projectId" | "updatedAt">;

// ============================================================
// Types pour l'IA (préparation future)
// ============================================================
export type AIAction =
  | "analyze-project"
  | "generate-business-model"
  | "generate-swot"
  | "generate-pitch"
  | "analyze-impact"
  | "generate-action-plan";

export type AIResponse = {
  action: AIAction;
  result?: string;
  available: boolean;
  message: string;
  version?: string;
};

export type AIOutputType =
  | "diagnostic"
  | "recommendations"
  | "swot"
  | "pitch"
  | "business-plan"
  | "bmc-review"
  | "next-steps";

export type AIOutput = {
  id: string;
  userId: string;
  projectId: string;
  type: AIOutputType;
  content: unknown;
  createdAt: string;
};
