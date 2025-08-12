import * as z from "zod/v4";

export const ProfileFormSchema = z.object({
  // Personal account fields - 基礎為 optional，動態擴展時再設為必填
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  
  // Common fields for both account types
  contact_email: z.string().email("invalid email"),
  address: z.string().optional(),
  
  // Corporate account fields - 基礎為 optional，動態擴展時再設為必填
  companyName: z.string().optional(),
  companyNameChinese: z.string().optional(),
  businessId: z.string().optional(),
  companyAddress: z.string().optional(),
});
