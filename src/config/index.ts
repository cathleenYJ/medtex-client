import { AppointmentItem } from "@/types";
import { Routes } from "./routes";

export const ConfigValue = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_REST_API_ENDPOINT: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  NEXT_PUBLIC_REST_API_KEY: process.env.NEXT_PUBLIC_REST_API_KEY,
  NEXT_PUBLIC_DEV_REST_API_ENDPOINT:
    process.env.NEXT_PUBLIC_DEV_REST_API_ENDPOINT,
  NEXT_PUBLIC_B2B_REST_API_ENDPOINT:
    process.env.NEXT_PUBLIC_B2B_REST_API_ENDPOINT,
  NEXT_PUBLIC_B2B_REST_API_TOKEN: process.env.NEXT_PUBLIC_B2B_REST_API_TOKEN,
  AUTH_TOKEN_KEY: "token",
  RESULT_LIMIT: 10,
  CONTACT_EMAIL: "support@email.com",
  FILTEROPTION_LABELS: {
    region_covered: "Market Region",
    purchasing_requirement: "Interested Area",
    partnership_looking_for: "Partnership Types",
  } as Record<string, string>,
  APPONINTMENT_LABELS: {
    id: "Appt ID",
    order_id: "",
    buyer_id: "Buyer ID",
    buyer_name: "Buyer Name",
    buyer_company: "Buyer Company",
    buyer_email: "",
    buyer_mobile: "",
    seller_id: "Seller ID",
    seller_name: "Seller Name",
    seller_company: "Seller Company",
    seller_email: "",
    seller_mobile: "",
    meeting_id: "",
    meeting_time_id: "",
    buyer_sign_in: "",
    seller_sign_in: "",
    created_at: "Request Date",
    case_status: "Case Status",
    payment_status: "Payment status",
    invoice_status: "Invoice",
    price: "Price",
    schedule_time: "Schedule time (UTC+8)",
    meeting_location: "Meeting Location",
  } as Record<keyof AppointmentItem, string>,
  CASESTATUS: {
    pending: "wait_for_reply",
    accepted: "accepted",
    declined: "declined",
    expired: "expired",
    notComplete: "not_completed",
  },
  ROLES: {
    buyer: 4,
    seller: 1,
  },
  ANNUAL_REVENUE: {
    less_10m: "Under $10 million",
    "10m_50m": "$10-50 million",
    "50m_1b": "$50-100 million",
    over_1b: "Over $1 billion",
  },
  PRIVILEGES: {
    buyer: {
      admin: Routes.private.admin,
      // matchmaking: Routes.private.matchmaking,
      // appointments: Routes.private.appointments,
    },
    seller: {
      admin: Routes.private.admin,
      // matchmaking: Routes.private.matchmaking,
      // appointments: Routes.private.appointments,
      // wishlist: Routes.private.wishlist,
      registrationRecord: Routes.private.registrationRecord,
      paymentHistory: Routes.private.paymentHistory,
    },
  },
};
