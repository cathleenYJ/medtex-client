import { useTransition } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@ui/button";
import { useModal } from "@modals/context";
import { CheckFat } from "@icons";
import type { AppointmentItem } from "@/types";
import { Message } from "./message";

export const ConfirmDecline: React.FC<
  Pick<AppointmentItem, "id" | "seller_id" | "seller_company">
> = (props) => {
  const { closeModal, openModal } = useModal();
  const [isPending, startTransition] = useTransition();

  const declineRequest = () => {
    startTransition(async () => {
      openModal(<Declined {...props} />);
    });
  };

  return (
    <Message
      title="Decline This Matching Request?"
      icon={<ExclamationTriangleIcon className="size-12 text-b2b-lv2" />}
      closeModal={closeModal}
      btnCancel="Cancel"
      btnAccept={
        <Button loading={isPending} onClick={declineRequest} variant="modal">
          Confirm Decline
        </Button>
      }
    >
      <div className="flex flex-col gap-2.5">
        <div>Are you sure you want to decline this meeting request from</div>
        <div className="text-b2b-lv2">{props.seller_company}?</div>
        <div>
          Once declined, the seller will be notified and their pre-authorized
          payment will be automatically refunded.
          <br />
          This action cannot be undone.
        </div>
      </div>
    </Message>
  );
};

const Declined: React.FC<
  Pick<AppointmentItem, "id" | "seller_id" | "seller_company">
> = (props) => {
  const { closeModal } = useModal();
  return (
    <Message
      icon={<CheckFat className="size-12 text-b2b-lv2" />}
      title="You Declined the Request"
      closeModal={closeModal}
      btnCancel="Done"
    >
      <div className="flex flex-col gap-2.5">
        <div>
          The meeting request from{" "}
          <span className="text-b2b-lv2">{props.seller_company}</span> has been
          declined.
        </div>
        <div>We’ve let the seller know.</div>
      </div>
    </Message>
  );
};
