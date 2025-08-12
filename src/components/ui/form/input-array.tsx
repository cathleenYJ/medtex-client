"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { FieldError } from "react-hook-form";
import { Input } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@ui/button";
import type { InputArrayItem } from "@/types";
import { Validate } from "./validate";

export const InputArray: React.FC<
  {
    addInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
    delInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
    errors: { value: FieldError }[];
    values: InputArrayItem[];
  } & React.ComponentPropsWithoutRef<"input">
> = ({
  className,
  onChange,
  values,
  errors,
  type,
  addInput,
  delInput,
  ...props
}) => {
  return (
    <div
      className={clsx(className || "basis-full", "flex flex-col gap-3")}
      data-type={type}
    >
      {values.map(({ id, value }, i) => (
        <div key={id} className="relative">
          <InputField
            objectId={id}
            data-id={id}
            addInput={addInput}
            delInput={delInput}
            onChange={onChange}
            value={value}
            last={i === values.length - 1}
            {...props}
          />
          {errors[i] && <Validate error={errors[i]?.value?.message} />}
        </div>
      ))}
    </div>
  );
};

const InputField: React.FC<
  {
    objectId: string;
    addInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
    delInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
    last: boolean;
  } & React.ComponentPropsWithoutRef<"input">
> = ({ objectId, addInput, delInput, last, ...props }) => {
  const item = useMemo(() => {
    return last
      ? {
          onClick: addInput,
          icon: <PlusIcon className="size-full" />,
        }
      : {
          onClick: delInput,
          icon: <MinusIcon className="size-full" />,
        };
  }, [last, addInput, delInput]);
  return (
    <div className="flex gap-3">
      <Input
        className={clsx(
          "block w-full px-3 py-2 text-sm rounded-sm border border-black/40 focus:border-black bg-white text-black",
          "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
        )}
        {...props}
      />
      <Button
        data-id={objectId}
        onClick={item.onClick}
        className="size-12 rounded-sm border-none bg-black text-white p-2 "
      >
        {item.icon}
      </Button>
    </div>
  );
};
