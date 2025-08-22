"use client";

import * as z from "zod/v4";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import { Routes } from "@/config/routes";
import { ProfileFormSchema } from "./state";
import type { ProfileData } from "@/types";

/**
 * Custom hook for updating user profile information
 * Uses the ProfileData type from @/types/profileData for type safety
 * 
 * @param selectedType - The selected account type ('personal' | 'corporate' | null)
 * @returns Object containing isPending state and updateProfile function
 */
export const useProfileUpdate = (selectedType: "personal" | "corporate" | null, step: number) => {
  const router = useRouter();
  const { data: session } = useSession();
  
  const { mutate: updateProfileInfo, isPending } = useMutation({
    mutationKey: ["update-profile-info"],
    mutationFn: (data: ProfileData) => fetchData.sellers.profileInfoUpdate(data, session),
    onSuccess: () => {
      // Navigate to registration form step 1
      router.push(`${Routes.private.profileForm}/${step + 1}`)
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });

  const updateProfile: SubmitHandler<z.infer<typeof ProfileFormSchema>> = (data) => {
    if (!selectedType) return;

    // Prepare the API payload based on the selected account type
    const apiData: ProfileData = {
      account_type: selectedType,
      contact_email: data.contact_email ?? "",
      address: data.address ?? "",
      first_name: data.first_name ?? "",
      last_name: data.last_name ?? "",
      company_name: data.companyName ?? "",
      company_name_zh: data.companyNameChinese ?? "",
      business_id: data.businessId ?? "",
      company_address: data.companyAddress ?? ""
    };

    // 清空另一型別獨有欄位
    if (selectedType === "personal") {
      apiData.company_name = "";
      apiData.company_name_zh = "";
      apiData.business_id = "";
      apiData.company_address = "";
    } else if (selectedType === "corporate") {
      apiData.first_name = "";
      apiData.last_name = "";
    }
    updateProfileInfo(apiData);
  };

  return { isPending, updateProfile };
};
