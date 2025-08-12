"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@ui/button";
import { useModal } from "@modals/context";
import { ConfirmMeetingRequest } from "@modals/views";
import type { BuyerData } from "@/types";

export const MakeAppointmentBtn: React.FC<{
  buyer: BuyerData;
  className?: string;
  children?: React.ReactNode;
}> = ({ buyer, children, className }) => {
  const { openModal } = useModal();
  const { data: session } = useSession();

  const handleMakeAppointment = () => {
    if (!session) {
      signIn();
    } else {
      openModal(<ConfirmMeetingRequest buyer={buyer} />);
    }
  };

  return (
    <Button onClick={handleMakeAppointment} className={className}>
      {children}
    </Button>
  );
};
