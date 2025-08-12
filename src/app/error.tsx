"use client";

import { useEffect } from "react";
import { useModal } from "@modals/context";
import { Message } from "@modals/views";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { openModal, closeModal } = useModal();
  useEffect(() => {
    openModal(
      <Message
        closeModal={async () => {
          reset();
          await closeModal();
        }}
      >
        {error.message}
      </Message>
    );
  }, [error]);
  return null;
}
