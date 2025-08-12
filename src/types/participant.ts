import type { ResponseData } from "./api-response";

/**
 * Participant data type for the AUTH_UPDATE_PARTICIPANT_INFO API
 * This matches the backend API requirements for updating participant information
 */
export type ParticipantData = {
  participant_full_name?: string;
  participant_first_name?: string;
  participant_last_name?: string;
  participant_company_name?: string;
  participant_company_name_zh?: string;
  job_title?: string;
  mobile_number?: string;
  participant_email?: string;
  dietary_preferences?: string;
};

/**
 * Response type for participant update API
 */
export type ParticipantUpdateResponse = ResponseData<{
  updated_fields: string[];
}>;

/**
 * Form data type that maps to the RegistrationFormSchema
 * This represents the shape of data coming from the registration form
 */
export type RegistrationFormData = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  mobileNumber: string;
  emailAddress: string;
  dietaryPreferences?: { id: string; name: string };
};
