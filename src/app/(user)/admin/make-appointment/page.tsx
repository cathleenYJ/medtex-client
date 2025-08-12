import { redirect } from "next/navigation";
import { B2bCalendar } from "@dashboard/calendar";
import { auth } from "@lib/nextauth/auth";
import { fetchData } from "@/data/fetch-data";
import { Routes } from "@/config/routes";

export default async function MakeAppointmentPage() {
  const session = await auth();
  if (!session?.user.adminToken) redirect(Routes.auth.signIn);
  const res = await fetchData.admin
    .authMeetings(session)
    .catch(() => ({ data: null }));
  if (!res.data) return null;
  return (
    <div className="flex flex-col gap-5">
      <div className="text-3xl font-medium">
        Select a time that works best for you.
      </div>
      <div>
        Event Period & Timezone :{" "}
        <span className="text-b2b-lv2">2025/12/4 - 12/7 (GMT +8)</span>
      </div>
      <B2bCalendar meetings={res.data} />
    </div>
  );
}
