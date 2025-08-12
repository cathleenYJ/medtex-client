"use client";

import * as z from "zod/v4";
import dynamic from "next/dynamic";
import { Control, Controller, FieldError } from "react-hook-form";
import { Input, Select, Combobox, FileUpload, Checkbox } from "@ui/form";
import type { FieldProps, InputArrayItem, SelectItem } from "@/types";
import { ObjectId } from "@/utils/objectid";

const InputArray = dynamic(
  () => import("@ui/form/input-array").then((mod) => mod.InputArray),
  { ssr: false }
);

export const FieldViews = <TSchema extends z.ZodObject<z.ZodRawShape>>({
  control,
  name,
  label,
  ...props
}: Exclude<FieldProps<TSchema>, "key"> & {
  control: Control<
    z.core.output<TSchema>,
    z.core.output<TSchema>,
    z.core.output<TSchema>
  >;
}) => {
  const transform = ("transform" in props && props.transform) || {
    input: (value) => value,
    output: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        switch (props.type) {
          case "checkbox":
            return (
              <Checkbox
                checked={Boolean(field.value)}
                onChange={field.onChange}
                error={error?.message}
              >
                {props.children}
              </Checkbox>
            );
          case "checkboxGroup":
            const current = (field.value as string[] | undefined) || [];
            if (!props.value) return <></>;
            return (
              <Checkbox
                label={label}
                checked={current.includes(props.value)}
                onChange={(checked) => {
                  return field.onChange(
                    checked
                      ? [...current, props.value]
                      : current.filter((v) => v !== props.value)
                  );
                }}
              >
                {props.children}
              </Checkbox>
            );
          case "select":
            return (
              <Select
                {...props}
                value={field.value as SelectItem}
                onChange={(e) => {
                  props.onChange && props.onChange(e);
                  field.onChange(e);
                }}
                items={props.items || []}
              />
            );
          case "combobox":
            return (
              <Combobox
                {...props}
                value={field.value as SelectItem}
                onChange={field.onChange}
                items={props.items || []}
              />
            );
          case "file":
            return (
              <FileUpload
                {...props}
                ref={field.ref}
                name={field.name}
                onChange={field.onChange}
                error={error?.message}
                current={field.value as File | undefined}
              />
            );
          case "inputArray":
            const values = field.value as InputArrayItem[];
            return (
              <InputArray
                {...props}
                addInput={() => {
                  field.onChange([...values, { id: ObjectId(), value: "" }]);
                }}
                delInput={(e: React.MouseEvent<HTMLButtonElement>) => {
                  field.onChange(
                    values.filter((v) => v.id !== e.currentTarget.dataset.id)
                  );
                }}
                onChange={(e) => {
                  field.onChange(
                    values.map((v) =>
                      v.id === e.target.dataset.id
                        ? { ...v, value: e.target.value }
                        : v
                    )
                  );
                }}
                values={values}
                errors={(error || []) as { value: FieldError }[]}
              />
            );
          default:
            return (
              <Input
                {...props}
                label={label}
                onChange={(e) => field.onChange(transform.output(e))}
                value={transform.input((field.value as string) || "")}
                error={error?.message}
              />
            );
        }
      }}
    />
  );
};
