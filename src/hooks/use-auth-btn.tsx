"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Routes } from "@/config/routes";
import type { Session } from "next-auth";
import type { MenuItemType } from "@/types";

export const useAuthBtn = (): {
  loading: boolean;
  login: boolean;
  user?: Session["user"];
  authItem: MenuItemType;
} => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const signoutItem = {
    key: Routes.auth.signOut,
    label: "Logout",
    onClick: () => signOut({ callbackUrl: Routes.auth.signIn }),
  };
  const signinItem = {
    key: Routes.auth.signIn,
    label: "Login",
    onClick: () => {
      const url = new URL(Routes.auth.signIn, window.location.origin);
      url.searchParams.set("callbackUrl", window.location.pathname);
      router.push(url.toString());
    },
  };
  return {
    loading: status === "loading",
    login: !!session,
    user: session?.user,
    authItem: session ? signoutItem : signinItem,
  };
};
