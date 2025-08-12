import { auth } from "@lib/nextauth/auth";
import { Routes } from "@/config/routes";
import { NextAuthRequest } from "next-auth";

export default auth((req) => {
  if (process.env.NODE_ENV !== "development") {
    devProtect(req);
  }
  if (!req.auth) {
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    const loginUrl = new URL(Routes.auth.signIn, req.nextUrl.origin);
    if (
      Object.values(Routes.private).some((path) =>
        req.nextUrl.pathname.startsWith(path)
      )
    ) {
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
      return Response.redirect(loginUrl);
    }
  }
});

const devProtect = (req: NextAuthRequest) => {
  if (!req.auth) {
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    const loginUrl = new URL(Routes.auth.signIn, req.nextUrl.origin);
    if (
      !Object.values(Routes.auth).some((path) =>
        req.nextUrl.pathname.startsWith(path)
      )
    ) {
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
      return Response.redirect(loginUrl);
    }
  }
};
