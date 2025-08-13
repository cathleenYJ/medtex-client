import React from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";

interface QRCodeModalProps {
  isOpen: boolean;
  ticketNo: string;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, ticketNo, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="flex w-[305px] p-10 flex-col items-start gap-2.5 rounded-xl bg-white shadow-[0_4px_24px_0_rgba(255,255,255,0.16)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* QR Code */}
        {/* <div className="w-[283.235px] h-[283.235px] flex-shrink-0 aspect-square bg-gray-100 rounded border flex items-center justify-center self-center">
          <QRCodeIcon className="w-full h-full" />
        </div> */}
        <div className="w-[230px] h-[230px] flex-shrink-0 aspect-square bg-gray-100 rounded flex items-center justify-center self-center">
          <QRCode value={ticketNo} size={230} />
        </div>
        
        {/* Ticket No */}
        <div className="self-stretch flex justify-between items-center mt-4">
          <span className="text-medtex-gray-lv4 font-normal text-base leading-7" style={{ fontFeatureSettings: "'liga' off, 'clig' off", fontFamily: 'Inter' }}>
            Ticket No.
          </span>
          <span className="text-medtex-blue font-normal text-base leading-7" style={{ fontFeatureSettings: "'liga' off, 'clig' off", fontFamily: 'Inter' }}>
            {ticketNo}
          </span>
        </div>
        
        {/* Close Button */}
        <Button
          variant="auth"
          onClick={onClose}
          className="!w-full mt-4"
        >
          Close
        </Button>
      </div>
    </div>
  );
};
