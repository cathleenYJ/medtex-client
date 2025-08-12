import * as z from "zod/v4";
import type { Path } from "react-hook-form";

export type FormParams = { params: string[] };

export type SelectItem = { id: number | string; name: string };
export type SelectProps = {
  onChange: (e: unknown) => void;
  items: SelectItem[];
  className?: string;
  value?: SelectItem;
  optionsWidthAuto?: boolean;
};

export type ZodTransform = {
  input: (value: string | number | undefined) => string | number | undefined;
  output: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => string | number | undefined;
};

type FieldPropsBase<TSchema extends z.ZodObject<z.ZodRawShape>> = {
  name: Path<z.output<TSchema>>;
  label?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};
type FieldPropsCheckbox<TSchema extends z.ZodObject<z.ZodRawShape>> =
  FieldPropsBase<TSchema> & {
    type: "checkbox";
  };
type FieldPropsSelect<TSchema extends z.ZodObject<z.ZodRawShape>> =
  FieldPropsBase<TSchema> & {
    type: "select" | "combobox";
    items: SelectItem[];
    optionsWidthAuto?: boolean;
    onChange?: (e: unknown) => void;
  };
type FieldPropsCheckboxGroup<TSchema extends z.ZodObject<z.ZodRawShape>> =
  FieldPropsBase<TSchema> & {
    type: "checkboxGroup";
    value: string;
  };
type FieldPropsFile<TSchema extends z.ZodObject<z.ZodRawShape>> =
  FieldPropsBase<TSchema> & {
    type: "file";
    fileType: "image" | (string & {});
    placeholder?: string;
  };
type FieldPropsInput<TSchema extends z.ZodObject<z.ZodRawShape>> =
  FieldPropsBase<TSchema> & {
    type: "text" | "password" | "number" | "email" | "inputArray";
    placeholder?: string;
    transform?: ZodTransform;
  };
export type FieldProps<TSchema extends z.ZodObject<z.ZodRawShape>> =
  | FieldPropsInput<TSchema>
  | FieldPropsSelect<TSchema>
  | FieldPropsCheckbox<TSchema>
  | FieldPropsCheckboxGroup<TSchema>
  | FieldPropsFile<TSchema>;

export type FieldPropsWithKey<TSchema extends z.ZodObject<z.ZodRawShape>> =
  FieldProps<TSchema> & { key: string };

export type FieldsGroup<TSchema extends z.ZodObject<z.ZodRawShape>> = {
  label?: React.ReactNode;
  fields?: FieldProps<TSchema>[];
  className?: string;
  children?: React.ReactNode;
};

export type FieldsGroupWithKey<TSchema extends z.ZodObject<z.ZodRawShape>> = {
  label?: React.ReactNode;
  fields: FieldPropsWithKey<TSchema>[];
  className?: string;
  children?: React.ReactNode;
};

export type InputArrayItem = {
  id: string;
  value: string;
};
