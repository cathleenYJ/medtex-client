import * as z from "zod/v4";

export const ProfileFormSchema = z.object({
  account_type: z.enum(["personal", "corporate"]),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  contact_email: z.string().email("invalid email"),
  address: z.string().optional(),
  companyName: z.string().optional(),
  companyNameChinese: z.string().optional(),
  businessId: z.string().refine(
    (val) => !val || /^\d{8}$/.test(val),
    {
      message: "Business ID must be 8 digits",
    }
  ).optional(),
  companyAddress: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.account_type === "personal") {
    if (!data.first_name || data.first_name.trim() === "") {
      ctx.addIssue({
        path: ["first_name"],
        code: z.ZodIssueCode.custom,
        message: "First name is required",
      });
    }
    if (!data.last_name || data.last_name.trim() === "") {
      ctx.addIssue({
        path: ["last_name"],
        code: z.ZodIssueCode.custom,
        message: "Last name is required",
      });
    }
  }
  // corporate 狀態下不驗證 first_name/last_name
  if (data.account_type === "corporate") {
    if (!data.companyName || data.companyName.trim() === "") {
      ctx.addIssue({
        path: ["companyName"],
        code: z.ZodIssueCode.custom,
        message: "Company name is required",
      });
    }
    if (!data.businessId || data.businessId.trim() === "") {
      ctx.addIssue({
        path: ["businessId"],
        code: z.ZodIssueCode.custom,
        message: "Business ID is required",
      });
    }
    if (!data.companyAddress || data.companyAddress.trim() === "") {
      ctx.addIssue({
        path: ["companyAddress"],
        code: z.ZodIssueCode.custom,
        message: "Company address is required",
      });
    }
  }
});