import { CredentialsSignin } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { fetchData } from "@/data/fetch-data";
import { auth } from "@/lib/nextauth/auth";
import type { UserCredentials } from "@/components/auth";

class InvalidLoginError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
  }
  code = this.message;
}

export const CredentialsProvider = Credentials({
  credentials: {
    username: { label: "Username" },
    password: { label: "Password", type: "password" },
  },
  authorize: async ({ username, password }) => {
    const session = await auth();
    const response = await fetchData.auth
      .login(
        {
          username,
          password,
        } as UserCredentials,
        session
      )
      .catch((err) => ({ success: false, message: err.message, data: null }));
    if (!response.success || !response.data) {
      throw new InvalidLoginError(response.message);
    } else {
      return {
        id: response.data.user_id.toString(),
        name: response.data.name || "User",
        image: response.data.avatar,
        email: response.data.email,
        role: response.data.role,
        role_id: response.data.role_id,
        orgLogo: response.data.org_logo,
        orgName: response.data.org_name,
        adminToken: response.data.token,
        profile_completion: response.data.profile_completion,
      };
    }
  },
});
