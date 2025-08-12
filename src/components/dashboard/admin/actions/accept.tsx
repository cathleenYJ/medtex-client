import { useRouter } from "next/navigation";
import { useMeetingRequestSeller } from "@modals/views/calendar-create-event/state";
import { Routes } from "@/config/routes";
import type { AppointmentItem } from "@/types";
import { BasicAction } from "./basic-action";

export const Accept: React.FC<
  Pick<AppointmentItem, "seller_id" | "seller_company">
> = ({ seller_id, seller_company }) => {
  const router = useRouter();
  const { setSeller } = useMeetingRequestSeller();
  const onClick = () => {
    setSeller({ seller_id, seller_company });
    router.push(Routes.private.makeAppointment);
  };
  return (
    <BasicAction className="bg-b2b-lv4" onClick={onClick}>
      Accept
    </BasicAction>
  );
};
