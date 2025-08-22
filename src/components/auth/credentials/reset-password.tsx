"use client";

import * as z from "zod/v4";
import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { CheckFat } from "@icons";
import { Description, Form } from "@ui/form";
import { Button } from "@ui/button";
import { useModal } from "@modals/context";
import { Message } from "@modals/views";
import { fetchData } from "@/data/fetch-data";
import { Routes } from "@/config/routes";
import { ResetPasswordData } from "@/types";

const Schema = z
  .object({
    password: z
      .string("must be at least 8 characters")
      .min(8, "must be at least 8 characters"),
    password_confirmation: z
      .string("must be at least 8 characters")
      .min(8, "must be at least 8 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

export const ResetPassword: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useParams();
  const { openModal, closeModal } = useModal();

  const { isPending, mutate } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (data: ResetPasswordData) =>
      fetchData.auth.resetPassword(token as string, data, null),
    onSuccess: () => {
      openModal(
        <Message
          icon={<CheckFat className="size-12" />}
          title="Password Successfully Reset"
          btnCancel="Login"
          closeModal={async () => {
            await closeModal();
            router.push(Routes.auth.signIn);
          }}
        >
          You can now use your new password to login to your account.
        </Message>
      );
    },
    onError: (err) => {
      openModal(<Message closeModal={closeModal}>{err.message}</Message>);
    },
  });
  const email = searchParams.get("email");

  const resetPassword: SubmitHandler<z.infer<typeof Schema>> = (data) => {
    if (!email) return;
    mutate({ ...data, email });
  };

  useEffect(() => {
    if (email) return;
    openModal(
      <Message
        closeModal={async () => {
          await closeModal();
          router.push(Routes.public.home);
        }}
        title="Something went wrong"
      >
        The password reset link is invalid or has expired.
      </Message>
    );
  }, [email]);

  return (
    <Form
      schema={Schema}
      onSubmit={resetPassword}
      className="w-full max-w-110 px-0 sm:px-10 py-5"
      header={
        <Description highlight="Reset your Password">
          Please fill in your company information to get started.
        </Description>
      }
      fieldsGroups={[
        {
          label: "New Password",
          fields: [
            {
              name: "password",
              type: "password",
            },
          ],
        },
        {
          label: "Confirm New Password",
          fields: [
            {
              name: "password_confirmation",
              type: "password",
            },
          ],
        },
      ]}
    >
      <Button className="!w-auto" variant="auth" type="submit" loading={isPending}>
        Reset Password
      </Button>
    </Form>
  );
};
