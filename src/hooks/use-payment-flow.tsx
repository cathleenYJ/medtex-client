import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import type { PaymentData } from "@/types";
import type { Session } from "next-auth";

export const usePaymentFlow = (session: Session | null) => {
  return useMutation({
    mutationKey: ["checkout-payment-transform"],
    mutationFn: async (data: PaymentData) => {
      // 呼叫 paymentTransform API
      return await fetchData.admin.paymentTransform(data, session);
    },
    onSuccess: async (formHtml: string) => {
      const hasError = formHtml.includes('"success":false');
      if (hasError) {
        let errorMsg = "Payment failed. Please try again.";
        try {
          const errors = JSON.parse(formHtml);
          errorMsg = errors.message || errorMsg;
        } catch {}
        return { error: errorMsg };
      } else {
        let html = "";
        try {
          html = JSON.parse(formHtml || "");
        } catch {
          html = formHtml;
        }
        const container = document.createElement("div");
        container.style.display = "none";
        container.innerHTML = html;
        document.body.appendChild(container);
        const form = container.querySelector("form");
        if (form) {
          form.submit();
        }
        return { success: true };
      }
    },
  });
};
