import type { ResponseData } from "./api-response";
import type { SellerData } from "./sellers";

export type BuyerData = ResponseData<{
  id: number;
  meeting_id: number;
  user_name: string;
  profile_theme: "green" | "blue" | "red";
  hero_title: string;
  hero_subtitle: string;
  company_logo: string;
  company_logo_small: string;
  purchasing_requirement: Record<string, string>;
  partnership_looking_for: Record<string, string>;
  estimated_procurement_amount: string;
  required_certification: Record<string, string>;
  eligibility_criteria: { title: string; description: string }[];
  production_scale: string;
  delivery_period: string;
  company_name: string;
  headquarter_location: string;
  company_overview_img: string;
  company_website: string;
  company_established_year: string;
  number_of_employees: string;
  business_annual_revenue: string;
  business_attributes: Record<string, string>;
  business_nature: Record<string, string>;
  about_company: string;
  key_strengths: { title: string; description: string }[];
  market_presence: string;
  regional_insights: string;
  strategic_focus_areas: string;
  buyer_title: string;
  languages: Record<string, string>;
  region_covered: Record<string, string>;
  timezone: string;
  brief: string;
  avatar: string;
}>;

export type BuyerContact = ResponseData<{
  id: number;
  user_name: string;
  buyer_title: string;
  region_covered: Record<string, string>;
  avatar: string;
}>;

export type AuthMeeting = ResponseData<{
  id: number;
  meeting_id: BuyerData["meeting_id"];
  buyer_id: BuyerData["id"];
  buyer_company: BuyerData["company_name"];
  buyer_page: string;
  seller_id: SellerData["id"];
  seller_company: SellerData["company_name"];
  schedule_time: { start: string; end: string };
  meeting_type: string;
  meeting_location: string;
  description: string;
}>;

export type SaveMeeting = {
  start: string;
  end: string;
  description: string;
  meeting_type: "in_person";
  meeting_location: string;
  disabled: 0;
};
