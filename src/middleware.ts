import { auth } from "@lib/nextauth/auth";
import { privileges } from "@/utils/privileges";
import { Routes } from "@/config/routes";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isPrivated = Object.values(Routes.private).some((path) =>
    pathname.startsWith(path)
  );

  if (!req.auth) {
    const callbackUrl = `${pathname}${req.nextUrl.search}`;
    const loginUrl = new URL(Routes.auth.signIn, req.nextUrl.origin);
    if (isPrivated) {
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
      return Response.redirect(loginUrl);
    }
  } else {
    if (isPrivated) {
      const adminUrl = new URL(Routes.private.registrationRecord, req.nextUrl.origin);
      const hasPrivilege = privileges(req.auth.user.role_id, pathname);
      if (!hasPrivilege) {
        return Response.redirect(adminUrl);
      }
    }
  }
});
