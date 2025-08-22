import { useMutation } from "@tanstack/react-query";
import { useModal } from "@modals/context";
import { Message, VertifyEmail } from "@modals/views";
import { fetchData } from "@/data/fetch-data";
import type { SignupData } from "@/components/auth";
import { ApiResponse } from "@/types";

const resend = async (data: Omit<SignupData, "terms">) =>
  await fetchData.auth.signup(data);

export const useSignupFlow = () => {
  const { openModal, closeModal } = useModal();
  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: resend,
    onSuccess: (res, data) => {
      openModal(
        <VertifyEmail
          user_id={res.data?.user_id ?? 0}
          email={data.email}
          password={data.password}
          resend={() => resend(data)}
        />
      );
    },
    onError: (err, data) => {
      if (err.message.includes("api.auth.go_step_2")) {
        const userId = (err.cause as ApiResponse<{ user_id: number }> | undefined)?.data?.user_id ?? 0;
        openModal(
          <VertifyEmail
            user_id={userId}
            email={data.email}
            password={data.password}
            resend={() => resend(data)}
          />
        );
      } else {
        openModal(
          <Message
            title="Failed to create account"
            btnCancel="Try again"
            closeModal={closeModal}
          >
            {err.message}
          </Message>
        );
      }
    },
  });

  return { signup: mutate, isPending };
};
