"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useModal } from "@modals/context";
import { Message } from "@modals/views";
import { cleanErrorMessage } from "@/utils/clean-error-message";
import { Routes } from "@/config/routes";
import { CheckFat } from "@icons";

export const useLoginFlow = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  const { mutate, isPending } = useMutation({
    mutationKey: ["login-flow"],
    mutationFn: ({
      username,
      password,
      redirectTo,
    }: {
      username: string;
      password: string;
      redirectTo: string;
      redirect?: boolean;
    }) =>
      signIn("credentials", {
        username,
        password,
        redirectTo,
        redirect: false,
      }).then((res) => {
        if (res?.error) {
          throw new Error(cleanErrorMessage(res.code));
        }
        return res;
      }),
    onSuccess: (res, data) => {
      if (!res.ok) return;
      console.log("Login successful, redirecting to:", data.redirectTo);
      router.push(data.redirectTo || Routes.private.registrationRecord);
    },
    onError: (err, { username }) => {
      if (err.message.includes("the user is not verified")) {
        openModal(
          <Message
            title="Email Verification"
            closeModal={closeModal}
            btnCancel="Close"
          >
            Please check your email{" "}
            <span className="text-black">{username}</span> for a verification
            link to complete your registration.
          </Message>
        );
      } else {
        openModal(
          <Message title="Login Failed" closeModal={closeModal}>
            {err.message}
          </Message>
        );
      }
    },
  });

  useEffect(() => {
    if (!(error || success) || !message) return;
    if (success) {
      openModal(
        <Message
          icon={<CheckFat className="size-12 text-black" />}
          title={success}
          closeModal={closeModal}
          btnCancel="Login"
        >
          {message}
        </Message>
      );
    } else if (error) {
      openModal(
        <Message
          icon={<ExclamationTriangleIcon className="size-12 text-danger" />}
          title={error}
          closeModal={closeModal}
        >
          {message}
        </Message>
      );
    }
  }, [error, message]);

  return { loginFlow: mutate, isPending };
};
