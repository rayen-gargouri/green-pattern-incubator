import type { CurrentUser, PrismaUserRole, UserRole } from "@/lib/types";

export function normalizeRole(role?: string | null): UserRole {
  if (role === "admin" || role === "ADMIN") return "admin";
  if (role === "expert" || role === "MENTOR") return "expert";
  return "entrepreneur";
}

export function toPrismaRole(role: UserRole): PrismaUserRole {
  if (role === "admin") return "ADMIN";
  if (role === "expert") return "MENTOR";
  return "ENTREPRENEUR";
}

export function getRoleLabel(role: UserRole) {
  if (role === "admin") return "Administrateur";
  if (role === "expert") return "Expert";
  return "Entrepreneur";
}

export function isEntrepreneurRole(role?: string | null) {
  return normalizeRole(role) === "entrepreneur";
}

export function isExpertRole(role?: string | null) {
  return normalizeRole(role) === "expert";
}

export function isAdminRole(role?: string | null) {
  return normalizeRole(role) === "admin";
}

export function hasRole(user: CurrentUser | null, role: UserRole) {
  return user?.role === role;
}
