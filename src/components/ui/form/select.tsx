import clsx from "clsx";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import type { SelectProps } from "@/types";

export const Select: React.FC<SelectProps> = ({
  items,
  value,
  onChange,
  className,
  optionsWidthAuto = false,
}) => {
  value = value || items[0];
  return (
    <Listbox value={value} onChange={onChange}>
      <ListboxButton
        className={clsx(
          className || "basis-full",
          "relative w-full block rounded-sm border border-black/40 bg-white/30 ps-3 pe-6 py-2 text-sm text-black text-left",
          "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
        )}
      >
        {value.name}
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-1 size-4 text-black/60"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          !optionsWidthAuto && "w-(--button-width)",
          "rounded-xl border border-black/40 bg-white/30 p-1 [--anchor-gap:--spacing(1)] focus:outline-none backdrop-blur-lg",
          "transition duration-100 ease-in data-leave:data-closed:opacity-0",
          "z-50"
        )}
      >
        {items &&
          items.map((item) => (
            <ListboxOption
              key={item.name}
              value={item}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10 text-black"
            >
              <CheckIcon className="invisible size-4 group-data-selected:visible" />
              <div className="text-sm">{item.name}</div>
            </ListboxOption>
          ))}
      </ListboxOptions>
    </Listbox>
  );
};
