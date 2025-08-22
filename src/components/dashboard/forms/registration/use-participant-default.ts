import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import type { Session } from "next-auth";
import type { SelectItem } from "@/types";
import type { ProfileData } from "@/types/profile";
import type { ParticipantData } from "@/types/participant";

export const useParticipantDefault = (
  session: Session | null,
  phoneCodes: SelectItem[] = []
) => {
  const phoneCodesMap = useMemo(
    () => new Map((phoneCodes ?? []).map((phone) => [phone.name, phone])),
    [phoneCodes]
  );

  const { data: currentProfile, isFetching } = useQuery({
    queryKey: ["current-participant-profile"],
    queryFn: () =>
      session
        ? fetchData.sellers.getProfileData(session)
        : Promise.resolve({ data: {} }),
    select: (res: {
      data?: {
        participant_info?: ParticipantData;
        profile_info?: ProfileData;
      };
    }) => {
  const participant_info: ParticipantData = res.data?.participant_info || {};
  const profile_info: Partial<ProfileData> = res.data?.profile_info || {};
      let dietaryPreferences = { id: "regular", name: "Regular" };
      if (
        typeof participant_info.dietary_preferences === "string" &&
        participant_info.dietary_preferences.trim() !== ""
      ) {
        dietaryPreferences = {
          id: participant_info.dietary_preferences.toLowerCase(),
          name: participant_info.dietary_preferences,
        };
      }
      const phoneCodeKey = (participant_info.mobile_number || "").slice(0, 3);
      const contactPhoneCodeRaw = phoneCodesMap.get(phoneCodeKey) || { id: "TW", name: "886" };
      const contactPhoneCode = {
        id: String(contactPhoneCodeRaw.id),
        name: String(contactPhoneCodeRaw.name),
      };
      return {
        contactPhoneCode,
        dietaryPreferences,
        firstName:
          participant_info.participant_first_name || profile_info.first_name || "",
        lastName:
          participant_info.participant_last_name || profile_info.last_name || "",
        emailAddress:
          participant_info.participant_email || profile_info.contact_email || "",
        jobTitle: participant_info.job_title || "",
        mobileNumber: participant_info.mobile_number || "",
        companyName:
          participant_info.participant_company_name || profile_info.company_name || "",
        companyNameChinese:
          participant_info.participant_company_name_zh || profile_info.company_name_zh || "",
      };
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!session,
  });

  return {
    currentProfile,
    isFetching,
  };
};
