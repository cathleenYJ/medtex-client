import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MedtexLogo, ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import { QRCodeModal } from "@/components/ui/qrcode-modal";
import { EventInfo } from "@/components/ui/event-info";
import { ActionButton } from "@/components/ui/action-button";
import { ExpandedContent } from "@/components/ui/expanded-content";
import { Routes } from "@/config/routes";

export interface RegistrationCardData {
  no: React.ReactNode;
  event_name: React.ReactNode;
  registration_date: React.ReactNode;
  start_time?: string;
  end_time?: string;
  status: React.ReactNode;
  participant_name: React.ReactNode;
  company: React.ReactNode;
  note: React.ReactNode;
  // 展開資訊
  price?: string;
  invoice?: string;
  job_position?: string;
  mobile?: string;
  email?: string;
  dietary?: string;
  register_time?: string;
  // 支付狀態
  is_payment_complete?: boolean;
  // 註冊狀態
  is_registered?: boolean;
  // Ticket number for QR code
  ticket_number?: string;
  // 會議詳細資訊
  meeting_title?: string;
  meeting_address?: string;
  meeting_id?: number;
  // 是否為 Previous Event
  is_previous_event?: boolean;
}

interface RegistrationCardProps {
  data: RegistrationCardData;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    // 導向編輯模式的註冊表單，使用 query 參數來標識編輯模式
    const targetPath = `${Routes.private.registrationForm}/1?mode=edit`;
    router.push(targetPath);
  };

  const handleRegister = (meetingId?: number) => {
    // 導向註冊表單的第一步，帶入 meetingId
    const targetPath = meetingId
      ? `${Routes.private.registrationForm}/1?meetingId=${meetingId}`
      : `${Routes.private.registrationForm}/1`;
    router.push(targetPath);
  };

  const handleContinue = (meetingId?: number) => {
    // Continue 按鈕也導向註冊表單的第一步，帶入 meetingId
    const targetPath = meetingId
      ? `${Routes.private.checkoutForm}/1?meetingId=${meetingId}`
      : `${Routes.private.checkoutForm}/1`;
    router.push(targetPath);
  };

  return (
    <div className="flex w-full p-6 flex-col justify-center items-center gap-4 rounded-lg bg-white shadow-sm border border-gray-100">
      <div className="flex sm:flex-row flex-col w-full sm:items-center items-start sm:gap-6 gap-4">
        {/* 左側圖片 */}
        <div className="flex-shrink-0 sm:order-1 order-1">
          <MedtexLogo className="sm:w-[86px] sm:h-[86px] w-[42px] h-[42px]" />
        </div>

        {/* 中間活動資訊 */}
        <EventInfo 
          eventName={data.meeting_title || "-"}
          startTime={data.start_time}
          endTime={data.end_time}
          meeting_address={data.meeting_address || "-"}
        />

        {/* 右側按鈕區域 */}
        <div className="flex-shrink-0 flex flex-col items-start gap-1 sm:order-3 order-3 sm:w-auto w-full">
          <div className="flex sm:items-center items-center sm:gap-3 gap-3 sm:flex-row flex-row sm:w-full w-full sm:p-0 p-0 sm:justify-start justify-start">
            {/* 主要操作按鈕 */}
            <ActionButton
              isPaymentComplete={data.is_payment_complete}
              isRegistered={data.is_registered}
              ticketNumber={data.ticket_number}
              meetingId={data.meeting_id}
              onQRClick={() => setIsQRModalOpen(true)}
              onContinueClick={handleContinue}
              onRegisterClick={handleRegister}
              disabled={!!data.is_previous_event}
            />
            
            {/* 展開按鈕 */}
            {(data.is_registered || data.is_payment_complete) && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex p-2.5 items-center gap-2.5 rounded-lg bg-[#F4F3FA] hover:bg-gray-200 transition-colors sm:w-auto sm:h-auto w-10 h-10 justify-center flex-shrink-0"
              >
                {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            )}
          </div>
          
          {/* Payment Incomplete Message */}
          {data.is_registered && !data.is_payment_complete && (
            <span className="text-[#E71147] text-sm font-medium leading-6">
              Payment Incomplete
            </span>
          )}
        </div>
      </div>

      {/* 展開內容 */}
      {(data.is_registered || data.is_payment_complete) && isExpanded && (
        <ExpandedContent data={data} onEdit={handleEdit} />
      )}
      
      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)}
        ticketNo={data.ticket_number || '-'}
      />
    </div>
  );
};
