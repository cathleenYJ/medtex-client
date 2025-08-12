import { atom, useAtom } from "jotai";
import type { BuyerData } from "@/types";

const currentRequestAtom = atom<{
  buyer: BuyerData | null;
  appId?: number;
}>({
  buyer: null,
});

export const useCurrentRequest = () => {
  const [currentRequest, setCurrentRequest] = useAtom(currentRequestAtom);
  return { currentRequest, setCurrentRequest };
};
