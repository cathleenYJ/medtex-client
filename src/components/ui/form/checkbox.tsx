import clsx from "clsx";
import { Checkbox as HeadlessCheckbox, Field, Label } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Validate } from "./validate";

export const Checkbox: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  error?: string;
}> = ({ label, checked, onChange, className, children, error }) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      {label && <div className="pb-1">{label}</div>}
      <Field className="flex items-center gap-2.5 text-xs sm:text-sm">
        <HeadlessCheckbox
          checked={checked}
          onChange={onChange}
          className="group size-4 rounded-xs ring-1 bg-white/30 ring-black/40 ring-inset focus:not-data-focus:outline-none data-checked:bg-white data-focus:outline data-focus:outline-offset-2 data-focus:outline-white shrink-0 cursor-pointer"
        >
          <CheckIcon className="hidden size-full fill-black group-data-checked:block" />
        </HeadlessCheckbox>
        <Label className="cursor-pointer select-none">{children}</Label>
      </Field>
      <Validate error={error} />
    </div>
  );
};
