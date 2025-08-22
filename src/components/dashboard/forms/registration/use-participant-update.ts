"use client";

import * as z from "zod/v4";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import { Routes } from "@/config/routes";
import { RegistrationFormSchema } from "./state";
import type { ParticipantData } from "@/types";

/**
 * Custom hook for updating participant information
 * Uses the ParticipantData type from @/types/participantData for type safety
 * 
 * @returns Object containing isPending state and updateParticipant function
 */
export const useParticipantUpdate = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  const { mutate: updateParticipantInfo, isPending } = useMutation({
    mutationKey: ["update-participant-info"],
    mutationFn: (data: ParticipantData) => fetchData.sellers.participantInfoUpdate(data, session),
    onError: (error) => {
      console.error("Failed to update participant info:", error);
    },
  });

  // 新增 meetingId 參數
  const updateParticipant = (data: z.infer<typeof RegistrationFormSchema>, meetingId?: string) => {

    // Prepare the API payload
    const apiData: ParticipantData = {
      participant_full_name: `${data.firstName} ${data.lastName}`,
      participant_first_name: data.firstName,
      participant_last_name: data.lastName,
      job_title: data.jobTitle,
      mobile_number: data.mobileNumber,
      participant_email: data.emailAddress,
      dietary_preferences: data.dietaryPreferences?.name || "Regular",
      contact_phone_code: data.contactPhoneCode?.id || "",
      contact_phone_code_name: data.contactPhoneCode?.name || "",
    };
    
    // Add company name fields if they have values
    if (data.companyName && data.companyName.trim() !== '') {
      apiData.participant_company_name = data.companyName;
    }
    
    if (data.companyNameChinese && data.companyNameChinese.trim() !== '') {
      apiData.participant_company_name_zh = data.companyNameChinese;
    }

    // Update participant info via API, then navigate to checkout with meetingId if present
    updateParticipantInfo(apiData, {
      onSuccess: () => {
        if (meetingId) {
          router.push(`${Routes.private.checkoutForm}/1?meetingId=${meetingId}`);
        } else {
          router.push(`${Routes.private.checkoutForm}/1`);
        }
      }
    });
  };

  return { isPending, updateParticipant };
};
