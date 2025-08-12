"use client";

import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Hr } from "@ui/splitter";
import { ToggleBox } from "@ui/toggle-box";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { useDebounce } from "@/hooks/use-debounce";
import { all, filterOptionLogic, initialFilterForm } from "@/utils/filter-form";
import { ExploreBuyersString, toId } from "@/utils/elements-id";
import { ConfigValue } from "@/config";
import type { FilterForm, FilterOptionType } from "@/types";
import { Checkbox } from "./checkbox";
import { filterWaitFamily } from "../state";

export const CheckboxGroups: React.FC<{ filterOptions: FilterOptionType }> = ({
  filterOptions,
}) => {
  const { setWaiting } = useDebounce(filterWaitFamily);
  const { searchParams, setSearchParams } = useAppSearchParams();
  const { register, watch, setValue } = useForm<FilterForm>();
  const onChange = ({
    target: { name, value, checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (filterOptions === null) return;
    const scrollTarget = document.querySelector(
      `#${toId(ExploreBuyersString)}`
    );
    scrollTarget
      ? scrollTarget.scrollIntoView({ behavior: "instant" })
      : window.scrollTo({ top: 0, behavior: "instant" });
    const selected = filterOptionLogic(
      Object.keys(filterOptions[name]),
      watch(name),
      value,
      checked
    );
    setValue(name, selected);
    // 如果所有選項都被選擇，將 searchParams 清空並呈現所有資料
    setSearchParams(
      {
        key: name,
        value: selected.includes(all.key)
          ? undefined
          : JSON.stringify(selected),
      },
      { key: "size", value: String(ConfigValue.RESULT_LIMIT) }
    );
    setWaiting(500);
  };
  useEffect(() => {
    filterOptions && initialFilterForm(filterOptions, setValue, searchParams);
  }, [searchParams.toString(), filterOptions]);
  return (
    <>
      {Object.entries(ConfigValue.FILTEROPTION_LABELS).map(
        ([key, legend], i) => (
          <Fragment key={key}>
            <CheckboxGroup
              legend={legend}
              legendKey={key}
              options={filterOptions[key]}
              register={register}
              onChange={onChange}
            />
            {i !== Object.keys(ConfigValue.FILTEROPTION_LABELS).length - 1 && (
              <Hr />
            )}
          </Fragment>
        )
      )}
    </>
  );
};

type CheckboxGroupProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  legend: string;
  legendKey: string;
};
const CheckboxGroup: React.FC<
  CheckboxGroupProps<FilterForm> & { options: { [key: string]: string } }
> = ({ legend, legendKey, options, register, onChange }) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div className="bg-inherit">
      <div
        className={clsx(
          "sticky top-0 bg-gradient-to-b from-filter-options via-filter-options via-60% to-transparent transition-[padding-bottom]",
          open && "pb-2 md:pb-5"
        )}
      >
        <div
          className="text-white/80 font-medium flex justify-between items-center cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {legend}
          <div className="size-5 bg-white/6 rounded-sm">
            <ChevronDownIcon
              className={clsx(
                "transition-transform duration-400",
                open && "rotate-180"
              )}
            />
          </div>
        </div>
      </div>
      <ToggleBox
        className="flex md:flex-col gap-3 sm:gap-4 md:gap-5 flex-wrap md:flex-nowrap"
        open={open}
      >
        {[
          all,
          ...Object.entries(options).map(([key, label]) => ({ key, label })),
        ].map((option) => (
          <Checkbox
            key={`${legend}-${option.key}`}
            className="basis-full xs:basis-(--1-2-basis-gap-4) sm:basis-(--1-3-basis-gap-4) md:basis-full"
            legend={legendKey}
            label={option.label}
            value={option.key}
            register={register}
            onChange={onChange}
          />
        ))}
      </ToggleBox>
    </div>
  );
};
