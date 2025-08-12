import NextAuth, { Session } from "next-auth";
import type { Provider } from "next-auth/providers";
import { Routes } from "@/config/routes";
import { Keycloak } from "./providers/keycloak";
import { Dearsoft } from "./providers/dearsoft";
import { CredentialsProvider as Credentials } from "./providers/credentials";

const providers: Provider[] = [Keycloak, Dearsoft, Credentials];

export const providerMap = providers
  .map((provider) => {
    const { id, name } = typeof provider === "function" ? provider() : provider;
    return { id, name };
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = account.expires_at;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        access_token: token.access_token,
        id_token: token.id_token,
        user: token.user as Session["user"],
      };
    },
    authorized: async ({ auth }) => !!auth,
  },
  pages: {
    signIn: Routes.auth.signIn,
    signOut: Routes.auth.signOut,
  },
});
