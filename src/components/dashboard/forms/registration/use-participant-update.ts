"use client";

import * as z from "zod/v4";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import { Routes } from "@/config/routes";
import { useCurrentRequest } from "@/hooks/use-current-request";
import { RegistrationFormSchema } from "./state";
import type { ParticipantData, BuyerData } from "@/types";

/**
 * Custom hook for updating participant information
 * Uses the ParticipantData type from @/types/participantData for type safety
 * 
 * @returns Object containing isPending state and updateParticipant function
 */
export const useParticipantUpdate = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setCurrentRequest } = useCurrentRequest();
  
  const { mutate: updateParticipantInfo, isPending } = useMutation({
    mutationKey: ["update-participant-info"],
    mutationFn: (data: ParticipantData) => fetchData.sellers.participantInfoUpdate(data, session),
    onSuccess: () => {
      // Navigate to checkout form after successful update
      router.push(`${Routes.private.checkoutForm}/1`);
    },
    onError: (error) => {
      console.error("Failed to update participant info:", error);
    },
  });

  const updateParticipant: SubmitHandler<z.infer<typeof RegistrationFormSchema>> = (data) => {
    // Get account type from localStorage
    const accountType = typeof window !== "undefined" 
      ? localStorage.getItem("accountType") as "personal" | "corporate" | null
      : null;

    // Prepare the API payload
    const apiData: ParticipantData = {
      participant_full_name: `${data.firstName} ${data.lastName}`,
      participant_first_name: data.firstName,
      participant_last_name: data.lastName,
      job_title: data.jobTitle,
      mobile_number: data.mobileNumber,
      participant_email: data.emailAddress,
      dietary_preferences: data.dietaryPreferences?.name || "Regular",
    };
    
    // Add company name fields if they have values
    if (data.companyName && data.companyName.trim() !== '') {
      apiData.participant_company_name = data.companyName;
    }
    
    if (data.companyNameChinese && data.companyNameChinese.trim() !== '') {
      apiData.participant_company_name_zh = data.companyNameChinese;
    }
    
    // Set registration data for checkout (keep existing logic for compatibility)
    setCurrentRequest({
      buyer: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.emailAddress,
        mobile: data.mobileNumber,
        jobTitle: data.jobTitle,
        accountType,
        dietaryPreferences: data.dietaryPreferences?.name || "Regular",
        meeting_id: 41 // Temporary ID, should come from API response
      } as unknown as BuyerData,
      appId: 863 // Temporary ID, should come from API response
    });

    // Update participant info via API
    updateParticipantInfo(apiData);
  };

  return { isPending, updateParticipant };
};
