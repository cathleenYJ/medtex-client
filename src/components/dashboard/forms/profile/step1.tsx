"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserProfile, BuildingOffice } from "@icons";
import { Form, StepInfo } from "@ui/form";
import { Button } from "@ui/button";
import { Confirm } from "@ui/confirm";
import { LoadingBlock } from "@dashboard/loading-block";
import type { Session } from "next-auth";
import type { FormParams } from "@/types";
import { ProfileFormSchema } from "./state";
import { useProfileUpdate } from "./use-profile-update";
import { useProfileDefault } from "./use-profile-default";
import { step1Fields } from "./step1-fields";


export const Step1: React.FC<{ user: Session["user"] }> = ({ }) => {
  const { params: [, , step] } = useParams<FormParams>();
  const { data: session } = useSession();
  const { currentProfile, isFetching } = useProfileDefault(session as Session);
  const [selectedType, setSelectedType] = useState<"personal" | "corporate" | null>(null);
  const { isPending, updateProfile } = useProfileUpdate(selectedType, Number(step));

  // 根據 currentProfile 自動判斷 selectedType
  useEffect(() => {
    if (currentProfile) {
      if (currentProfile.account_type === "corporate" || currentProfile.account_type === "personal") {
        setSelectedType(currentProfile.account_type);
      } else {
        const hasCompletePersonalData = currentProfile.first_name && currentProfile.last_name;
        const hasCompleteCorporateData = currentProfile.companyName && currentProfile.businessId && currentProfile.companyAddress;
        if (hasCompleteCorporateData) {
          setSelectedType("corporate");
        } else if (hasCompletePersonalData) {
          setSelectedType("personal");
        }
      }
    }
  }, [currentProfile]);

  if (isFetching|| !session) {
    return <LoadingBlock className="w-3xl max-w-full" />;
  }

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
            onClick={() => setSelectedType("personal")}
          >
            <UserProfile className="w-5 h-5" />
            Personal
          </Button>
          <Button
            className="flex-1 sm:flex-none sm:w-auto"
            variant="select"
            onClick={() => setSelectedType("corporate")}
          >
            <BuildingOffice className="w-5 h-5" />
            Corporate
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-3xl max-w-full text-black/80">
      <StepInfo title="Complete Profile">
        Your account will be created once all required information is provided.
        <br className="hidden sm:block" />
        Select your user type to begin.
      </StepInfo>
      <div className="flex flex-row gap-4 justify-start">
        <Button
          className={`flex-1 sm:flex-none sm:w-auto ${selectedType === "personal" ? "selected" : ""}`}
          variant="select"
          onClick={() => setSelectedType("personal")}
        >
          <UserProfile className="w-5 h-5" />
          Personal
        </Button>
        <Button
          className={`flex-1 sm:flex-none sm:w-auto ${selectedType === "corporate" ? "selected" : ""}`}
          variant="select"
          onClick={() => setSelectedType("corporate")}
        >
          <BuildingOffice className="w-5 h-5" />
          Corporate
        </Button>
      </div>
      <Form
        key={`${selectedType}-${currentProfile?.contact_email}-${currentProfile?.first_name}`}
        className="flex flex-col gap-5 w-full text-black/80"
        onSubmit={(formData) => {
          updateProfile({ ...formData, account_type: selectedType });
        }}
        schema={ProfileFormSchema}
        defaultValues={{
          ...currentProfile,
          account_type: selectedType
        }}
        fieldsGroups={selectedType ? step1Fields(selectedType) : []}
      >
        <Confirm cancelClick={() => setSelectedType(null)}>
          <Button
            variant="auth"
            type="submit"
            loading={isPending}
          >
            Continue
          </Button>
        </Confirm>
      </Form>
    </div>
  );
}
