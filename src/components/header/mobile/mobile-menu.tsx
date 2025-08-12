"use client";

import dynamic from "next/dynamic";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { NestMenu } from "@ui/nested-menu";
import { useIsPublic } from "@/hooks/use-is-public";
import type { MenuItemType } from "@/types";

const UserInfo = dynamic(
  () => import("@/components/auth/user-info").then((mod) => mod.UserInfo),
  { ssr: false }
);

export const MobileMenu: React.FC<{ items: MenuItemType[] }> = ({ items }) => {
  const isPublic = useIsPublic();
  return (
    <nav>
      <NestMenu
        className="sm:hidden inline-block"
        btn={
          <div className="w-6 h-6 cursor-pointer text-black ">
            <Bars3Icon />
          </div>
        }
        items={isPublic ? items : []}
        customElem={UserInfo}
      />
    </nav>
  );
};
