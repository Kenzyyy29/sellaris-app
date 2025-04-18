import { login } from "@/lib/firebase/service";
import { compare } from "bcrypt"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// api/auth/[...nextauth]/route.ts
const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 hari
        updateAge: 24 * 60 * 60, // Update session setiap 24 jam
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email dan password diperlukan");
                }

                const user: any = await login({ email: credentials.email });
                if (!user) {
                    throw new Error("User tidak ditemukan");
                }

                const passwordMatch = await compare(credentials.password, user.password);
                if (!passwordMatch) {
                    throw new Error("Password salah");
                }

                return {
                    id: user.id,
                    email: user.email,
                    fullname: user.fullname,
                    role: user.role
                };
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.fullname = user.fullname;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.fullname = token.fullname;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Handle redirect setelah sign in
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            return url.startsWith(baseUrl) ? url : baseUrl;
        }
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60, // 30 hari
            },
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/sign-in", // Halaman error untuk auth
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }