import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { findDemoUserByCredentials } from "@/lib/demo-auth-store";
import { isDatabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { normalizeRole } from "@/lib/roles";
import { loginSchema } from "@/lib/validations";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: isDatabaseConfigured() ? PrismaAdapter(prisma) : undefined,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = normalizeRole(user.role);
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        if (!isDatabaseConfigured()) {
          const user = await findDemoUserByCredentials(parsed.data.email, parsed.data.password);
          if (!user) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role
          };
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email }
        });
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: normalizeRole(user.role)
        };
      }
    })
  ]
});
