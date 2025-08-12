import type { Session } from "next-auth";

export type AuthSite = "b2b" | "admin" | null;
export type GetAuthProps = (
  auth?: AuthSite,
  session?: Session | null
) => Record<string, string>;
export type ApiResponse<T> = {
  success: boolean;
  status: string;
  message: string;
  data: T | null;
};
export type B2BApiResponse<T> = {
  total: number;
  data: T;
};
export type ResponseData<T> = {
  [key in keyof T]: key extends "id" | "buyer_id" | "seller_id"
    ? T[key]
    : T[key] | null;
};
