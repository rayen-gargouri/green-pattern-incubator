"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { createDemoUser, findDemoUserByCredentials } from "@/lib/demo-auth-store";
import { isDatabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { normalizeRole, toPrismaRole } from "@/lib/roles";
import { getDashboardPathByRole } from "@/lib/routes";
import { loginSchema, registerSchema } from "@/lib/validations";

export type ActionState = {
  ok: boolean;
  message: string;
};

export async function registerUser(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: "Veuillez verifier les champs du formulaire." };
  }

  if (!isDatabaseConfigured()) {
    const created = await createDemoUser(parsed.data);
    if (!created.ok) return created;
    redirect("/auth?registered=demo");
  }

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) {
    return { ok: false, message: "Un compte existe deja avec cet email." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: toPrismaRole(parsed.data.role)
    }
  });

  redirect("/auth?registered=1");
}

export async function loginUser(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: "Veuillez verifier votre email et votre mot de passe." };
  }

  if (!isDatabaseConfigured()) {
    const user = await findDemoUserByCredentials(parsed.data.email, parsed.data.password);
    if (!user) {
      return { ok: false, message: "Compte demo introuvable ou mot de passe incorrect." };
    }

    const cookieStore = await cookies();
    cookieStore.set("green-demo-session", user.id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax"
    });
    redirect(getDashboardPathByRole(user.role));
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: parsed.data.email }
  });
  if (!dbUser?.passwordHash) {
    return { ok: false, message: "Email ou mot de passe incorrect." };
  }

  const valid = await bcrypt.compare(parsed.data.password, dbUser.passwordHash);
  if (!valid) {
    return { ok: false, message: "Email ou mot de passe incorrect." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: getDashboardPathByRole(normalizeRole(dbUser.role))
    });
  } catch (error) {
    if ((error as Error).message.includes("NEXT_REDIRECT")) throw error;
    return { ok: false, message: "Email ou mot de passe incorrect." };
  }

  return { ok: true, message: "Connexion reussie." };
}

export async function logoutUser() {
  if (!isDatabaseConfigured()) {
    const cookieStore = await cookies();
    cookieStore.delete("green-demo-session");
    redirect("/auth");
  }

  await signOut({ redirectTo: "/auth" });
}
