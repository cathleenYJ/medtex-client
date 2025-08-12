"use client";

import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { NestMenu } from "@ui/nested-menu";
import { Splitter } from "@ui/splitter";
import { useIsPublic } from "@/hooks/use-is-public";
import type { MenuItemType } from "@/types";

export const DesktopMenu: React.FC<{ items: MenuItemType[] }> = ({ items }) => {
  const isPublic = useIsPublic();

  return (
    isPublic && (
      <nav className="hidden sm:flex sm:flex-wrap">
        {items.map((item, i) => (
          <Fragment key={item.key}>
            <NestMenu
              items={item.items || []}
              btn={
                <>
                  <span className="text-white/80">{item.label}</span>
                  <ChevronDownIcon className="size-4 text-white/80" />
                </>
              }
            />
            {i !== items.length - 1 && (
              <Splitter className="mx-7.5 md:mx-12.5" />
            )}
          </Fragment>
        ))}
      </nav>
    )
  );
};
