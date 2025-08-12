"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@ui/table";
import { ExternalLink } from "@ui/external-link";
import { LoadingBlock } from "@dashboard/loading-block";
import { useModal } from "@modals/context";
import { ProfileModal } from "@modals/views/profile-modal";
import { fetchData } from "@/data/fetch-data";
import { ConfigValue } from "@/config";
import { targetData } from "@/utils/target-data";
import { formatSchedule } from "@/utils/format-schedule";
import type { AppointmentItem } from "@/types";

type AppointmentTable = {
  id: React.ReactNode;
  target: React.ReactNode;
  schedule_time: React.ReactNode;
  meeting_location: React.ReactNode;
};

export default function AppointmentsPage() {
  const { data: session } = useSession();
  const { isLoading, data } = useQuery({
    queryKey: ["appointments", session?.user.id],
    queryFn: () => fetchData.admin.appointments(session),
    select: (res) =>
      res.data && session?.user
        ? res.data
            .filter(
              (item) => item.case_status === ConfigValue.CASESTATUS.accepted
            )
            .map((item) =>
              getTableData(item, session.user.role_id, openProfile)
            )
        : [],
    enabled: !!session?.user.id,
  });
  const { openModal } = useModal();

  const openProfile = (id: number) => {
    if (!session?.user.role_id) return;
    openModal(<ProfileModal id={id} session={session} />);
  };

  return (
    <div>
      {isLoading || !session ? (
        <LoadingBlock />
      ) : (
        <Table
          className="-mx-5 sm:-mx-10 px-5 sm:px-10 mask-(--mask-x-5) sm:mask-(--mask-x-10)"
          cols={{
            id: {
              label: ConfigValue.APPONINTMENT_LABELS.id,
              sort: true,
            },
            target: {
              label: targetData("Buyer", "Seller", session.user.role_id),
            },
            schedule_time: {
              label: ConfigValue.APPONINTMENT_LABELS.schedule_time,
              sort: true,
            },
            meeting_location: {
              label: ConfigValue.APPONINTMENT_LABELS.meeting_location,
            },
          }}
          data={data}
        />
      )}
    </div>
  );
}

const getTableData = (
  item: AppointmentItem,
  role_id: number,
  openProfile: (id: number) => void
): AppointmentTable => {
  const { id, schedule_time, meeting_location } = item;
  const target = targetData(
    {
      id: item.buyer_id,
      company: item.buyer_company,
    },
    {
      id: item.seller_id,
      company: item.seller_company,
    },
    role_id
  );
  return {
    id,
    target: (
      <ExternalLink onClick={() => target.id && openProfile(target.id)}>
        {target.company}
      </ExternalLink>
    ),
    schedule_time: schedule_time
      ? formatSchedule(schedule_time.start, schedule_time.end)
      : "-",
    meeting_location: meeting_location || "-",
  };
};
