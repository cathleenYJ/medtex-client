"use client";

import clsx from "clsx";
import { Fragment, useMemo } from "react";
import * as z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Control,
  DefaultValues,
  Resolver,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { Fields, Fieldset, FieldViews, Label } from "@ui/form";
import { ObjectId } from "@/utils/objectid";
import type { FieldsGroup, FieldsGroupWithKey } from "@/types";

export const Form = <TSchema extends z.ZodObject<z.ZodRawShape>>({
  schema,
  onSubmit,
  fieldsGroups,
  id,
  className,
  header,
  children,
  defaultValues,
}: {
  schema: TSchema;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  fieldsGroups: FieldsGroup<TSchema>[];
  id?: string;
  className?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  defaultValues?: DefaultValues<z.output<TSchema>>;
  setDisabled?: (disabled: boolean) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema) as Resolver<
      z.core.output<TSchema>,
      z.core.output<TSchema>,
      z.core.output<TSchema>
    >,
    defaultValues: {
      ...(getDefaults(schema) as DefaultValues<z.output<TSchema>>),
      ...defaultValues,
    },
    mode: "all",
  });
  const renderFieldsGroups = useMemo(() => {
    return fieldsGroups.map((group) => ({
      ...group,
      key: ObjectId(),
      fields: (group.fields || []).map((field) => ({
        ...field,
        key: ObjectId(),
      })),
    }));
  }, [fieldsGroups]);

  return (
    <form
      id={id}
      data-error={!isValid}
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "flex flex-col gap-10 text-black",
        className,
        !isValid &&
          "[&_button[type=submit]]:!opacity-50 [&_button[type=submit]]:!cursor-not-allowed"
      )}
    >
      <Fieldset>
        {header}
        <Fields>
          {renderFieldsGroups.map(({ key, children, ...props }) => (
            <Fragment key={key}>
              {children}
              {props.fields.length > 0 && (
                <FieldsGroup {...props} control={control} />
              )}
            </Fragment>
          ))}
        </Fields>
      </Fieldset>
      <Fieldset>{children}</Fieldset>
    </form>
  );
};

const FieldsGroup = <TSchema extends z.ZodObject<z.ZodRawShape>>({
  className,
  label,
  fields,
  control,
}: FieldsGroupWithKey<TSchema> & {
  control: Control<
    z.core.output<TSchema>,
    z.core.output<TSchema>,
    z.core.output<TSchema>
  >;
}) => {
  const isCheckboxGroup = fields.some(({ type }) => type === "checkboxGroup");
  const {
    fieldState: { error },
  } = useController({ control, name: fields[0].name });

  return (
    <Label
      className={className}
      label={label}
      error={isCheckboxGroup && error ? error?.message : undefined}
    >
      {fields.map(({ key, ...props }) => (
        <FieldViews key={key} {...props} control={control} />
      ))}
    </Label>
  );
};

const getDefaults = <TSchema extends z.ZodObject<z.ZodRawShape>>(
  schema: TSchema
) => {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) return [key, value.def.defaultValue];
      return [key, undefined];
    })
  );
};
