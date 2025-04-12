import { login, loginWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },

            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string }
                const user: any = await login({ email })
                if (user) {
                    const passwordConfirm = await compare(password, user.password)
                    if (passwordConfirm) {
                        return user
                    }
                    return null
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ], callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === "credentials") {
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            if (account?.provider === "google") {
                const data = {
                    email: profile?.email,
                    fullname: profile?.name,
                    role: "Member",
                    type: "google"
                }

                await loginWithGoogle(data, (result: {status: boolean, data: any}) => {
                    if (result.status) {
                        token.email = result.data.email;
                        token.fullname = result.data.fullname;
                        token.role = result.data.role;
                    }
                })
            }
            return token
        },

        async session({ session, token }: any) {
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("fullname" in token) {
                session.user.fullname = token.fullname;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }

            return session
        },

    },
    pages: {
        signIn: "/sign-in",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }