import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { getDashboardPathByRole } from "@/lib/routes";
import { normalizeRole } from "@/lib/roles";
import type { UserRole } from "@/lib/types";

export async function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: UserRole[] }) {
  const user = await requireAuth();
  if (roles?.length && !roles.includes(user.role)) redirect(getDashboardPathByRole(normalizeRole(user.role)));
  return children;
}
