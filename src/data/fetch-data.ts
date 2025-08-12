import { FetchMethod } from "./fetch-method";
import { API_ENDPOINTS } from "./endpoints";
import type { Session } from "next-auth";
import type {
  SidebarItem,
  ApiResponse,
  BuyerContact,
  BuyerData,
  FilterOptionType,
  RecommandedItem,
  AppointmentItem,
  B2BApiResponse,
  SellerData,
  WishListItem,
  AuthMeeting,
  SignupResponse,
  LoginResponse,
  MailVerifyData,
  MailVerifyResponse,
  ForgetPasswordData,
  ResetPasswordData,
  SaveMeeting,
  CheckoutData,
  CheckoutResponse,
  PaymentData,
  SaveWishlist,
  ProfileData,
  ProfileUpdateResponse,
  ParticipantData,
  ParticipantUpdateResponse,
  InvoiceData,
  InvoiceUpdateResponse,
  ProfileApiResponse,
  OrderMeetingDetailsResponse,
} from "@/types";
import type { SignupData, UserCredentials } from "@/components/auth";

class FetchData {
  private method: FetchMethod = new FetchMethod();
  auth = {
    login: (data: UserCredentials, session: Session | null = null) =>
      this.method
        .post<ApiResponse<LoginResponse>>(
          API_ENDPOINTS.LOGIN,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to login\n${err}`);
        }),
    logout: (session: Session | null = null) =>
      this.method
        .post(API_ENDPOINTS.LOGOUT, {}, session, "admin")
        .catch((err) => {
          throw new Error(`Failed to logout\n${err}`);
        }),
    signup: (data: Omit<SignupData, "terms">, session: Session | null = null) =>
      this.method
        .post<ApiResponse<SignupResponse>>(
          API_ENDPOINTS.SIGNUP,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to signup\n${err}`);
        }),
    mailVertify: (data: MailVerifyData, session: Session | null = null) =>
      this.method
        .post<ApiResponse<MailVerifyResponse>>(
          API_ENDPOINTS.MAIL_VERIFY,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to vertify email\n${err}`);
        }),
    foretPassword: (data: ForgetPasswordData, session: Session | null = null) =>
      this.method
        .post<ApiResponse<null>>(
          API_ENDPOINTS.FORGET_PASSWORD,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to send reset password email\n${err}`);
        }),
    resetPassword: (
      token: string,
      data: ResetPasswordData,
      session: Session | null = null
    ) =>
      this.method
        .post<ApiResponse<null>>(
          `${API_ENDPOINTS.RESET_PASSWORD}/${token}`,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to reset password\n${err}`);
        }),
  };
  buyers = {
    all: (session: Session | null = null) =>
      this.method
        .get<ApiResponse<BuyerData[]>>(
          API_ENDPOINTS.BUYERS_DATA,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch buyers\n${err}`);
        }),
    one: (id: number | string, session: Session | null = null) =>
      this.method
        .get<ApiResponse<BuyerData>>(
          `${API_ENDPOINTS.BUYERS_DATA}/${id}`,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch buyer id: ${id}\n${err}`);
        }),
    contact: (id: number, session: Session | null = null) =>
      this.method
        .get<ApiResponse<BuyerContact>>(
          `${API_ENDPOINTS.BUYERS_CONTACT}/${id}`,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch buyer contact data\n${err}`);
        }),
  };
  sellers = {
    all: (session: Session | null = null) =>
      this.method
        .get<B2BApiResponse<SellerData[]>>(
          `${API_ENDPOINTS.SELLERS_DATA}`,
          session,
          "b2b"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch sellers\n${err}`);
        }),
    one: (id: number, session: Session | null = null) =>
      this.method
        .get<ApiResponse<SellerData>>(
          `${API_ENDPOINTS.SELLERS_DATA}/${id}`,
          session,
          "b2b"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch seller id: ${id}\n${err}`);
        }),
    profileUpdate: (
      data: Partial<SellerData>,
      session: Session | null = null
    ) =>
      this.method
        .put<ApiResponse<null>>(
          API_ENDPOINTS.AUTH_UPDATE_SELLER_PROFILE,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to update seller profile\n${err}`);
        }),
    imageUpload: (data: FormData, session: Session | null = null) =>
      this.method
        .postFormData<ApiResponse<null>>(
          API_ENDPOINTS.AUTH_UPDATE_SELLER_IMAGE,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to upload seller image\n${err}`);
        }),
    profileInfoUpdate: (
      data: ProfileData,
      session: Session | null = null
    ) =>
      this.method
        .put<ProfileUpdateResponse>(
          API_ENDPOINTS.AUTH_UPDATE_PROFILE_INFO,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to update profile info\n${err}`);
        }),
    participantInfoUpdate: (
      data: ParticipantData,
      session: Session | null = null
    ) =>
      this.method
        .put<ParticipantUpdateResponse>(
          API_ENDPOINTS.AUTH_UPDATE_PARTICIPANT_INFO,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to update participant info\n${err}`);
        }),
    invoiceInfoUpdate: (
      data: InvoiceData,
      session: Session | null = null
    ) =>
      this.method
        .put<InvoiceUpdateResponse>(
          API_ENDPOINTS.AUTH_UPDATE_INVOICE_INFO,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to update invoice info\n${err}`);
        }),
    getProfileData: (session: Session | null = null) =>
      this.method
        .get<ProfileApiResponse>(
          API_ENDPOINTS.AUTH_PROFILE_DATA,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to get profile data\n${err}`);
        }),
  };
  basic = {
    filterOptions: (session: Session | null = null) =>
      this.method
        .get<ApiResponse<FilterOptionType>>(
          API_ENDPOINTS.FILTER_OPTIONS,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch filter options\n${err}`);
        }),
    buysinessNatures: (session: Session | null = null) =>
      this.method.get<ApiResponse<FilterOptionType>>(
        API_ENDPOINTS.BUSINESS_NATURES,
        session,
        "admin"
      ),
    recommended: (session: Session | null = null) =>
      this.method
        .get<ApiResponse<RecommandedItem[]>>(
          API_ENDPOINTS.RECOMMENDED,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch recommended data\n${err}`);
        }),
  };
  admin = {
    authMeetings: (session: Session | null = null) =>
      this.method
        .get<ApiResponse<AuthMeeting[]>>(
          API_ENDPOINTS.AUTH_MEETINGS,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch auth meetings data\n${err}`);
        }),
    saveMeeting: (data: SaveMeeting, session: Session | null = null) =>
      this.method
        .post<ApiResponse<null>>(
          API_ENDPOINTS.AUTH_ADD_MEETING,
          data,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to save meeting\n${err}`);
        }),
    sidebar: (session: Session | null = null) =>
      this.method
        .get<ApiResponse<SidebarItem[]>>(
          API_ENDPOINTS.ADMIN_SIDEBAR,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch admin sidebar data\n${err}`);
        }),
    appointments: (session: Session | null = null) =>
      this.method
        .get<ApiResponse<AppointmentItem[]>>(
          API_ENDPOINTS.AUTH_APPOINTMENTS,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch incoming appointments data\n${err}`);
        }),
    wishlist: (session: Session | null = null) =>
      this.method
        .get<ApiResponse<WishListItem[]>>(
          API_ENDPOINTS.AUTH_WISHLIST,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch wishlist data\n${err}`);
        }),
    addWishlist: (data: SaveWishlist, session: Session | null = null) =>
      this.method.post<ApiResponse<null>>(
        API_ENDPOINTS.AUTH_ADD_WISHLIST,
        data,
        session,
        "admin"
      ),
    delWishlist: (id: number, session: Session | null = null) =>
      this.method.delete<ApiResponse<null>>(
        `${API_ENDPOINTS.AUTH_DEL_WISHLIST}/${id}`,
        session,
        "admin"
      ),
    checkout: (data: CheckoutData, session: Session | null = null) =>
      this.method.post<ApiResponse<CheckoutResponse>>(
        API_ENDPOINTS.AUTH_CHECKOUT,
        data,
        session,
        "admin"
      ),
    payment: (data: PaymentData, session: Session | null = null) =>
      this.method.post<string>(
        API_ENDPOINTS.AUTH_PAYMENT_REQUEST,
        data,
        session,
        "admin"
      ),
    orderMeetingDetails: (meetingId: number, session: Session | null = null) =>
      this.method
        .get<OrderMeetingDetailsResponse>(
          `${API_ENDPOINTS.AUTH_ORDER_MEETING_DETAILS}/${meetingId}/details`,
          session,
          "admin"
        )
        .catch((err) => {
          throw new Error(`Failed to fetch order meeting details\n${err}`);
        }),
  };
}

export const fetchData = new FetchData();
