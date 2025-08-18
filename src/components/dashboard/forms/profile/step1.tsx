"use client";

import * as z from "zod/v4";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { UserProfile, BuildingOffice } from "@icons";
import { Hr } from "@ui/splitter";
import { Form, StepInfo } from "@ui/form";
import { Button } from "@ui/button";
import { Confirm } from "@ui/confirm";
import type { Session } from "next-auth";
import type { FormParams } from "@/types";
import { fetchData } from "@/data/fetch-data";
import { ProfileFormSchema } from "./state";
import { useProfileUpdate } from "./use-profile-update";

export const Step1: React.FC<{ user: Session["user"] }> = ({ user }) => {
  const {
    params: [, , step],
  } = useParams<FormParams>();
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedType, setSelectedType] = useState<"personal" | "corporate" | null>(null);
  const [defaultValues, setDefaultValues] = useState({
    contact_email: user.email || "",
    first_name: "",
    last_name: "",
    address: "",
    companyName: "",
    companyNameChinese: "",
    businessId: "",
    companyAddress: "",
  });
  const [, setIsFormReady] = useState(false);
  // Fetch profile data to prefill form
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile-data"],
    queryFn: () => fetchData.sellers.getProfileData(session),
    enabled: !!session?.user.adminToken,
  });
  // Use the updated useProfileUpdate hook (must be called before any return)
  const { isPending, updateProfile } = useProfileUpdate(selectedType, Number(step));
  // Update default values when profile data is loaded - 優先使用 profile_info
  useEffect(() => {
    if (profileData?.data?.profile_info) {
      const { 
        contact_email, 
        first_name, 
        last_name, 
        address,
        company_name,
        company_name_zh,
        business_id,
        company_address 
      } = profileData.data.profile_info;
      const newValues = {
        contact_email: contact_email || user.email || "",
        first_name: first_name || "",
        last_name: last_name || "",
        address: address || "",
        companyName: company_name || "",
        companyNameChinese: company_name_zh || "",
        businessId: business_id || "",
        companyAddress: company_address || "",
      };
      setDefaultValues(newValues);
      // Auto-detect account type based on existing data - 只有在資料完整時才自動設定
      const hasCompletePersonalData = first_name && last_name;
      const hasCompleteCorporateData = company_name && business_id && company_address;
      if (hasCompleteCorporateData) {
        setSelectedType("corporate");
      } else if (hasCompletePersonalData) {
        setSelectedType("personal");
      } else {
        // Incomplete data, user needs to select account type manually
      }
      setIsFormReady(true);
    } else if (!isLoading) {
      // If no profile data and not loading, mark form as ready with current default values
      setIsFormReady(true);
    }
  }, [profileData, isLoading, user.email]);

  // Handle account type change and reset form
  const handleTypeChange = (type: "personal" | "corporate") => {
    setSelectedType(type);
    
    // 切換帳戶類型時清空另一邊的值
    setDefaultValues(prevValues => {
      if (type === "personal") {
        // 切換到個人帳戶：清空企業相關欄位
        return {
          ...prevValues,
          companyName: "",
          companyNameChinese: "",
          businessId: "",
          companyAddress: "",
        };
      } else if (type === "corporate") {
        // 切換到企業帳戶：清空個人相關欄位
        return {
          ...prevValues,
          first_name: "",
          last_name: "",
        };
      }
      return prevValues;
    });
  };

  // Create dynamic schema based on selected account type
  const getDynamicSchema = () => {
    let schema;
    if (selectedType === "personal") {
      schema = ProfileFormSchema.extend({
        first_name: z.string().min(1, "required"),
        last_name: z.string().min(1, "required"),
      });
    } else if (selectedType === "corporate") {
      schema = ProfileFormSchema.extend({
        companyName: z.string().min(1, "Company name is required"),
        businessId: z.string().optional(),
        companyAddress: z.string().min(1, "Company address is required"),
      });
    } else {
      schema = ProfileFormSchema;
    }
    
    return schema;
  };

  // If no account type is selected, show the selection screen
  if (!selectedType) {
    return (
      <div className="flex flex-col gap-8 w-3xl max-w-full text-black/80">
        <StepInfo title="Complete Profile">
          Your account will be created once all required information is provided.
          <br className="hidden sm:block" />
          Select your user type to begin.
        </StepInfo>
        <div className="flex flex-row gap-4 justify-start">
          <Button
            className="flex-1 sm:flex-none sm:w-auto"
            variant="select"
            onClick={() => handleTypeChange("personal")}
          >
            <UserProfile className="w-5 h-5" />
            Personal
          </Button>
          <Button
            className="flex-1 sm:flex-none sm:w-auto"
            variant="select"
            onClick={() => handleTypeChange("corporate")}
          >
            <BuildingOffice className="w-5 h-5" />
            Corporate
          </Button>
        </div>
      </div>
    );
  }

  const isPersonal = selectedType === "personal";

  return (
    <div className="flex flex-col gap-8 w-3xl max-w-full text-black/80">
      <StepInfo title="Complete Profile">
        Your account will be created once all required information is provided.
        <br className="hidden sm:block" />
        Select your user type to begin.
      </StepInfo>
      
      {/* Account Type Selection - Always Visible */}
      <div className="flex flex-row gap-4 justify-start">
        <Button
          className={`flex-1 sm:flex-none sm:w-auto ${selectedType === "personal" ? "selected" : ""}`}
          variant="select"
          onClick={() => handleTypeChange("personal")}
        >
          <UserProfile className="w-5 h-5" />
          Personal
        </Button>
        <Button
          className={`flex-1 sm:flex-none sm:w-auto ${selectedType === "corporate" ? "selected" : ""}`}
          variant="select"
          onClick={() => handleTypeChange("corporate")}
        >
          <BuildingOffice className="w-5 h-5" />
          Corporate
        </Button>
      </div>

      {/* Form */}
      <Form
        key={`${selectedType}-${defaultValues.contact_email}-${defaultValues.first_name}`} // Force re-render when account type or data changes
        className="flex flex-col gap-5 w-full text-black/80"
        onSubmit={updateProfile}
        schema={getDynamicSchema()}
        defaultValues={defaultValues}
        fieldsGroups={[
      {
        children: (
          <div className="text-xl text-black font-medium">Contact Info</div>
        ),
      },
      ...(isPersonal ? [
        {
          label: "* Full Name ( Contact Person )",
          className: "basis-full [&_[data-labels]]:flex [&_[data-labels]]:flex-col [&_[data-labels]]:gap-5 xs:[&_[data-labels]]:flex-row",
          fields: [
            {
              name: "first_name",
              type: "text",
              placeholder: "First Name",
              className: "w-full xs:flex-1",
            },
            {
              name: "last_name",
              type: "text",
              placeholder: "Last Name",
              className: "w-full xs:flex-1",
            },
          ],
        },
      ] : []),
      {
        label: "* Email Address",
        className: "basis-full",
        fields: [
          {
            name: "contact_email",
            type: "email",
            placeholder: "you@example.com",
            className: "basis-full",
          },
        ],
      },
      {
        label: "Address (Optional)",
        className: "basis-full",
        fields: [
          {
            name: "address",
            type: "text",
            placeholder: "Your address",
            className: "basis-full",
          },
        ],
      },
      ...(isPersonal ? [] : [
        {
          children: (
            <Hr className="w-full my-5 h-px border-none bg-[rgba(19,19,20,0.20)]" />
          ),
        },
        {
          children: (
            <div className="text-xl text-black font-medium w-full">
              Organization / Company Info
            </div>
          ),
        },
        {
          label: "* Organization / Company Name",
          className: "basis-full",
          fields: [
            {
              name: "companyName",
              type: "text",
              placeholder: "Your company name",
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
              placeholder: "Your company name in Chinese",
              className: "basis-full",
            },
          ],
        },
        {
          label: "* Taiwan UBN (8-digit Uniform Business Number)",
          className: "basis-full",
          fields: [
            {
              name: "businessId",
              type: "text",
              placeholder: "8-digit Taiwan UBN",
              className: "basis-full",
            },
          ],
        },
        {
          label: "* Organization / Company Address",
          className: "basis-full",
          fields: [
            {
              name: "companyAddress",
              type: "text",
              placeholder: "Your company address",
              className: "basis-full",
            },
          ],
        },
      ] as Array<Record<string, unknown>>),
    ] as Array<Record<string, unknown>>}
      >
        <Confirm cancelClick={() => router.back()}>
          <Button
            variant="auth"
            type="submit"
            loading={isPending || isLoading}
          >
            Continue
          </Button>
        </Confirm>
      </Form>
    </div>
  );
}
