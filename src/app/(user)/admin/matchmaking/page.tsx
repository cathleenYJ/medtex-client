"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@ui/table";
import { ExternalLink } from "@ui/external-link";
import { LoadingBlock } from "@dashboard/loading-block";
import { actionViews } from "@dashboard/admin/actions";
import { useModal } from "@modals/context";
import { ProfileModal } from "@modals/views/profile-modal";
import { fetchData } from "@/data/fetch-data";
import { ConfigValue } from "@/config";
import { targetData } from "@/utils/target-data";
import { formatDate, formatSchedule } from "@/utils/format-schedule";
import type { AppointmentItem } from "@/types";

type MatchmakingTable = {
  target: React.ReactNode;
  created_at: React.ReactNode;
  case_status: React.ReactNode;
  payment_status: React.ReactNode;
  schedule_time: React.ReactNode;
  action: React.ReactNode;
};

export default function MatchmakingPage() {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["matchmaking", session?.user.id],
    queryFn: () => fetchData.admin.appointments(session),
    select: (res) =>
      res.data && session?.user
        ? res.data
            .filter((item) => {
              if (session.user.role_id === ConfigValue.ROLES.buyer) {
                return item.case_status === ConfigValue.CASESTATUS.pending;
              }
              return item.case_status !== ConfigValue.CASESTATUS.accepted;
            })
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
            target: {
              label: targetData("Buyer", "Seller", session.user.role_id),
            },
            created_at: {
              label: ConfigValue.APPONINTMENT_LABELS.created_at,
              sort: true,
            },
            case_status: {
              label: ConfigValue.APPONINTMENT_LABELS.case_status,
            },
            payment_status: {
              label: ConfigValue.APPONINTMENT_LABELS.payment_status,
            },
            schedule_time: {
              label: ConfigValue.APPONINTMENT_LABELS.schedule_time,
              sort: true,
            },
          }}
          data={data}
        />
      )}
    </div>
  );
}

const caseStatusViews = (status: MatchmakingTable["case_status"]) => {
  switch (status) {
    case ConfigValue.CASESTATUS.accepted:
      return <span className="text-success">{status}</span>;
    case ConfigValue.CASESTATUS.pending:
      return status;
    default:
      return <span className="text-b2b-red-lv2">{status}</span>;
  }
};

const getTableData = (
  item: AppointmentItem,
  role_id: number,
  openProfile: (id: number) => void
): MatchmakingTable => {
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
  const { created_at, case_status, payment_status, schedule_time } = item;

  return {
    target: (
      <ExternalLink onClick={() => target.id && openProfile(target.id)}>
        {target.company}
      </ExternalLink>
    ),
    created_at: created_at ? formatDate(created_at) : "-",
    case_status: caseStatusViews(case_status || "-"),
    payment_status: payment_status || "-",
    schedule_time:
      schedule_time?.start && schedule_time?.end
        ? formatSchedule(schedule_time.start, schedule_time.end)
        : "-",
    action: actionViews({ ...item, role_id }),
  };
};
