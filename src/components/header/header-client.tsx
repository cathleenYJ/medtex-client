"use client";

import { Suspense } from "react";
import { Spinner } from "@ui/loading";
import { DesktopBtns } from "./desktop/desktop-btns";
import { DashboardLogo } from "../icons/dashboard-logo";

interface HeaderClientProps {
  mobileMenuSlot: React.ReactNode;
  desktopMenuSlot: React.ReactNode;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ 
  mobileMenuSlot, 
  desktopMenuSlot 
}) => {
  return (
    <header className="bg-white flex flex-col gap-1 py-3 px-5 sm:px-5 absolute z-10 top-0 w-full backdrop-blur-lg sm:backdrop-blur-none">
      <div className="flex justify-between items-center relative">
        <div className="sm:block w-full max-w-[180px] mb-2">
          <DashboardLogo className="w-full h-auto" />
        </div>
        <Suspense
          fallback={<Spinner className="border-white sm:border-transparent" />}
        >
          {mobileMenuSlot}
        </Suspense>
        <DesktopBtns />
      </div>
      <Suspense
        fallback={<Spinner className="border-transparent sm:border-white" />}
      >
        {desktopMenuSlot}
      </Suspense>
    </header>
  );
};
