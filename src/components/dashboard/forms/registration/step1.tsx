"use client";

import * as z from "zod/v4";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Form, StepInfo } from "@ui/form";
import { Button } from "@ui/button";
import { Confirm } from "@ui/confirm";
import { InfoCircle } from "@/components/icons/basic";
import { fetchData } from "@/data/fetch-data";
import { RegistrationFormSchema } from "./state";
import { useParticipantUpdate } from "./use-participant-update";
import { LoadingBlock } from "@dashboard/loading-block";
import type { ParticipantData } from "@/types/participant";

interface Step1Props {
  mode?: 'create' | 'edit';
  onSaveComplete?: () => void; // 編輯完成後的回調
}

export const Step1: React.FC<Step1Props> = ({ 
  mode = 'create', 
  onSaveComplete 
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState({
    contactPhoneCode: { id: "TW", name: "886" },
    dietaryPreferences: { id: "regular", name: "Regular" },
    firstName: "",
    lastName: "",
    emailAddress: "",
    jobTitle: "",
    mobileNumber: "",
    companyName: "",
    companyNameChinese: "",
  });
  const [isFormReady, setIsFormReady] = useState(false);

  // Fetch profile data to prefill form
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile-data"],
    queryFn: () => fetchData.sellers.getProfileData(session),
    enabled: !!session?.user.adminToken,
  });

    // Update default values when profile data is loaded
  useEffect(() => {
    if (profileData?.data) {
      const { participant_info, profile_info } = profileData.data;
      
      const newValues = {
        contactPhoneCode: { id: "TW", name: "886" },
        dietaryPreferences: { id: "regular", name: "Regular" },
        // 優先使用 participant_info，沒有值時使用 profile_info
        firstName: participant_info?.participant_first_name || profile_info?.first_name || "",
        lastName: participant_info?.participant_last_name || profile_info?.last_name || "",
        emailAddress: participant_info?.participant_email || profile_info?.contact_email || "",
        jobTitle: participant_info?.job_title || "",
        mobileNumber: participant_info?.mobile_number || "",
        companyName: participant_info?.participant_company_name || profile_info?.company_name || "", // 新增欄位，暫時設為空字串
        companyNameChinese: participant_info?.participant_company_name_zh || profile_info?.company_name_zh || "", // 新增欄位，暫時設為空字串
      };
      
      setDefaultValues(newValues);
      setIsFormReady(true);
    } else if (!isLoading) {
      // If no profile data and not loading, mark form as ready with default values
      setIsFormReady(true);
    }
  }, [profileData, isLoading]);


  // Use the new useParticipantUpdate hook (must be called before any return)
  const { isPending, updateParticipant } = useParticipantUpdate();

  // Show loading block while waiting for all data to be ready
  if (isLoading || !isFormReady) {
    return (
      <div className="flex flex-col gap-8 w-3xl max-w-full text-black/80">
        <LoadingBlock />
      </div>
    );
  }

  // 根據模式設定標題和按鈕文字
  const isEditMode = mode === 'edit';
  const title = isEditMode ? 'Registration Information' : 'Complete Registration Form';
  const buttonText = isEditMode ? 'Save' : 'Continue';

  // 根據模式調整提交後的行為
  const handleSubmit = async (data: z.infer<typeof RegistrationFormSchema>) => {
    
    if (isEditMode) {
      // 編輯模式：只更新數據，不執行導航邏輯
      try {
        // 直接調用 API 更新參與者資訊，但不執行 onSuccess 的導航
        const apiData: ParticipantData = {
          participant_full_name: `${data.firstName} ${data.lastName}`,
          participant_first_name: data.firstName,
          participant_last_name: data.lastName,
          job_title: data.jobTitle,
          mobile_number: data.mobileNumber,
          participant_email: data.emailAddress,
          dietary_preferences: data.dietaryPreferences?.name || "Regular",
        };
        
        // 只有當公司名稱有值時才加入 API 資料
        if (data.companyName && data.companyName.trim() !== '') {
          apiData.participant_company_name = data.companyName;
        }
        
        if (data.companyNameChinese && data.companyNameChinese.trim() !== '') {
          apiData.participant_company_name_zh = data.companyNameChinese;
        }
        
        await fetchData.sellers.participantInfoUpdate(apiData, session);
        
        if (onSaveComplete) {
          onSaveComplete(); // 回到 Registration Record 頁面
        }
      } catch (error) {
        console.error("Failed to update participant info:", error);
      }
    } else {
      // 創建模式：執行原本的邏輯（包含導航到 checkout）
      const searchParams = new URLSearchParams(window.location.search);
      const meetingId = searchParams.get('meetingId') || undefined;
      await updateParticipant(data, meetingId);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-3xl max-w-full text-black/80">
        <StepInfo title={title} />

      {/* Form */}
      <Form
        key={`registration-${defaultValues.firstName}-${defaultValues.lastName}-${defaultValues.emailAddress}-${defaultValues.jobTitle}-${defaultValues.companyName}`} // Force re-render when data changes
        className="flex flex-col gap-5 w-full text-black/80"
        onSubmit={handleSubmit}
        schema={RegistrationFormSchema}
        defaultValues={defaultValues}
      fieldsGroups={[
        {
          children: (
            <div className="text-xl text-black font-medium">Participant Details</div>
          ),
        },
        {
          label: "* Full Name",
          className: "basis-full [&_[data-labels]]:flex [&_[data-labels]]:flex-col [&_[data-labels]]:gap-5 xs:[&_[data-labels]]:flex-row",
          fields: [
            {
              name: "firstName",
              type: "text",
              placeholder: "First Name",
              className: "w-full xs:flex-1",
            },
            {
              name: "lastName",
              type: "text",
              placeholder: "Last Name",
              className: "w-full xs:flex-1",
            },
          ],
        },
        {
          label: "* Organization / Company Name",
          className: "basis-full",
          fields: [
            {
              name: "companyName",
              type: "text",
              placeholder: "Your organization or company name",
              className: "basis-full",
            },
          ],
        },
        {
          label: "Organization / Company Name - Chinese (Optional)",
          className: "basis-full",
          fields: [
            {
              name: "companyNameChinese",
              type: "text",
              placeholder: "公司或機構名稱（中文）",
              className: "basis-full",
            },
          ],
        },
        {
          label: "* Job Title / Position",
          className: "basis-full",
          fields: [
            {
              name: "jobTitle",
              type: "text",
              placeholder: "Your job title or position",
              className: "basis-full",
            },
          ],
        },
        {
          label: "",
          className: "basis-full [&_[data-labels]]:flex [&_[data-labels]]:flex-col [&_[data-labels]]:gap-5 xs:[&_[data-labels]]:flex-row",
          fields: [
            {
              name: "mobileNumber",
              type: "text",
              placeholder: "+886 000-000-000",
              className: "w-full xs:flex-1",
              label: "* Mobile Number",
            },
            {
              name: "emailAddress",
              type: "email",
              placeholder: "you@example.com",
              className: "w-full xs:flex-1",
              label: "* Email Address",
            },
          ],
        },
        {
          label: "* Dietary Preferences",
          className: "basis-full",
          fields: [
            {
              name: "dietaryPreferences",
              type: "select",
              placeholder: "Select dietary preference",
              className: "w-full",
              items: [
                { id: "regular", name: "Regular" },
                { id: "vegetarian", name: "Vegetarian" },
              ],
            },
          ],
        },
      ] as Array<Record<string, unknown>>}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <InfoCircle className="w-4 h-4" />
          <span 
            style={{
              fontSize: '14px',
              fontWeight: 400,
            }}
          >
            Locked 3 days before event
          </span>
        </div>
        <Confirm cancelClick={() => router.back()}>
          <Button
            variant="auth"
            type="submit"
            loading={isPending || isLoading}
          >
            {buttonText}
          </Button>
        </Confirm>
      </div>
    </Form>
    </div>
  );
};
