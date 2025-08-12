"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@ui/loading";
import { ExternalLink } from "@ui/external-link";
import { useModal } from "@modals/context";
import { ProfileModal } from "@modals/views/profile-modal";
import { fetchData } from "@/data/fetch-data";
import { targetData } from "@/utils/target-data";
import { formatSchedule } from "@/utils/format-schedule";
import type { AppointmentItem } from "@/types";
import { OverviewCard } from "../overview-card";

export const Appointments: React.FC = () => {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const { data, isFetching } = useQuery({
    queryKey: ["appointments", session?.user.id],
    queryFn: () => fetchData.admin.appointments(session),
    select: (res) => res.data,
    enabled: !!session?.user.id,
  });

  useEffect(() => {
    data && setAppointments(data);
  }, [data]);

  return (
    <OverviewCard className="gap-4">
      <div className="text-lg">Upcoming Appointment</div>
      {isFetching ? (
        <Spinner />
      ) : (
        appointments
          .slice(0, 3)
          .map((appointment) => (
            <Appointment key={appointment.id} {...appointment} />
          ))
      )}
    </OverviewCard>
  );
};

const Appointment: React.FC<AppointmentItem> = ({
  schedule_time,
  meeting_location,
  buyer_id,
  buyer_company,
  seller_id,
  seller_company,
}) => {
  const { data: session } = useSession();
  const target =
    session?.user.role_id &&
    targetData(
      {
        id: buyer_id,
        company: buyer_company,
      },
      {
        id: seller_id,
        company: seller_company,
      },
      session.user.role_id
    );
  const { openModal } = useModal();
  const openProfile = (id: number) => {
    if (!session?.user.role_id) return;
    openModal(<ProfileModal id={id} session={session} />);
  };
  return (
    target && (
      <div className="px-2 py-3.25 bg-black/10 text-sm text-white/80">
        <div>
          {schedule_time &&
            formatSchedule(schedule_time.start, schedule_time.end)}
        </div>
        <div>{meeting_location}</div>
        <ExternalLink
          className="w-max"
          onClick={() => target.id && openProfile(target.id)}
        >
          {target.company}
        </ExternalLink>
      </div>
    )
  );
};
