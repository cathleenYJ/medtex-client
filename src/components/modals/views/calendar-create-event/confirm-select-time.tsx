import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CalendarCheck } from "@icons";
import { Button } from "@ui/button";
import { useModal } from "@modals/context";
import { Message } from "@modals/views";
import { fetchData } from "@/data/fetch-data";
import { Routes } from "@/config/routes";
import type { AppointmentItem, SaveMeeting } from "@/types";

export const ConfirmSelectTime: React.FC<{
  seller: Pick<AppointmentItem, "seller_id" | "seller_company">;
  data: SaveMeeting;
  session: Session;
}> = ({ seller, data, session }) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { isPending, mutate } = useMutation({
    mutationFn: () => fetchData.admin.saveMeeting(data, session),
    onSuccess: async () => {
      await closeModal();
      openModal(
        <Message
          closeModal={async () => {
            await closeModal();
            router.push(Routes.private.matchmaking);
          }}
          btnCancel="Close"
          title="Meeting Scheduled"
        >
          Your meeting has been scheduled successfully.
        </Message>
      );
    },
  });

  return (
    <Message
      icon={<CalendarCheck className="size-12 text-b2b-lv2" />}
      title="Confirm Selected Meeting Time"
      closeModal={closeModal}
      btnCancel="Cancel"
      btnAccept={
        <Button loading={isPending} onClick={mutate} variant="modal">
          Proceed
        </Button>
      }
    >
      <div className="flex flex-col gap-2.5 text-center">
        <div>You are about to confirm a meeting time with the</div>
        <div className="text-b2b-lv2">
          {seller.seller_company} on {formatTimeRange(data.start, data.end)}{" "}
          GMT+8.
        </div>
        <div>
          Once confirmed, this time will be locked and shared with the seller.
          <br />
          Are you sure you want to proceed?
        </div>
      </div>
    </Message>
  );
};

const formatTimeRange = (startISO: string, endISO: string) => {
  const start = new Date(startISO);
  const end = new Date(endISO);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const datePart = dateFormatter.format(start);
  const startTime = timeFormatter.format(start);
  const endTime = timeFormatter.format(end);

  return `${datePart}, ${startTime} - ${endTime}`;
};
