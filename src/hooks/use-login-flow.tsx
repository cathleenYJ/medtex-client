"use client";

import { useEffect, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useModal } from "@modals/context";
import { Message } from "@modals/views";
import { cleanErrorMessage } from "@/utils/clean-error-message";

export const useLoginFlow = () => {
  const { openModal, closeModal } = useModal();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const code = searchParams.get("code");
  const [isPending, startTransition] = useTransition();

  const loginFlow = ({
    username,
    password,
    redirectTo,
  }: {
    username: string;
    password: string;
    redirectTo: string;
    redirect?: boolean;
  }) => {
    startTransition(
      async () =>
        await signIn("credentials", {
          username,
          password,
          redirectTo,
        })
    );
  };

  useEffect(() => {
    if (!error || !code) return;
    openModal(
      <Message closeModal={closeModal}>{cleanErrorMessage(error)}</Message>
    );
  }, [error, code]);

  return { loginFlow, isPending };
};
