"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "@modals/context";
import { ConfirmMeetingRequest } from "@modals/views";
import { fetchData } from "@/data/fetch-data";
import type { BuyerData } from "@/types";
import { BasicAction } from "./basic-action";

export const MakeAppointment: React.FC<{
  buyer_id: BuyerData["id"];
  children?: React.ReactNode;
  className?: string;
}> = ({ buyer_id, children, className }) => {
  const { openModal } = useModal();
  const { data: session } = useSession();
  const { refetch, isFetching } = useQuery({
    queryKey: ["buyer", buyer_id],
    queryFn: () =>
      fetchData.buyers.one(buyer_id, session).catch(() => ({ data: null })),
    enabled: false,
  });

  const handleClick = async () => {
    if (!session) return;
    const { data } = await refetch();
    data?.data && openModal(<ConfirmMeetingRequest buyer={data.data} />);
  };
  return (
    <BasicAction
      loading={isFetching}
      onClick={handleClick}
      className={clsx("bg-b2b-lv4", className)}
    >
      {children}
    </BasicAction>
  );
};
