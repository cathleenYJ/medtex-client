import type { ResponseData } from "./api-response";

export type SellerData = ResponseData<{
  id: number;
  full_name: string;
  timezone: string;
  job_title: string;
  contact_email: string;
  contact_phone: string;
  company_name: string;
  website_url: string;
  product_url: string;
  company_logo: string;
  business_capital_amount: string;
  nature_of_business: string;
  main_business: string;
  headquarter_location: string;
  manufacturing_base: string;
  certification: string;
}>;
