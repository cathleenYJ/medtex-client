"use client";

import * as z from "zod/v4";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ul } from "@ui/ul";
import { Button } from "@ui/button";
import { Form, StepInfo } from "@ui/form";
import { Confirm } from "@ui/confirm";
import { Message } from "@modals/views";
import { useModal } from "@modals/context";
import { useCurrentRequest } from "@/hooks/use-current-request";
import { useMeetingId } from "@/hooks/use-meeting-id";
import { fetchData } from "@/data/fetch-data";
import type { PaymentData } from "@/types";
import type { Session } from "next-auth";
import { CheckoutSchema } from "./state";
import { OrderSummary } from "./order-summary";
import { PaymentConfirm } from "./payment-confirm";
import { useInvoiceUpdate } from "./use-invoice-update";

export const Step1: React.FC<{ user: Session["user"] }> = ({ user }) => {
  const {
    currentRequest: { buyer, appId },
  } = useCurrentRequest();
  
  // 先取得 getMeetingIdAsNumber，若無則從 URL search param 取得
  const { getMeetingIdAsNumber } = useMeetingId();
  let meetingId: number = 53;
  const idFromHook = getMeetingIdAsNumber();
  let paramId: string | null = null;
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    paramId = searchParams.get('meetingId');
  }
  
  if (typeof idFromHook === 'number' && !isNaN(idFromHook)) {
    meetingId = idFromHook;
  } else if (paramId && !isNaN(Number(paramId))) {
    meetingId = Number(paramId);
  }
  
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement>(null);
  const hasShownErrorRef = useRef(false);
  const [confirm, setConfirm] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const { data: session } = useSession();
  const { openModal, closeModal } = useModal();
  const [defaultValues, setDefaultValues] = useState({
    tax_email: "",
    tax_title: "",
    tax_id: "",
  });
  const [, setIsFormReady] = useState(false);

    // 根據 meetingId 請求 meetingDetails
  const { data: meetingDetailsData, isLoading: isMeetingDetailsLoading } = useQuery({
    queryKey: ["meeting-details", meetingId],
    queryFn: () => fetchData.admin.meetingDetails(meetingId, session),
    enabled: !!session?.user.adminToken && !!meetingId,
  });

  // Fetch profile data to prefill form
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile-data"],
    queryFn: () => fetchData.sellers.getProfileData(session),
    enabled: !!session?.user.adminToken,
  });

  // Update default values when profile data is loaded
  useEffect(() => {
    if (profileData?.data) {
      const { invoice_info, profile_info, participant_info } = profileData.data;
      
      const newValues = {
        // Email: 優先使用 invoice_info，再使用 profile_info
        tax_email: invoice_info?.invoice_email || profile_info?.contact_email || user.email || "",
        // Company Title: 優先使用 invoice_info，再使用 participant_info，最後使用 profile_info
        tax_title: invoice_info?.invoice_company_name || 
                   participant_info?.participant_company_name_zh || 
                   participant_info?.participant_company_name || "",
        // Tax ID: 優先使用 invoice_info，再使用 profile_info
        tax_id: invoice_info?.invoice_business_id || profile_info?.business_id || "",
      };
      
      setDefaultValues(newValues);
      setIsFormReady(true);
    } else if (!isProfileLoading) {
      // If no profile data and not loading, use fallback values
      const fallbackValues = {
        tax_email: user.email || "",
        tax_title: "",
        tax_id: "",
      };
      setDefaultValues(fallbackValues);
      setIsFormReady(true);
    }
  }, [profileData, isProfileLoading, user.email]);
  
  // Use the invoice update hook instead of payment mutation
  const { isPending: isInvoiceUpdating, updateInvoice } = useInvoiceUpdate();
  // Add mutation for AUTH_CHECKOUT API
  const { isPending: isCheckoutPending, mutate: callCheckoutAPI } = useMutation({
    mutationKey: ["auth-checkout"],
    mutationFn: (meetingId: number) => fetchData.admin.checkout({ meeting_id: meetingId }, session),
    onError: (error) => {
      console.error("Checkout API failed:", error);
      openModal(
        <Message
          title="Checkout Failed"
          closeModal={async () => {
            await closeModal();
            router.back();
          }}
        >
          Failed to process checkout. Please try again.
        </Message>
      );
    },
  });
  // Keep the payment mutation for making payment after checkout
  const { isPending: isPaymentPending, mutate: makePaymentMutation } = useMutation({
    // Use the new API endpoint for payme
    mutationKey: ["checkout"],
    mutationFn: (data: PaymentData) =>{
  return fetch("/api/transform/payment", {
    method: "POST",
    body: JSON.stringify(data),
  });
},
    onSuccess: async (res) => {
      const formHtml = await res.text();
      const hasError = formHtml.includes('"success":false');
      if (hasError) {
        const errors = JSON.parse(formHtml);
        openModal(
          <Message
            title="Payment Failed"
            closeModal={async () => {
              await closeModal();
              router.back();
            }}
          >
            {errors.message}
          </Message>
        );
      } else {
        // 參考 ECPaySubmit: 先 JSON.parse formHtml，再插入並自動提交
        let html = "";
        try {
          html = JSON.parse(formHtml || "");
        } catch {
          html = formHtml;
        }
        const container = document.createElement("div");
        container.style.display = "none";
        container.innerHTML = html;
        document.body.appendChild(container);
        const form = container.querySelector("form");
        if (form) {
          form.submit();
        }
      }
    },
  });

  // Handler for form submission - update invoice, call checkout API, then make payment
  const handleFormSubmit: SubmitHandler<z.infer<typeof CheckoutSchema>> = async (data) => {
    if (!session?.user.adminToken) return;
    
    // 處理非必填欄位：Company Title 如果為空則自動帶入 "-"
    const processedData = {
      ...data,
      tax_id: data.tax_id?.trim() || "",
      tax_title: data.tax_title?.trim() || "-",
    };
    
    // Step 1: Update invoice information
    updateInvoice(processedData);
    
    // Step 2: Use resolved meetingId for checkout (fallback to 53)
    callCheckoutAPI(meetingId, {
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
        // Step 3: Make payment with order_number from checkout response
        makePaymentMutation({ 
          gateway_id: 25, 
          order_id: checkoutData.order_number, // Use order_number from checkout response as string
          tax_id: processedData.tax_id,
          tax_title: processedData.tax_title,
          tax_email: processedData.tax_email
        });
      },
      onError: (error) => {
        console.error("Checkout API failed:", error);
      }
    });
  };

  const isPending = isInvoiceUpdating || isCheckoutPending || isPaymentPending || isProfileLoading;

  const [shouldShowError, setShouldShowError] = useState(false);

  useEffect(() => {
    
    // If we have meetingId, we can proceed even without buyer/appId
    if (meetingId) {
      setShouldShowError(false);
      return;
    }
    
    // Original check for buyer and appId
    if (buyer && appId) {
      setShouldShowError(false);
      return;
    }
    
    // If we don't have any valid data, show error
    setShouldShowError(true);
  }, [buyer, appId, meetingId]);

  // Separate effect to handle modal display
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

  // 不再顯示 loading block，直接渲染表單

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
          key={`checkout-${defaultValues.tax_email}-${defaultValues.tax_title}-${defaultValues.tax_id}`} // Force re-render when data changes
          className="flex flex-col gap-5 basis-full sm:basis-1/2 text-black/80"
          onSubmit={handleFormSubmit}
          schema={CheckoutSchema}
          defaultValues={defaultValues}
        fieldsGroups={[
          {
            children: (
              <div className="text-xl text-black font-medium">Invoice</div>
            ),
          },
          {
            label: "＊ Invoice Email Address",
            className: "basis-full [&_[data-labels]]:flex-wrap",
            fields: [
              {
                name: "tax_email",
                type: "text",
                placeholder: "Email for receiving invoices",
              },
            ],
          },
          {
            label: "Taiwan UBN (8-digit Uniform Business Number)",
            className: "basis-full [&_[data-labels]]:flex-wrap",
            fields: [
              {
                name: "tax_id",
                type: "text",
                placeholder: "8-digit Taiwan UBN",
              },
            ],
          },
          {
            label: "Company Title",
            className: "basis-full [&_[data-labels]]:flex-wrap",
            fields: [
              {
                name: "tax_title",
                type: "text",
                placeholder: "Company’s full legal name (for invoicing)",
              },
            ],
          },
          {
            children: (
              <Ul className="text-xs">
                <li>
                  Once your event registration is confirmed, invoice details cannot be modified. Please review your invoice information carefully before completing registration.
                </li>
              </Ul>
            ),
          },
        ]}
        >
          <button ref={submitRef} className="hidden" type="submit" />
        </Form>
        <div className="basis-full sm:basis-1/2 flex flex-col gap-5">
          <OrderSummary meetingDetails={meetingDetailsData?.data} isLoading={isMeetingDetailsLoading} />
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
