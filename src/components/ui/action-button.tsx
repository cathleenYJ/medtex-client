import React from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  isPaymentComplete?: boolean;
  isRegistered?: boolean;
  ticketNumber?: string;
  meetingId?: number;
  onQRClick?: () => void;
  onContinueClick?: (meetingId?: number) => void;
  onRegisterClick?: (meetingId?: number) => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  isPaymentComplete,
  isRegistered,
  ticketNumber,
  meetingId,
  onQRClick,
  onContinueClick,
  onRegisterClick
}) => {
  if (isPaymentComplete) {
    // 已完成付款 - 顯示 QR Code
    return (
      <button 
        onClick={onQRClick}
        className="flex sm:p-1.5 sm:px-2.5 p-[6px] px-[10px] justify-start items-center sm:gap-2.5 gap-[10px] rounded-md border border-medtex-gray bg-white hover:bg-gray-50 transition-colors sm:w-auto sm:flex-none flex-1 sm:h-10 h-[40px]"
      >
        <div className="flex items-center gap-2">
          <div className="w-[32px] h-[32px] flex-shrink-0 aspect-square bg-gray-100 rounded flex items-center justify-center self-center">
            <QRCode value={ticketNumber || ''} size={28} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[#9E9EAB] font-normal leading-5 sm:text-sm text-xs">
              Ticket No:
            </span>
            <span className="text-medtex-blue font-normal leading-6 sm:text-sm text-xs">
              {ticketNumber}
            </span>
          </div>
        </div>
      </button>
    );
  }

  if (isRegistered) {
    // 已註冊但未付款 - 顯示 Continue 按鈕
    return (
      <Button
        variant="auth"
        className="sm:!w-[130px] sm:!h-auto !h-10 sm:flex-none flex-1"
        onClick={() => onContinueClick?.(meetingId)}
      >
        Continue
      </Button>
    );
  }

  // 未註冊 - 顯示 Register 按鈕
  return (
    <Button
      variant="auth"
      className="sm:!w-[130px] sm:!h-auto !h-10 sm:flex-none flex-1"
      onClick={() => onRegisterClick?.(meetingId)}
    >
      Register
    </Button>
  );
};
