"use client";

import * as z from "zod/v4";
import { useRouter } from "next/navigation";
import { Button } from "@ui/button";
import { Description, Form, Hint } from "@ui/form";
import { useModal } from "@modals/context";
import { Message } from "@modals/views";
import { Routes } from "@/config/routes";
import { fetchData } from "@/data/fetch-data";
import { useMutation } from "@tanstack/react-query";
import { ForgetPasswordData } from "@/types";
import { SubmitHandler } from "react-hook-form";
import { LinkWithMeetingId } from "@ui/link-with-meeting-id";

const Schema = z.object({ email: z.email("invalid email") });

export const ForgetPassword = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { mutate, isPending } = useMutation({
    mutationKey: ["forget-password"],
    mutationFn: (data: ForgetPasswordData) =>
      fetchData.auth.foretPassword(data, null),
    onSuccess: (res) => {
      if (res.success) {
        openModal(
          <Message
            title="Recovery Link Sent"
            btnCancel="Close"
            closeModal={async () => {
              await closeModal();
              router.push(Routes.auth.signIn);
            }}
          >
            {res.message}
          </Message>
        );
      } else {
        openModal(<Message closeModal={closeModal}>{res.message}</Message>);
      }
    },
  });

  const resetPassword: SubmitHandler<z.infer<typeof Schema>> = (data) => {
    mutate({
      type: "email",
      email: data.email,
      reset_password_url: `${window.location.origin}${Routes.auth.resetPassword}/`,
    });
  };

  return (
    <Form
      className="w-full max-w-90 sm:max-w-full px-0 sm:px-10 py-5"
      schema={Schema}
      onSubmit={resetPassword}
      fieldsGroups={[
        {
          label: "Email",
          fields: [
            { name: "email", type: "text", placeholder: "You@example.com" },
          ],
        },
      ]}
      header={
        <Description highlight="Forget Your Password?">
          No worries, we’ll send you reset instructions.
        </Description>
      }
    >
      <Button className="!w-auto" variant="auth" type="submit" loading={isPending}>
        Reset Password
      </Button>
      <Hint hint="Go back to">
        <LinkWithMeetingId href={Routes.auth.signIn}>Login</LinkWithMeetingId>
      </Hint>
    </Form>
  );
};
