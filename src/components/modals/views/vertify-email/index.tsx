"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { Mail } from "@icons";
import { Container, Title } from "@ui/modal";
import { Button } from "@ui/button";
import { useModal } from "@modals/context";
import { Message } from "@modals/views";
import { fetchData } from "@/data/fetch-data";
import { Routes } from "@/config/routes";
import { useLoginFlow } from "@/hooks/use-login-flow";
import { handleMultipleErrors } from "@/utils/clean-error-message";
import type { MailVerifyData, SignupResponse } from "@/types";

export const VertifyEmail: React.FC<
  SignupResponse & {
    email: string;
    password: string;
    resend: () => ReturnType<typeof fetchData.auth.signup>;
  }
> = ({ user_id, email, password, resend }) => {
    const [codeDigits, setCodeDigits] = useState(['', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { isPending, loginFlow } = useLoginFlow();
  const { data: session } = useSession();
  const { openModal, closeModal } = useModal();
  const { isPending: resendIng, mutate: resendFetch } = useMutation({
    mutationKey: ["resend", user_id],
    mutationFn: resend,
  });
  const { isPending: verifyIng, mutate: verifyFetch } = useMutation({
    mutationKey: ["verify", user_id],
    mutationFn: (data: MailVerifyData) =>
      fetchData.auth
        .mailVertify(data, session)
        .catch((err) => ({ success: false, message: err.message, data: null })),
    onSuccess: async (res) => {
      if (res.success) {
        loginFlow({
          username: email,
          password,
          redirectTo: `${Routes.private.profileForm}/1`,
        });
        await closeModal();
      } else {
        await closeModal();
        openModal(
          <Message closeModal={tryAgain}>
            {handleMultipleErrors(res?.data?.errors)}
          </Message>
        );
      }
    },
  });
    const [, setDisable] = useState(true);

  const tryAgain = async () => {
    await closeModal();
    openModal(
      <VertifyEmail
        user_id={user_id}
        email={email}
        password={password}
        resend={resend}
      />
    );
  };
    const verify = () => {
      const codeString = codeDigits.join('');
      if (codeString.length !== 5) return;
      verifyFetch({ user_id, code: codeString });
  };

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <Mail className="mx-auto size-15" />
        <div className="flex flex-col gap-3">
          <Title>Verify your email</Title>
          <div className="flex flex-col gap-2 text-center text-sm text-black">
            <div>Almost there! We’ve sent a verification email to {email}</div>
            <div>You need to verify your email address to continue.</div>
          </div>
        </div>
      </div>
        {/* 驗證碼輸入框 - 五個獨立 input 欄位 */}
        <div className="flex gap-3 justify-center">
          {codeDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                if (e.target.value.length > 1) return;
                const newCode = [...codeDigits];
                newCode[index] = e.target.value.toUpperCase();
                setCodeDigits(newCode);
                setDisable(newCode.some((c) => c === ''));
                if (e.target.value && index < 4) {
                  inputRefs.current[index + 1]?.focus();
                }
                if (newCode.every((c) => c !== '')) verify();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                } else if (e.key === 'Enter' && codeDigits.every(c => c !== '')) {
                  verify();
                }
              }}
              className="flex w-9 h-12 flex-col justify-center items-center gap-2.5 rounded border border-black/40 text-center text-lg font-medium focus:border-blue-500 focus:outline-none bg-white text-black"
              placeholder=""
            />
          ))}
        </div>
      <div className="flex justify-center gap-3">
        <Button
          variant="modal"
          disabled={codeDigits.some((c) => c === '')}
          loading={codeDigits.some((c) => c === '') ? resendIng : (verifyIng || isPending)}
          onClick={codeDigits.some((c) => c === '') ? resendFetch : verify}
          className="w-full max-w-55 mx-auto"
        >
          {codeDigits.some((c) => c === '') ? 'Resend email' : 'Verified'}
        </Button>
      </div>
    </Container>
  );
};
