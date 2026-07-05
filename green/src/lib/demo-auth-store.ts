import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { normalizeRole } from "@/lib/roles";
import type { UserRole } from "@/lib/types";

type DemoUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  image: string | null;
};

const storePath = path.join(process.cwd(), "data", "demo-users.json");

const builtinDemoUsers = [
  {
    id: "demo_entrepreneur",
    name: "Entrepreneur Demo",
    email: "demo@greenpattern.test",
    password: "demo123",
    role: "entrepreneur" as const,
    image: null
  },
  {
    id: "demo_expert",
    name: "Expert Demo",
    email: "expert@greenpattern.test",
    password: "expert123",
    role: "expert" as const,
    image: null
  },
  {
    id: "demo_admin",
    name: "Admin Demo",
    email: "admin@greenpattern.test",
    password: "admin123",
    role: "admin" as const,
    image: null
  }
];

async function readUsers(): Promise<DemoUser[]> {
  try {
    const content = await fs.readFile(storePath, "utf8");
    return (JSON.parse(content) as DemoUser[]).map((user) => ({
      ...user,
      role: normalizeRole(user.role)
    }));
  } catch {
    return [];
  }
}

async function writeUsers(users: DemoUser[]) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(users, null, 2), "utf8");
}

export async function createDemoUser(input: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  const users = await readUsers();
  const existing = users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());
  if (existing) {
    return { ok: false, message: "Un compte existe deja avec cet email." };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  users.push({
    id: `demo_${Date.now()}`,
    name: input.name,
    email: input.email,
    passwordHash,
    role: input.role,
    image: null
  });
  await writeUsers(users);
  return { ok: true, message: "Compte demo cree." };
}

export async function findDemoUserByCredentials(email: string, password: string) {
  const builtinUser = builtinDemoUsers.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (builtinUser && builtinUser.password === password) {
    return {
      id: builtinUser.id,
      name: builtinUser.name,
      email: builtinUser.email,
      passwordHash: "",
      role: builtinUser.role,
      image: builtinUser.image
    };
  }

  const users = await readUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  return user;
}

export async function findDemoUserById(id: string) {
  const builtinUser = builtinDemoUsers.find((item) => item.id === id);
  if (builtinUser) {
    return {
      id: builtinUser.id,
      name: builtinUser.name,
      email: builtinUser.email,
      passwordHash: "",
      role: builtinUser.role,
      image: builtinUser.image
    };
  }

  const users = await readUsers();
  return users.find((user) => user.id === id) ?? null;
}
