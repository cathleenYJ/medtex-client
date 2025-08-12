import KeycloakProvider from "next-auth/providers/keycloak";
import type { Provider } from "next-auth/providers";
import type { Session } from "next-auth";

export const Keycloak: Provider = KeycloakProvider({
  id: "keycloak",
  name: "Keycloak",
  clientId: process.env.AUTH_KEYCLOAK_ID,
  clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
  issuer: process.env.AUTH_KEYCLOAK_ISSUER,
  profile: (profile) => {
    return {
      id: profile.sub || null,
      name: profile.name || null,
      email: profile.email || null,
      image: profile.picture || null,
      role: profile.role || null,
      role_id: profile.roleId || null,
      orgLogo: profile.orgLogo || null,
      orgName: profile.orgName || null,
    } as Session["user"];
  },
});
