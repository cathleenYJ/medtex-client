import { auth } from "@lib/nextauth/auth";
import { ConfigValue } from "@/config";
import { Routes } from "@/config/routes";
import { fetchData } from "@/data/fetch-data";
import type { FilterOptionType, MenuItemType } from "@/types";

const getItems = (data: FilterOptionType | null, name: string) => {
  if (!data) return [];
  return Object.entries(data[name]).map(([key, value]) => {
    const searchParams = new URLSearchParams();
    searchParams.set(name, JSON.stringify([key]));
    return {
      key,
      label: value,
      href: `${Routes.public.result}?${searchParams.toString()}`,
    };
  });
};

export const menuItemsMain = async (): Promise<MenuItemType[]> => {
  const session = await auth();
  const res = await fetchData.basic
    .filterOptions(session)
    .catch(() => ({ data: null }));
  if (!res.data) return [];
  return Object.keys(res.data).map((key) => ({
    key,
    label: ConfigValue.FILTEROPTION_LABELS[key],
    items: getItems(res.data, key),
  }));
};

export const menuItemsRest = async (): Promise<MenuItemType[]> => [];
