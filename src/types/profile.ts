import type { ResponseData } from "./api-response";
import type { SellerData } from "./sellers";

/**
 * Profile data type for the AUTH_UPDATE_PROFILE_INFO API
 * This matches the backend API requirements for updating profile information
 */
export type ProfileData = {
  account_type: "personal" | "corporate";
  email?: string; // Original email field (read-only, not updated)
  contact_email?: string; // Contact email field (this is the field that gets updated)
  address?: string;
  
  // Personal account specific fields
  first_name?: string; // API field name
  last_name?: string; // API field name
  
  // Corporate account specific fields
  company_name?: string;
  company_name_zh?: string;
  business_id?: string;
  company_address?: string;
};

/**
 * Response type for profile update API
 */
export type ProfileUpdateResponse = ResponseData<{
  account_type: string;
  updated_fields: string[];
}>;

/**
 * Extended profile data type that combines SellerData fields with ProfileData
 * This can be used for more comprehensive profile operations
 */
export type ExtendedProfileData = Partial<SellerData> & ProfileData;

/**
 * Form data type that maps to the ProfileFormSchema
 * This represents the shape of data coming from the form
 */
export type ProfileFormData = {
  contact_email: string;
  address?: string;
  
  // Personal account fields
  first_name?: string;
  last_name?: string;
  
  // Corporate account fields
  companyName?: string;
  companyNameChinese?: string;
  businessId?: string;
  companyAddress?: string;
};
