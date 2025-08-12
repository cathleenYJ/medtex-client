"use client";

import clsx from "clsx";
import { forwardRef, useState } from "react";
import { Button, Input as HeadlessInput } from "@headlessui/react";
import { EyeClosed } from "@icons";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Validate } from "./validate";

type Props = {
  children?: React.ReactNode;
  error?: string;
  label?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLElement, Props>(
  ({ className, children, label, type, error, ...props }, ref) => {
    const [hide, setHide] = useState<boolean>(type === "password");
    const displayPass = () => setHide((prev) => !prev);
    return (
      <div className={clsx(className || "basis-full")}>
        {label && <div className="pb-1 text-sm font-medium">{label}</div>}
        <div className="relative">
          <HeadlessInput
            {...props}
            ref={ref}
            type={hide ? type : "text"}
            className={clsx(
              "block w-full rounded-sm border border-black/40 focus:border-black bg-white/30 px-3 py-2 text-sm text-black",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            )}
          />
          {type === "password" && (
            <Button
              className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 size-6 z-10 text-black"
              onClick={displayPass}
            >
              {hide ? (
                <EyeClosed className="size-full" />
              ) : (
                <EyeIcon className="size-full" />
              )}
            </Button>
          )}
          <Validate error={error} />
        </div>
        {children && (
          <div className="flex justify-end text-sm black/60">
            {children}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
