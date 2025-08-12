import type { DefaultSession } from "@auth/core/types";

declare module "@auth/core/types" {
  interface Session {
    user: DefaultSession["user"] & {
      role: string;
      role_id: number;
      orgLogo: string | null;
      orgName: string | null;
      adminToken: string;
      profile_completion: string[];
    };
  }
}
