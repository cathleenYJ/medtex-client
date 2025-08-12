"use client";

import { useSession } from "next-auth/react";
import { useModal } from "@modals/context";
import { ConfirmMeetingRequest } from "@modals/views";
import { fetchData } from "@/data/fetch-data";
import type { AppointmentItem } from "@/types";
import { BasicAction } from "./basic-action";

export const ReApply: React.FC<{
  appId: AppointmentItem["id"];
  buyer_id: AppointmentItem["buyer_id"];
  children?: React.ReactNode;
}> = ({ appId, buyer_id, children }) => {
  const { openModal } = useModal();
  const { data: session } = useSession();
  const handleClick = async () => {
    if (!buyer_id) return;
    const res = await fetchData.buyers
      .one(buyer_id, session)
      .catch(() => ({ data: null }));
    res.data &&
      openModal(<ConfirmMeetingRequest buyer={res.data} appId={appId} />);
  };
  return (
    <BasicAction onClick={handleClick} className="bg-b2b-lv4">
      {children || "Re-Apply"}
    </BasicAction>
  );
};
