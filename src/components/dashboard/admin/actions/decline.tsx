import { useModal } from "@modals/context";
import { ConfirmDecline } from "@modals/views";
import type { AppointmentItem } from "@/types";
import { BasicAction } from "./basic-action";

export const Decline: React.FC<
  Pick<AppointmentItem, "id" | "seller_id" | "seller_company">
> = (props) => {
  const { openModal } = useModal();
  return (
    <BasicAction
      className="bg-cancel"
      onClick={() => openModal(<ConfirmDecline {...props} />)}
    >
      Decline
    </BasicAction>
  );
};
