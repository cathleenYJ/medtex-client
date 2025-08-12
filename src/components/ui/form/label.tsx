import clsx from "clsx";
import React from "react";
import { Field, Label as HeadlessLabel } from "@headlessui/react";
import { Validate } from "./validate";

export const Label: React.FC<{
  label: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  error?: string;
}> = ({ label, className, children, error }) => (
  <Field
    className={clsx(
      className || "basis-full",
      "flex flex-col gap-0.5 justify-end"
    )}
  >
    <HeadlessLabel className="text-sm font-medium">{label}</HeadlessLabel>
    <div data-labels className="flex gap-3">
      {children}
    </div>
    <Validate error={error} />
  </Field>
);
