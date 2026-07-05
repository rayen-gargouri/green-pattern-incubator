export type UserRole = "entrepreneur" | "expert" | "admin";
export type PrismaUserRole = "ENTREPRENEUR" | "MENTOR" | "ADMIN";
export type StepStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
};

export type Project = {
  id: string;
  name: string;
  slogan: string;
  category: string;
  shortDescription: string;
  problem: string;
  solution: string;
  targetAudience: string;
  location: string;
  stage: string;
  environmentalImpact: string;
  businessModel: string;
  needs: string;
  shortTermGoals: string;
  longTermGoals: string;
  progress: number;
  hasMentor: boolean;
};

export type Resource = {
  id: string;
  title: string;
  category: string;
  description: string;
  type: string;
  url: string;
  createdAt: string;
};
