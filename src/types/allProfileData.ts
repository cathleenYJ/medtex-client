/**
 * Types for AUTH_PROFILE_DATA API response
 */

export interface ProfileApiResponse {
  success: boolean;
  status: string;
  message: string;
  data: {
    profile_info: {
      account_type?: "personal" | "corporate";
      contact_email?: string;
      address?: string;
      first_name?: string;
      last_name?: string;
      full_name?: string;
      company_name?: string | null;
      company_name_zh?: string | null;
      business_id?: string | null;
      company_address?: string | null;
    };
    participant_info: {
      participant_full_name?: string | null;
      participant_first_name?: string | null;
      participant_last_name?: string | null;
      participant_company_name?: string | null;
      participant_company_name_zh?: string | null;
      job_title?: string | null;
      mobile_number?: string | null;
      participant_email?: string | null;
      dietary_preferences?: string | null;
    };
    invoice_info: {
      invoice_email?: string | null;
      invoice_business_id?: string | null;
      invoice_company_name?: string | null;
    };
  };
}
