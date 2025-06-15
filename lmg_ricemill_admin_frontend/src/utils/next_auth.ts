import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import { EAdminRoutes, EParamsDefault } from "@/enum/main_enum";
import { JWT } from "next-auth/jwt";
import Instance_ApiLocal from "@/api/api_local";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "user-credentials",
      name: "Credentials",
      credentials: {
        userId: { label: "User ID", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const loginApiCall = await Instance_ApiLocal.localLogin({
            username: credentials?.userId || EParamsDefault.emptystring,
            password: credentials?.password || EParamsDefault.emptystring,
          });
          if (
            loginApiCall.status !== EParamsDefault.succesStatusCode ||
            !loginApiCall?.data?.token
          ) {
            return null;
          }

          return {
            ...loginApiCall.data,
            id: loginApiCall?.data?.token,
          } as User;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret",
  pages: {
    signIn: EAdminRoutes.LOGIN,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token?.user) {
        session.user = token.user;
      }

      return session;
    },
  },
};

export default authOptions;
