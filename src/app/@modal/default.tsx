"use client";

import { Modal } from "@/components/modals/modal";
import { useModal } from "@modals/context";

export default function NormalModal() {
  const { closeModal } = useModal();
  return <Modal onClose={closeModal}></Modal>;
}
