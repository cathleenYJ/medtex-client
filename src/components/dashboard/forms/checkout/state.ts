import * as z from "zod/v4";
import { checkTaxId } from "@/utils/check-tax-id";

export const CheckoutSchema = z
  .object({
    tax_email: z.email("invalid email"),
    tax_title: z.string().optional(),
    tax_id: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only validate tax_id if it's provided and not empty
      if (data.tax_id && data.tax_id.trim() !== "") {
        return checkTaxId(data.tax_id);
      }
      return true; // Valid if tax_id is empty or not provided
    },
    {
      path: ["tax_id"],
      message: "invalid business id",
    }
  );
