export const Routes = {
  auth: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    signUp: "/auth/signup",
    forgetPassword: "/auth/forget-password",
    error: "/auth/error",
    resetPassword: "/profile/forget-password/reset",
  },
  public: {
    home: "/",
    result: "/result",
    profile: "/profile",
  },
  documents: {
    meetingFlow: "/documents/meeting-flow",
    terms: "/documents/terms-and-conditions",
    privacy: "/documents/privacy-policy",
  },
  private: {
    admin: "/admin",
    matchmaking: "/admin/matchmaking",
    appointments: "/admin/appointments",
    wishlist: "/admin/wishlist",
    registrationRecord: "/admin/registration-record",
    paymentHistory: "/admin/payment-history",
    profile: "/admin/profile",
    makeAppointment: "/admin/make-appointment",
    profileForm: "/forms/profile/2",
    registrationForm: "/forms/registration/2",
    checkoutForm: "/forms/checkout/2",
  },
};
