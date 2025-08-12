"use client";

import clsx from "clsx";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useModal } from "@modals/context";

export function Modal({
  children,
  onClose,
}: {
  children?: React.ReactNode;
  onClose: () => void;
}) {
  const { message, open } = useModal();
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 z-40 w-screen">
        <div className="flex min-h-full items-center justify-center p-4 sm:px-16 sm:py-19 bg-black/50">
          <DialogPanel
            transition
            className={clsx(
              "text-sm sm:text-base",
              "duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",
              "max-w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-xl shadow-white/20 bg-black text-white backdrop-blur-2xl"
            )}
          >
            {message || children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
