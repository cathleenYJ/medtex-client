import * as z from "zod/v4";
import { atom, useAtom } from "jotai";
import type { AppointmentItem } from "@/types";

export const SelectTimeSlotSchema = z.object({
  date: z.object({ id: z.string(), name: z.string() }),
  start: z.object({ id: z.string(), name: z.string() }),
  end: z.object({ id: z.string(), name: z.string() }),
});

const sellerAtom = atom<Pick<
  AppointmentItem,
  "seller_id" | "seller_company"
> | null>(null);

export const useMeetingRequestSeller = () => {
  const [seller, setSeller] = useAtom(sellerAtom);
  return { seller, setSeller };
};
