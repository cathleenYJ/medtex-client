import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import type { Session } from "next-auth";
import type { CheckoutData } from "@/types";

export const useCheckout = (session: Session | null) => {
  return useMutation({
    mutationKey: ["auth-checkout"],
    mutationFn: (data: CheckoutData) => fetchData.admin.checkout(data, session),
  });
};
