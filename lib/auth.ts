import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { getDb } from "./db";

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  password_hash: string | null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = getDb();

        const [rows] = await db.execute<UserRow[]>(
          "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1",
          [String(credentials.email).trim().toLowerCase()]
        );

        const user = rows[0];

        if (!user?.password_hash) return null;

        const valid = await bcrypt.compare(
          String(credentials.password),
          user.password_hash
        );

        if (!valid) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),

    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};

export const getSession = () => getServerSession(authOptions);