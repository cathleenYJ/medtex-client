import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import type { Session } from "next-auth";

export const useMeetingDetails = (meetingId: number, session: Session | null) => {
  return useQuery({
    queryKey: ["meeting-details", meetingId],
    queryFn: () => fetchData.admin.meetingDetails(meetingId, session),
    enabled: !!session?.user.adminToken && !!meetingId,
  });
};
