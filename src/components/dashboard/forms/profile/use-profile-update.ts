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
    onSuccess: (response) => {
      console.log("Profile updated successfully:", response);
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
    };

    // Add common fields
    // Send contact_email to backend as contact_email field (not email)
    if (data.contact_email) apiData.contact_email = data.contact_email;
    if (data.address) apiData.address = data.address;

    // Add type-specific fields
    if (selectedType === "personal") {
      if (data.first_name) apiData.first_name = data.first_name;
      if (data.last_name) apiData.last_name = data.last_name;
    } else if (selectedType === "corporate") {
      if (data.companyName) apiData.company_name = data.companyName;
      if (data.companyNameChinese) apiData.company_name_zh = data.companyNameChinese;
      if (data.businessId) apiData.business_id = data.businessId;
      if (data.companyAddress) apiData.company_address = data.companyAddress;
    }

    console.log("Sending API data:", apiData);
    updateProfileInfo(apiData);
  };

  return { isPending, updateProfile };
};
