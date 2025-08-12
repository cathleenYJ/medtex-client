"use client";

import * as z from "zod/v4";
import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@ui/button";
import { Description, Hint, Form } from "@ui/form";
import { useLoginFlow } from "@/hooks/use-login-flow";
import { Routes } from "@/config/routes";
import { LinkWithMeetingId } from "@/components/ui/link-with-meeting-id";

const CredentialsSchema = z.object({
  username: z.email("invalid email"),
  password: z.string("invalid password").min(6, "invalid password"),
});
export type UserCredentials = z.infer<typeof CredentialsSchema>;

export const CredentialsSignin: React.FC<{
  redirectTo: string;
}> = ({ redirectTo }) => {
  const { loginFlow, isPending } = useLoginFlow();

  const credentialsAction: SubmitHandler<UserCredentials> = ({
    username,
    password,
  }) => {
    loginFlow({ username, password, redirectTo });
  };

  return (
    <Form
      className="w-full max-w-90 sm:max-w-full px-0 sm:px-10 py-5"
      schema={CredentialsSchema}
      onSubmit={credentialsAction}
      header={
        <Description highlight="Welcome Back!">
          Use your account to manage your matchmaking activities and
          appointments.
        </Description>
      }
      fieldsGroups={[
        {
          label: "Account ID",
          fields: [
            {
              name: "username",
              type: "text",
              placeholder: "You@example.com",
            },
          ],
        },
        {
          label: "Password",
          fields: [
            {
              name: "password",
              type: "password",
              placeholder: "At least 8 characters ",
              children: (
                <LinkWithMeetingId
                  className="text-sm text-black/60"
                  href={Routes.auth.forgetPassword}
                >
                  Forgot Password?
                </LinkWithMeetingId>
              ),
            },
          ],
        },
      ]}
    >
      <Button className="!w-auto" variant="auth" type="submit" loading={isPending}>
        Login
      </Button>
      <Hint hint="Don’t have an account?">
        <LinkWithMeetingId href={Routes.auth.signUp}>Sign Up</LinkWithMeetingId>
      </Hint>
    </Form>
  );
};
