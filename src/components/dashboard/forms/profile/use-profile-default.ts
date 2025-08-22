"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import type { Session } from "next-auth";

/**
 * Custom hook for fetching profile default values
 * @param session - next-auth session
 */
export const useProfileDefault = (session: Session) => {

  const { data: currentProfile, isFetching } = useQuery({
    queryKey: ["current-profile", session],
    queryFn: () => fetchData.sellers.getProfileData(session),
    select: (res) => {
      const profile = res?.data?.profile_info || {};
      // Map snake_case API fields to camelCase keys used in the form state
      return {
        account_type: profile.account_type || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        contact_email: profile.contact_email || "",
        address: profile.address || "",
        companyName: profile.company_name || "",
        companyNameChinese: profile.company_name_zh || "",
        businessId: profile.business_id || "",
        companyAddress: profile.company_address || "",
      };
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { currentProfile, isFetching };
};
