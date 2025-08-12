"use client";

import clsx from "clsx";
import { useState } from "react";
import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import type { SelectItem, SelectProps } from "@/types";

export const Combobox: React.FC<SelectProps> = ({
  items,
  value,
  onChange,
  className,
  optionsWidthAuto = false,
}) => {
  const [query, setQuery] = useState("");
  const filtered =
    query === ""
      ? items
      : items.filter(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase())
        );
  value = value || items[0];
  return (
    <HeadlessCombobox
      value={value}
      onChange={onChange}
      onClose={() => setQuery("")}
    >
      <div className={clsx("relative", className || "basis-full")}>
        <ComboboxInput
          className={clsx(
            "w-full block rounded-sm border border-black/40 focus:border-black bg-white/30 px-3 py-2 text-sm text-black text-left",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
          )}
          displayValue={(item: SelectItem) => item.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 text-black" />
        </ComboboxButton>
      </div>
      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          !optionsWidthAuto && "w-(--input-width)",
          "rounded-xl border border-black/5 bg-white/30 p-1 [--anchor-gap:--spacing(1)] empty:invisible backdrop-blur-lg",
          "transition duration-100 ease-in data-leave:data-closed:opacity-0",
          "z-50"
        )}
      >
        {filtered.map((item) => (
          <ComboboxOption
            key={item.id}
            value={item}
            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10 text-black"
          >
            <CheckIcon className="invisible size-4 group-data-selected:visible" />
            <div className="text-sm">{item.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </HeadlessCombobox>
  );
};
