import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const adminEmail = process.env.CMS_ADMIN_EMAIL;
const adminPassword = process.env.CMS_ADMIN_PASSWORD;
const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.trim();
      const password = credentials?.password?.trim();

      if (!email || !password) return null;
      if (!adminEmail || !adminPassword) return null;
      if (email !== adminEmail || password !== adminPassword) return null;

      return {
        id: "admin",
        name: "Admin",
        email,
      };
    },
  }),
];

export const authOptions: NextAuthOptions = {
  providers,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
};
