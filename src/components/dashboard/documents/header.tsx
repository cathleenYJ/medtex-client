"use client";

import { Routes } from "@/config/routes";
import { usePathname } from "next/navigation";

const headersData = {
  [Routes.documents.meetingFlow]: {
    documentType: "Documents & Guides",
    title: "Access all instructions, policies , and meeting flow documents.",
  },
  [Routes.documents.terms]: {
    documentType: "Documents & Guides",
    title: "Healthcare+ B2B Platform – Terms and Conditions ",
  },
  [Routes.documents.privacy]: {
    documentType: "Documents & Guides",
    title: "IBMI/RBMP Privacy Policy",
  },
};

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { documentType, title } = headersData[pathname];
  return (
    <div className="w-full px-4 sm:px-10 pt-11 pb-21">
      <div className="w-7xl max-w-full mx-auto">
        <div className="flex flex-col gap-3 w-3xl max-w-full">
          <div className="text-b2b-lv1 text-xl sm:text-3xl">{documentType}</div>
          <div className="text-5xl sm:text-8xl font-semibold text-white">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};
