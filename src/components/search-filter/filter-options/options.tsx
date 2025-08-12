"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ToggleBox } from "@ui/toggle-box";
import { Hr } from "@ui/splitter";
import { useRem } from "@/hooks/use-rem";
import type { FilterOptionType } from "@/types";
import { CheckboxGroups } from "./checkbox-groups";

export const Options: React.FC<{ filterOptions: FilterOptionType }> = ({
  filterOptions,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { px, elem } = useRem(64);
  const defaultState = () => setOpen(window.innerWidth >= px);
  useEffect(() => {
    if (px === 0) return;
    const controller = new AbortController();
    window.addEventListener("resize", defaultState, {
      signal: controller.signal,
    });
    defaultState();
    return () => controller.abort();
  }, [px]);
  return (
    <>
      {elem}
      <div
        className="text-white text-xl font-medium sticky top-0 z-10 bg-inherit cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FilterOptionsTitle open={open} />
      </div>
      <ToggleBox className="gap-3 md:gap-6 flex flex-col" open={open}>
        <CheckboxGroups filterOptions={filterOptions} />
      </ToggleBox>
    </>
  );
};

const FilterOptionsTitle: React.FC<{ open: boolean }> = ({ open }) => (
  <>
    <div className="flex justify-between items-center">
      <div>Filter Option</div>
      <div className="size-6 bg-white/6 rounded-sm md:hidden">
        <ChevronDownIcon
          className={clsx(
            "transition-transform duration-400",
            open && "rotate-180"
          )}
        />
      </div>
    </div>
    <Hr
      className={clsx(
        "transition-all duration-400",
        open ? "my-3 md:my-6" : "opacity-0 my-0"
      )}
    />
  </>
);
