import React from "react";
import { DetailSection } from "./detail-section";
import { DetailRow } from "./detail-row";
// import { EditIcon } from "@/components/icons";s
import { RegistrationCardData } from "./registration-card";

interface ExpandedContentProps {
  data: RegistrationCardData;
  onEdit?: () => void;
}

export const ExpandedContent: React.FC<ExpandedContentProps> = ({ data, onEdit }) => {
  return (
    <>
      {/* 分隔線 - 與標題對齊 */}
      <div className="w-full sm:pl-[102px] pl-0">
        <div className="h-px bg-[#D9D9D9]"></div>
      </div>
      
      {/* 詳細資訊容器 */}
      <div className="w-full flex sm:flex-row flex-col sm:items-start items-start sm:justify-between justify-start sm:pl-[102px] pl-0 sm:pr-4 pr-0 sm:gap-0 gap-6 overflow-hidden">
        {/* Payment History 和 Participant Details */}
        <div className="flex sm:flex-row flex-col sm:items-start items-start sm:gap-[60px] gap-6 flex-1 sm:pr-8 pr-0 min-w-0 overflow-hidden">
          {/* Payment History */}
          <DetailSection title="Payment History">
            <DetailRow label="Register Time" value={data.register_time} />
            <DetailRow label="Price" value={data.price} />
            <DetailRow label="Status" value={data.status} />
            <DetailRow label="Invoice" value={data.invoice} />
          </DetailSection>

          {/* Participant Details */}
          <DetailSection 
            title="Participant Details"
            showEditButton={true}
            onEdit={onEdit}
          >
            <DetailRow label="Name" value={data.participant_name} />
            <DetailRow label="Job Position" value={data.job_position} />
            <DetailRow label="Mobile No." value={data.mobile} />
            <DetailRow label="Email" value={data.email} />
            <DetailRow label="Dietary" value={data.dietary} />
          </DetailSection>
        </div>

        {/* 編輯按鈕 - 大螢幕時在右側 (暫時註解) */}
        {/**
        <button 
          onClick={onEdit}
          className="sm:flex hidden items-center gap-2 text-[#0098C6] font-medium text-base leading-[30px] hover:text-[#007ba3] transition-colors flex-shrink-0"
        >
          <EditIcon />
          Edit
        </button>
        */}
      </div>
    </>
  );
};
