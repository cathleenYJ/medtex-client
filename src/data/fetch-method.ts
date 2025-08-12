import { ConfigValue } from "@/config";
import type { Session } from "next-auth";
import type { AuthSite, GetAuthProps } from "@/types";

const getAuth: GetAuthProps = (site, session) => {
  switch (site) {
    case "admin":
      return {
        "x-api-key": ConfigValue.NEXT_PUBLIC_REST_API_KEY as string,
        Authorization: `Bearer ${session?.user.adminToken}`,
      } as Record<string, string>;
    case "b2b":
      return {
        Authorization: `Bearer ${ConfigValue.NEXT_PUBLIC_B2B_REST_API_TOKEN}`,
      } as Record<string, string>;
    default:
      return {};
  }
};

const adminErrorHandler = (res: unknown) => {
  if (
    res &&
    typeof res === "object" &&
    "success" in res &&
    "message" in res &&
    res.success === false
  ) {
    throw new Error(String(res?.message));
  }
  return res;
};

export class FetchMethod {
  private getAuth: GetAuthProps = getAuth;
  private headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  private errorHandler = (res: Response) => {
    const contentType = res.headers.get("Content-Type");
    const responseData = contentType?.includes("application/json")
      ? res.json()
      : res.text();
    if (res.ok) {
      return adminErrorHandler(responseData);
    } else {
      if ([404, 403, 401].includes(res.status)) throw new Error(res.statusText);
      return responseData;
    }
  };
  public get = async <T>(
    url: string,
    session?: Session | null,
    auth?: AuthSite
  ) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...this.headers,
        ...this.getAuth(auth, session),
      },
    }).then(this.errorHandler);
    return response as Promise<T>;
  };
  public delete = async <T>(
    url: string,
    session?: Session | null,
    auth?: AuthSite
  ) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        ...this.headers,
        ...this.getAuth(auth, session),
      },
    }).then(this.errorHandler);
    return response as Promise<T>;
  };
  public post = async <T>(
    url: string,
    data: unknown,
    session?: Session | null,
    auth?: AuthSite
  ) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...this.headers,
        ...this.getAuth(auth, session),
      },
      body: JSON.stringify(data),
    }).then(this.errorHandler);
    return response as Promise<T>;
  };

  public postFormData = async <T>(
    url: string,
    data: FormData,
    session?: Session | null,
    auth?: AuthSite
  ) => {
    const response = await fetch(url, {
      method: "POST",
      headers: this.getAuth(auth, session),
      body: data,
    }).then(this.errorHandler);
    return response as Promise<T>;
  };

  public put = async <T>(
    url: string,
    data: unknown,
    session?: Session | null,
    auth?: AuthSite
  ) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        ...this.headers,
        ...this.getAuth(auth, session),
      },
      body: JSON.stringify(data),
    }).then(this.errorHandler);
    return response as Promise<T>;
  };
}
