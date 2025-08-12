"use client";

import * as z from "zod/v4";
import Link from "next/link";
import { useTransition } from "react";
import { SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Description, Form, Hint } from "@ui/form";
import { Button } from "@ui/button";
import { useModal } from "@modals/context";
import { Message, VertifyEmail } from "@modals/views";
import { fetchData } from "@/data/fetch-data";
import { Routes } from "@/config/routes";
import { LinkWithMeetingId } from "@ui/link-with-meeting-id";

const SignupSchema = z
  .object({
    email: z.email("invalid email"),
    password: z
      .string("must be at least 8 characters")
      .min(8, "must be at least 8 characters"),
    password_confirmation: z.string(),
    terms: z
      .boolean()
      .default(false)
      .refine((data) => data, "You must accept the terms"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

export type SignupData = z.infer<typeof SignupSchema>;

export const Signup: React.FC = () => {
  const { openModal, closeModal } = useModal();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const sendVerificationEmail = async (data: Omit<SignupData, "terms">) => {
    const res = await fetchData.auth.signup(data, session).catch((err) => {
      return { success: false, message: err.message, data: null };
    });
    if (res.success && res.data) {
      openModal(
        <VertifyEmail
          user_id={res.data.user_id}
          email={data.email}
          password={data.password}
          resend={async () => await sendVerificationEmail(data)}
        />
      );
    } else {
      openModal(
        <Message
          title="Failed to create account"
          btnCancel="Try again"
          closeModal={closeModal}
        >
          {res.message}
        </Message>
      );
    }
  };
  const createAccount: SubmitHandler<SignupData> = ({
    email,
    password,
    password_confirmation,
  }) => {
    startTransition(
      async () =>
        await sendVerificationEmail({ email, password, password_confirmation })
    );
  };
  return (
    <Form
      className="w-full max-w-90 sm:max-w-full px-0 sm:px-10 py-5"
      schema={SignupSchema}
      onSubmit={createAccount}
      header={
        <Description highlight="Get Started">
          Use your account to manage your matchmaking activities and
          appointments.
        </Description>
      }
      fieldsGroups={[
        {
          label: "Email Address",
          fields: [
            {
              name: "email",
              type: "text",
              placeholder: "You@example.com",
            },
          ],
        },
        {
          label: "Create Password",
          fields: [
            {
              name: "password",
              type: "password",
              placeholder: "At least 8 characters",
            },
          ],
        },
        {
          label: "Confirm Password",
          fields: [
            {
              name: "password_confirmation",
              type: "password",
              placeholder: "At least 8 characters",
            },
          ],
        },
        {
          fields: [
            {
              name: "terms",
              type: "checkbox",
              children: (
                <>
                  I have read and accepted the{" "}
                  <Link
                    target="_blank"
                    className="text-black underline"
                    href={Routes.documents.terms}
                  >
                    terms and conditions
                  </Link>
                </>
              ),
            },
          ],
        },
      ]}
    >
      <Button className="!w-auto" variant="auth" type="submit" loading={isPending}>
        Create Account
      </Button>
      <Hint hint="Already have an account?">
        <LinkWithMeetingId href={Routes.auth.signIn}>Login</LinkWithMeetingId>
      </Hint>
    </Form>
  );
};
