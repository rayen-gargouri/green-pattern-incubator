import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { findDemoUserById } from "@/lib/demo-auth-store";
import { isDatabaseConfigured } from "@/lib/env";
import { normalizeRole } from "@/lib/roles";
import { authPath, getDashboardPathByRole } from "@/lib/routes";
import type { CurrentUser, UserRole } from "@/lib/types";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isDatabaseConfigured()) {
    const cookieStore = await cookies();
    const demoUserId = cookieStore.get("green-demo-session")?.value;
    if (!demoUserId) return null;

    const user = await findDemoUserById(demoUserId);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: normalizeRole(user.role),
      image: user.image
    };
  }

  const session = await auth();
  if (!session?.user?.email) return null;

  return {
    id: session.user.id,
    name: session.user.name ?? "Utilisateur",
    email: session.user.email,
    role: normalizeRole(session.user.role),
    image: session.user.image
  };
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect(authPath);
  return user;
}

export async function requireRole(role: UserRole) {
  const user = await requireAuth();
  if (user.role !== role) {
    redirect(getDashboardPathByRole(user.role));
  }
  return user;
}

export async function redirectByRole() {
  const user = await requireAuth();
  redirect(getDashboardPathByRole(user.role));
}

export async function isEntrepreneur() {
  return (await getCurrentUser())?.role === "entrepreneur";
}

export async function isExpert() {
  return (await getCurrentUser())?.role === "expert";
}

export async function isAdmin() {
  return (await getCurrentUser())?.role === "admin";
}

export { getDashboardPathByRole } from "@/lib/routes";
