"use client";

import React from "react";
import { atom, useAtom } from "jotai";

const modalAtom = atom<{
  open: boolean;
  message: React.ReactNode;
}>({
  open: false,
  message: null,
});

export const useModal = () => {
  const [modal, setModal] = useAtom(modalAtom);
  const openModal = (message: React.ReactNode = null) =>
    setModal({ message, open: true });
  const closeModal = async () => {
    setModal((prev) => ({ ...prev, open: false }));
    await new Promise((resolve) => setTimeout(resolve, 300));
  };
  return { ...modal, openModal, closeModal };
};
