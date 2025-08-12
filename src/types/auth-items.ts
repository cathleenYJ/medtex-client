export type LoginResponse = {
  token: string;
  user_id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  role_id: number;
  org_logo: string;
  org_name: string;
  profile_completion: string[];
};

export type SignupResponse = {
  user_id: number;
};

export type MailVerifyData = {
  user_id: number;
  code: string;
};

export type MailVerifyResponse = {
  errors?: {
    user_id?: string[];
    code?: string[];
  };
};

export type ForgetPasswordData = {
  type: string;
  email: string;
  reset_password_url: string;
};

export type ResetPasswordData = {
  email: string;
  password: string;
  password_confirmation: string;
};
