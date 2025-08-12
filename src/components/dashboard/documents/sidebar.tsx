"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Hr } from "@ui/splitter";
import { Routes } from "@/config/routes";

const items = [
  {
    name: "B2B Matchmaking Process Expo Face-to-Face Meeting Flow",
    href: Routes.documents.meetingFlow,
  },
  { name: "Terms and conditions", href: Routes.documents.terms },
  { name: "Privacy Policy", href: Routes.documents.privacy },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <aside className="py-8.5 px-4 bg-white rounded-xl flex flex-col gap-2.5 text-sm sticky top-0">
      {items.map((item, i) => {
        const isCurrent = item.href === pathname;
        const isLast = i === items.length - 1;
        return (
          <Fragment key={item.href}>
            <Link
              className={clsx(
                isCurrent && "font-semibold ps-5 border-s-2 border-b2b-lv3"
              )}
              href={item.href}
            >
              {item.name}
            </Link>
            {!isLast && <Hr className="border-t !border-gray-200 w-full" />}
          </Fragment>
        );
      })}
    </aside>
  );
};
