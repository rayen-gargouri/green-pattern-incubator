import { normalizeRole } from "@/lib/roles";
import type { UserRole } from "@/lib/types";

export function getDashboardPathByRole(role: UserRole | string): string {
  const normalized = normalizeRole(role);

  if (normalized === "entrepreneur") return "/dashboard";
  if (normalized === "expert") return "/expert/dashboard";
  if (normalized === "admin") return "/admin/dashboard";

  return "/dashboard";
}

export const authPath = "/auth";
