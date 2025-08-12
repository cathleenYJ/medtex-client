"use client";

import type { FilterForm, FilterOptionType } from "@/types";
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { UseFormSetValue } from "react-hook-form";

export const all = { key: "all", label: "All" };
export const filterOptionLogic = (
  allOptions: string[],
  currentSelected: string[],
  value: string,
  checked: boolean
) => {
  /*
  當 All 選擇時,將所有選項都加入，反之將所有選項都移除
  當 所有其他選項都被選擇時，將 All 選項加入
  當 任一其他選項不被選擇時，將 All 選項移除
  */
  const allSelected = allOptions.every((option) =>
    currentSelected.includes(option)
  );
  return allSelected || value === all.key
    ? checked
      ? [all.key, ...allOptions]
      : []
    : currentSelected.filter((option) => option !== all.key);
};
export const initialFilterForm = (
  allOptions: FilterOptionType,
  setValue: UseFormSetValue<FilterForm>,
  searchParams: ReadonlyURLSearchParams
) => {
  // 如果 searchParams 沒有值，將所有選項都加入
  Object.entries(allOptions).forEach(([key, value]) => {
    const param = searchParams.get(key);
    setValue(key, param ? JSON.parse(param) : [all.key, ...Object.keys(value)]);
  });
};
