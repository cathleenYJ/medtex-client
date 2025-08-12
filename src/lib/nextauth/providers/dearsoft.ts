import { Profile, Session } from "next-auth";
import type { OIDCConfig } from "next-auth/providers";

export const Dearsoft: OIDCConfig<Profile> = {
  id: "dearsoft",
  name: "Dearsoft",
  type: "oidc",
  issuer: process.env.AUTH_DEARSOFT_ISSUER,
  clientId: process.env.AUTH_DEARSOFT_ID,
  clientSecret: process.env.AUTH_DEARSOFT_SECRET,
  authorization: {
    url: `${process.env.AUTH_DEARSOFT_ISSUER}/oidc/auth`,
    params: { scope: "openid profile email" },
  },
  token: `${process.env.AUTH_DEARSOFT_ISSUER}/oidc/token`,
  userinfo: `${process.env.AUTH_DEARSOFT_ISSUER}/oidc/me`,
  wellKnown: `${process.env.AUTH_DEARSOFT_ISSUER}/oidc/.well-known/openid-configuration`,
  idToken: true,
  profile: (profile) => {
    return {
      id: profile.userId || null,
      name: profile.name || null,
      email: profile.email || null,
      image: profile.picture || null,
      role: profile.role || null,
      role_id: profile.roleId || null,
      orgLogo: profile.orgLogo || null,
      orgName: profile.orgName || null,
    } as Session["user"];
  },
};
