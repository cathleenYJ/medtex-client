import type { ResponseData } from "./api-response";
import type { AuthMeeting, BuyerData } from "./buyers";
import type { SellerData } from "./sellers";

export type SidebarItem = {
  label: string;
  items: { label: string; href: string }[];
};

export type AppointmentItem = ResponseData<{
  id: number;
  order_id: 818;
  buyer_id: BuyerData["id"];
  buyer_name: BuyerData["user_name"];
  buyer_company: BuyerData["company_name"];
  buyer_email: string;
  buyer_mobile: string;
  seller_id: SellerData["id"];
  seller_name: SellerData["full_name"];
  seller_company: SellerData["company_name"];
  seller_email: string;
  seller_mobile: string;
  meeting_id: BuyerData["meeting_id"];
  meeting_time_id: AuthMeeting["id"];
  buyer_sign_in: number;
  seller_sign_in: number;
  created_at: number;
  case_status: string;
  payment_status: string;
  invoice_status: string;
  price: number;
  schedule_time: AuthMeeting["schedule_time"];
  meeting_location: AuthMeeting["meeting_location"];
}>;

export type WishListItem = ResponseData<{
  id: number;
  created_at: string;
  creator_id: number;
  reserve_meeting_id: number;
  meeting_id: BuyerData["meeting_id"];
  region_covered: BuyerData["region_covered"];
  buyer_theme: BuyerData["profile_theme"];
  buyer_id: BuyerData["id"];
  buyer_company: BuyerData["company_name"];
  buyer_logo_small: BuyerData["company_logo_small"];
}>;

export type CheckoutData = Pick<BuyerData, "meeting_id">;

export type CheckoutResponse = {
  order_number: number;
  payment_method: string;
  status: string;
  amount: number;
};

export type PaymentData = {
  gateway_id: number;
  order_id: AppointmentItem["id"];
  tax_id: string;
  tax_title: string;
  tax_email: string;
};

export type DialogProfile = {
  theme: string;
  logo: string;
  company_name: string;
  business_nature: Record<string, string> | null;
  address?: string;
  website?: string;
  // Contact information
  user_name: string;
  job_title: string;
  timezone?: string;
  // Business information
  business_capital_amount?: string;
  purchasing_requirement?: Record<string, string>;
  headquarter_location?: string;
  required_certification?: Record<string, string>;
  company_website?: string;
  product_url?: string[] | null;
  business_annual_revenue?: string;
};

// Order Meeting Details API Types
export type OrderMeetingDetailsResponse = {
  success: boolean;
  status: string;
  message: string;
  data: {
    orders: Array<{
      id: number;
      status: string;
      meeting_id: string;
      merchant_trade_no: string | null;
      order_item_id: number;
      amount: number;
    }>;
    meeting_details: {
      title: string;
      start_time: string;
      end_time: string;
      address: string;
    };
    payment_history: Array<{
      order_id: number;
      payment_status: string;
      invoice_number?: string | null;
      total_amount?: string;
      merchant_trade_no?: string;
      invoice_date?: number;
    }>;
    participant_details: {
      participant_full_name: string;
      job_title: string;
      mobile_number: string | null;
      participant_email: string;
      dietary_preferences: string | null;
    };
  } | null;
};

export type MeetingDetailsResponse = {
  success: boolean;
  status: string;
  message: string;
  data: Array<{
    id: number;
    title: string;
    amount: number;
    start_time: string;
    end_time: string;
    address: string;
  }> | {
    id: number;
    title: string;
    amount: number;
    start_time: string;
    end_time: string;
    address: string;
  } | null;
};



export type SaveWishlist = {
  item_name: string;
} & Pick<BuyerData, "meeting_id">;
