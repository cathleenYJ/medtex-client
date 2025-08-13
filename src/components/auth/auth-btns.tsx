"use client";

import { usePathname } from "next/navigation";
import { Button } from "@ui/button";
import { NestMenu } from "@ui/nested-menu";
import { useAuthBtn } from "@/hooks/use-auth-btn";
import { UserIcon } from "@heroicons/react/24/outline";
import { Routes } from "@/config/routes";
import { UserInfo } from "./user-info";

export const AuthBtn: React.FC = () => {
  const { loading, login, authItem } = useAuthBtn();
  const pathname = usePathname();
  if (Object.values(Routes.auth).some((path) => pathname.startsWith(path)))
    return null;
  if (loading) return null;
  return login ? (
    <NestMenu
      btn={<UserIcon className="size-6 text-black" />}
      customElem={UserInfo}
    />
  ) : (
    <Button
      key={authItem.key}
      // className="px-6 py-3 bg-b2b-lv4 text-b2b-lv1 rounded-sm text-sm"
      onClick={authItem.onClick}
    >
      {authItem.label}
    </Button>
  );
};
