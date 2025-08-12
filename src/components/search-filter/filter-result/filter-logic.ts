import { ReadonlyURLSearchParams } from "next/navigation";
import { ConfigValue } from "@/config";
import { BuyerData } from "@/types";

export const filterLogic = (
  buyer: BuyerData,
  searchParams: ReadonlyURLSearchParams
): boolean => {
  const res = Object.keys(ConfigValue.FILTEROPTION_LABELS).every((key) => {
    const param = searchParams.get(key);
    if (!param) return true;
    return JSON.parse(param).some((item: string) => {
      const target = buyer[key as keyof BuyerData];
      return target ? Object.keys(target).includes(item) : false;
    });
  });
  return res;
};
