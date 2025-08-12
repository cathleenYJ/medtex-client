import * as z from "zod/v4";

// Registration Form Schema
export const RegistrationFormSchema = z.object({
  // Participant Details - Only core fields
  firstName: z.string().min(1, "required"),
  lastName: z.string().min(1, "required"),
  companyName: z.string().min(1, "required"),
  companyNameChinese: z.string().optional(),
  jobTitle: z.string().min(1, "required"),
  mobileNumber: z
    .string()
    .min(1, "required"),
    // Removed regex validation to be more flexible - can be added back if needed
    // .max(14, "invalid phone number")
    // .regex(/^\d{3}\-\d{3}\-\d+$/, "invalid phone number"),
  emailAddress: z.string().email("invalid email"),
  dietaryPreferences: z.object({ id: z.string(), name: z.string() }),
  
  // Required for mobile number field
  contactPhoneCode: z
    .object({ id: z.string(), name: z.string() }),
});
