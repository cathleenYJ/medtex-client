"use client";

import { useRef, useState, useEffect } from "react";
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
    resend: () => Promise<void>;
  }
> = ({ user_id, email, password, resend }) => {
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
        // 先執行登入和導向，成功後再關閉 modal
        await loginFlow({
          username: email,
          password,
          redirectTo: `${Routes.private.profileForm}/1`,
        });
        // 導向成功後才關閉 modal
        closeModal();
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
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '']);
  const [countdown, setCountdown] = useState(60); // 初始就開始倒數，因為剛註冊會收到郵件
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 倒數計時效果
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // 發送郵件時啟動倒數
  const handleResend = () => {
    setCountdown(60);
    resendFetch();
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // 只允許一個字符
    
    const newCode = [...codeDigits];
    newCode[index] = value;
    setCodeDigits(newCode);

    // 自動跳到下一個輸入框
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      // 如果當前框為空且按下退格，跳到前一個框
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter' && codeDigits.every(c => c !== '')) {
      verify();
    }
  };

  const codeString = codeDigits.join('');
  const isCodeComplete = codeString.length === 5;

  const tryAgain = () => {
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
    if (!isCodeComplete) return;
    verifyFetch({ user_id, code: codeString });
  };

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <Mail className="mx-auto size-15" />
        <div className="flex flex-col gap-3">
          <Title>Verify your email</Title>
          <div className="flex flex-col gap-2 text-black text-center text-sm">
            <div>Almost there! We’ve sent a verification email to {email}</div>
            <div>You need to verify your email address to continue.</div>
          </div>
        </div>
      </div>
      {/* 驗證碼輸入框 - 5個獨立的小框 */}
      <div className="flex gap-3 justify-center">
        {codeDigits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value.toUpperCase())}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="flex w-9 h-12 flex-col justify-center items-center gap-2.5 rounded border border-black/40 text-center text-lg font-medium focus:border-blue-500 focus:outline-none bg-white text-black"
            placeholder=""
          />
        ))}
      </div>
      {/* 根據輸入狀態顯示不同按鈕 */}
      <div className="flex justify-center">
        {isCodeComplete ? (
          <Button
            variant="modal"
            disabled={!isCodeComplete}
            onClick={verify}
            loading={verifyIng || isPending}
            className="!w-55"
          >
            Verified
          </Button>
        ) : (
          <Button
            variant="modal"
            loading={resendIng}
            disabled={countdown > 0}
            onClick={handleResend}
            className="!w-55"
          >
            {countdown > 0 ? `Resend email (${countdown}s)` : 'Resend email'}
          </Button>
        )}
      </div>
    </Container>
  );
};
