"use client";

import * as z from "zod/v4";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@ui/button";
import { Form, StepInfo } from "@ui/form";
import { Confirm } from "@ui/confirm";
import { Message } from "@modals/views";
import { useModal } from "@modals/context";
import { useCurrentRequest } from "@/hooks/use-current-request";
import { useMeetingId } from "@/hooks/use-meeting-id";
import type { Session } from "next-auth";
import { CheckoutSchema } from "./state";
import { OrderSummary } from "./order-summary";
import { PaymentConfirm } from "./payment-confirm";
import { useInvoiceUpdate } from "./use-invoice-update";
import { useInvoiceDefault } from "./use-invoice-default";
import { LoadingBlock } from "@dashboard/loading-block";
import { usePaymentFlow } from "../../../../../src/hooks/use-payment-flow";
import { useMeetingDetails } from "./use-meeting-details";
import { useCheckout } from "./use-checkout";
import { step1Fields } from "./step1-fields";

export const Step1: React.FC<{ user: Session["user"] }> = ({ user }) => {
  const {
    currentRequest: { buyer, appId },
  } = useCurrentRequest();

  // meetingId 解析邏輯
  const { getMeetingIdAsNumber } = useMeetingId();
  let meetingId: number = 53;
  const idFromHook = getMeetingIdAsNumber();
  let paramId: string | null = null;
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    paramId = searchParams.get("meetingId");
  }
  if (typeof idFromHook === "number" && !isNaN(idFromHook)) {
    meetingId = idFromHook;
  } else if (paramId && !isNaN(Number(paramId))) {
    meetingId = Number(paramId);
  }

  // 所有 hooks 放在最上面
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement>(null);
  const hasShownErrorRef = useRef(false);
  const [confirm, setConfirm] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const { data: session } = useSession();
  const { openModal, closeModal } = useModal();

  // 修正：總是調用 useInvoiceDefault，但傳入適當的參數
  const hasSession = !!session && !!session.user && typeof session.user.adminToken !== "undefined";
  const invoiceDefaultResult = useInvoiceDefault(
    hasSession ? session : null, 
    user.email ?? ""
  );

  // 根據是否有 session 來決定使用哪個值
  const defaultValues = hasSession 
    ? invoiceDefaultResult.defaultValues 
    : { tax_email: user.email ?? "", tax_title: "", tax_id: "" };
  const isProfileLoading = hasSession ? invoiceDefaultResult.isLoading : false;

  const { data: meetingDetailsData, isLoading: isMeetingDetailsLoading } =
    useMeetingDetails(meetingId, session);
  const { isPending: isInvoiceUpdating, updateInvoice } = useInvoiceUpdate();
  const { isPending: isCheckoutPending, mutate: checkoutMutate } =
    useCheckout(session);
  const { isPending: isPaymentPending, mutate: paymentFlowMutate } =
    usePaymentFlow(session);

  // 表單送出邏輯
  const handleFormSubmit: SubmitHandler<z.infer<typeof CheckoutSchema>> = async (
    data
  ) => {
    if (!session?.user.adminToken) return;

    const processedData = {
      ...data,
      tax_id: data.tax_id?.trim() || "",
      tax_title: data.tax_title?.trim() || "-",
    };

    updateInvoice(processedData);

    checkoutMutate(
      { meeting_id: meetingId },
      {
        onSuccess: (response) => {
          const checkoutData = response.data;
          if (!checkoutData?.order_number) {
            console.error("No order_number received from checkout API");
            openModal(
              <Message
                title="Checkout Error"
                closeModal={async () => {
                  await closeModal();
                  router.back();
                }}
              >
                Invalid response from checkout API. Please try again.
              </Message>
            );
            return;
          }
          paymentFlowMutate({
            gateway_id: 25,
            order_id: checkoutData.order_number,
            tax_id: processedData.tax_id,
            tax_title: processedData.tax_title,
            tax_email: processedData.tax_email,
          });
        },
        onError: (error) => {
          console.error("Checkout API failed:", error);
        },
      }
    );
  };

  const isPending =
    isInvoiceUpdating || isCheckoutPending || isPaymentPending || isProfileLoading;

  const [shouldShowError, setShouldShowError] = useState(false);

  useEffect(() => {
    if (meetingId) {
      setShouldShowError(false);
      return;
    }
    if (buyer && appId) {
      setShouldShowError(false);
      return;
    }
    setShouldShowError(true);
  }, [buyer, appId, meetingId]);

  useEffect(() => {
    if (!shouldShowError || hasShownErrorRef.current) return;

    hasShownErrorRef.current = true;

    openModal(
      <Message
        closeModal={async () => {
          await closeModal();
          router.back();
        }}
      >
        Appointment Not Found
      </Message>
    );
  }, [shouldShowError]);

  if (isPending || !session) {
    return <LoadingBlock className="w-3xl max-w-full" />;
  }

  return (
    <div
      className={clsx(
        "error-status",
        "w-7xl max-w-full flex flex-col gap-5 text-black"
      )}
    >
      <StepInfo title="Checkout" />
      <div className="flex sm:gap-15 flex-col sm:flex-row">
        {/* Form */}
        <Form
          key={`checkout-${defaultValues.tax_email}-${defaultValues.tax_title}-${defaultValues.tax_id}`}
          className="flex flex-col gap-5 basis-full sm:basis-1/2 text-black/80"
          onSubmit={handleFormSubmit}
          schema={CheckoutSchema}
          defaultValues={defaultValues}
          fieldsGroups={step1Fields}
        >
          <button ref={submitRef} className="hidden" type="submit" />
        </Form>
        <div className="basis-full sm:basis-1/2 flex flex-col gap-5">
          <OrderSummary
            meetingDetails={meetingDetailsData ?? undefined}
            isLoading={isMeetingDetailsLoading}
          />
          <PaymentConfirm
            confirm={confirm}
            setConfirm={setConfirm}
            accepted={accepted}
            setAccepted={setAccepted}
          />
        </div>
      </div>
      <Confirm cancelClick={() => router.back()}>
        <Button
          data-submit
          loading={isPending}
          disabled={!confirm || !accepted}
          onClick={() => {
            if (!submitRef.current) return;
            submitRef.current.click();
          }}
          className="w-full xs:w-auto px-10"
          variant="auth"
        >
          Make the Payment
        </Button>
      </Confirm>
    </div>
  );
};