"use client";

import dynamic from "next/dynamic";

const AuthBtn = dynamic(
  () => import("@/components/auth/auth-btns").then((mod) => mod.AuthBtn),
  { ssr: false }
);

export const DesktopBtns: React.FC = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex items-end gap-6">
        <AuthBtn />
      </div>
    </div>
  );
};
