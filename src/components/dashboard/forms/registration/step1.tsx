"use client";

import * as z from "zod/v4";
import { useParticipantDefault } from "./use-participant-default";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form, StepInfo } from "@ui/form";
import { Button } from "@ui/button";
import { Confirm } from "@ui/confirm";
import { LoadingBlock } from "@dashboard/loading-block";
import { RegistrationFormSchema } from "./state";
import { useParticipantUpdate } from "./use-participant-update";
import { step1Fields } from "./step1-fields";

interface Step1Props {
  mode?: 'create' | 'edit';
  onSaveComplete?: () => void; // 編輯完成後的回調
}

export const Step1: React.FC<Step1Props> = (props) => {
  const { mode = 'create', onSaveComplete } = props;
  const { data: session } = useSession();
  const router = useRouter();
  
  const phoneCodes = [{ id: "TW", name: "886" }];
  const { currentProfile, isFetching } = useParticipantDefault(
  session,
  phoneCodes
  );

  const { isPending, updateParticipant } = useParticipantUpdate();

  const isEditMode = mode === 'edit';
  const title = isEditMode ? 'Registration Information' : 'Complete Registration Form';
  const buttonText = isEditMode ? 'Save' : 'Continue';

  const handleSubmit = async (data: z.infer<typeof RegistrationFormSchema>) => {
    const searchParams = new URLSearchParams(window.location.search);
    const meetingId = searchParams.get('meetingId') || undefined;
    updateParticipant(data, meetingId);
    if (isEditMode && onSaveComplete) {
      onSaveComplete();
    }
  };

  if (isFetching || !session) {
    return <LoadingBlock className="w-3xl max-w-full" />;
  }

  return (
    <div className="flex flex-col gap-8 w-3xl max-w-full text-black/80">
      <StepInfo title={title} />
      <Form
        key={`registration-${currentProfile?.firstName}-${currentProfile?.lastName}-${currentProfile?.emailAddress}-${currentProfile?.jobTitle}-${currentProfile?.companyName}`}
        className="flex flex-col gap-5 w-full text-black/80"
        onSubmit={handleSubmit}
        schema={RegistrationFormSchema}
        defaultValues={currentProfile}
        fieldsGroups={step1Fields}
      >
        <div className="flex flex-col xs:flex-row w-full xs:justify-end gap-4">
          <Confirm cancelClick={() => router.back()}>
            <Button
              variant="auth"
              type="submit"
              loading={isPending || isFetching}
              className="w-full xs:w-auto"
            >
              {buttonText}
            </Button>
          </Confirm>
        </div>
      </Form>
    </div>
  );
};
