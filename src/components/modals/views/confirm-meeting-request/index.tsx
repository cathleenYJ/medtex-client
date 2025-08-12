"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/form";
import { Confirm } from "@ui/confirm";
import { Container } from "@ui/modal";
import { useModal } from "@modals/context";
import { useCurrentRequest } from "@/hooks/use-current-request";
import { fetchData } from "@/data/fetch-data";
import { Routes } from "@/config/routes";
import type { AppointmentItem, BuyerData, CheckoutData } from "@/types";
import { MeetingInfo } from "./meeting-info";

export const ConfirmMeetingRequest: React.FC<{
  buyer: BuyerData;
  appId?: AppointmentItem["id"];
}> = ({ buyer, appId }) => {
  const router = useRouter();
  const { closeModal } = useModal();
  const { setCurrentRequest } = useCurrentRequest();
  const { data: session } = useSession();
  const [checked, setChecked] = useState(false);
  const { isPending, mutate } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (data: CheckoutData) => fetchData.admin.checkout(data, session),
    onSuccess: async (res) => {
      if (!res.data) return;
      handleSuccess(res.data?.order_number);
    },
  });

  const handleSuccess = async (orderId: number) => {
    await closeModal();
    setCurrentRequest((prev) => ({ ...prev, appId: orderId }));
    router.push(`${Routes.private.checkoutForm}/1`);
  };

  const proceed = () => {
    setCurrentRequest({ buyer, appId });
    if (appId) {
      handleSuccess(appId);
    } else {
      mutate({ meeting_id: buyer.meeting_id });
    }
  };

  return (
    <Container className="sm:gap-8 max-w-3xl">
      <MeetingInfo buyer={buyer} />
      <Checkbox
        className="text-white/80 text-sm"
        checked={checked}
        onChange={setChecked}
      >
        I understand that a credit card pre-authorization will be required and
        that the meeting will be confirmed only upon buyer acceptance. I agree
        to proceed.
      </Checkbox>
      <Confirm>
        <Button
          loading={isPending}
          onClick={proceed}
          variant="modal"
          component={Button}
          disabled={!checked}
        >
          Proceed to Payment
        </Button>
      </Confirm>
    </Container>
  );
};
