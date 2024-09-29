import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import prisma from "@/prisma/index";
import bcrypt from "bcrypt";

interface User {
    role?: string;
    id: string;
    name: string;
    email: string;
    password: string;
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Your email" },
                password: { label: "Password", type: "password", placeholder: "Your password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const { email, password } = credentials;
                
                const user: User | null = await prisma.user.findUnique({
                    where: { email }
                });

                if (user && await bcrypt.compare(password, user.password)) {
                    return { ...user, role: user.role || 'user' };
                }
                return null;
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: any }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
