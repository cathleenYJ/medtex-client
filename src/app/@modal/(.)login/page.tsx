"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/modals/modal";
import { useModal } from "@modals/context";

export default function SignInModal() {
  const { closeModal } = useModal();
  const router = useRouter();
  const onClose = async () => {
    await closeModal();
    router.back();
  };
  return <Modal onClose={onClose}></Modal>;
}
