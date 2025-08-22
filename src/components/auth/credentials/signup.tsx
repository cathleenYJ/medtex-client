"use client";

import * as z from "zod/v4";
import Link from "next/link";
import { Description, Form, Hint } from "@ui/form";
import { Button } from "@ui/button";
import { useSignupFlow } from "@/hooks/use-signup-flow";
import { Routes } from "@/config/routes";
import type { SubmitHandler } from "react-hook-form";
import { signupFields } from "./signup-fields";

export const SignupSchema = z
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
  const { signup, isPending } = useSignupFlow();

  const createAccount: SubmitHandler<SignupData> = ({
    email,
    password,
    password_confirmation,
  }) => {
    signup({ email, password, password_confirmation });
  };

  return (
    <Form
      className="w-full max-w-90 sm:max-w-full px-0 sm:px-5 md:px-10 py-5"
      schema={SignupSchema}
      onSubmit={createAccount}
      header={
        <Description highlight="Get Started">
          Use your account to manage your matchmaking activities and
          appointments.
        </Description>
      }
      fieldsGroups={signupFields}
    >
      <Button className="!w-auto" variant="auth" type="submit" loading={isPending}>
        Create Account
      </Button>
      <Hint hint="Already have an account?">
        <Link href={Routes.auth.signIn}>Login</Link>
      </Hint>
    </Form>
  );
};
