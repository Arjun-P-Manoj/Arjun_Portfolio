import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(1)
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        let user = await prisma.user.findUnique({
          where: { email: parsed.data.email }
        });

        // Bootstrap admin account from .env on first login.
        if (!user && adminEmail && adminPassword && parsed.data.email === adminEmail) {
          const hashed = await bcrypt.hash(adminPassword, 12);
          user = await prisma.user.create({
            data: {
              email: adminEmail,
              password: hashed,
              name: "Admin",
              role: "ADMIN"
            }
          });
        }

        if (!user) return null;

        const isMatch = await bcrypt.compare(parsed.data.password, user.password);
        if (!isMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isAdminRoute = pathname.startsWith("/admin");
      const isLogin = pathname === "/admin/login";

      if (!isAdminRoute) return true;
      if (isLogin) return true;

      return auth?.user?.role === "ADMIN";
    }
  }
});
