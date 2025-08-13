import React from "react";

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

export const DetailRow: React.FC<DetailRowProps> = ({ 
  label, 
  value
}) => {
  return (
    <div className="flex sm:items-center items-start overflow-hidden">
      <span className={`text-medtex-gray-lv4 font-normal leading-7 w-[120px] flex-shrink-0 sm:text-base text-sm`}>
        {label}
      </span>
      <span className="text-medtex-blue font-normal leading-7 break-all flex-1 min-w-0 sm:text-base text-sm">
        {value || '-'}
      </span>
    </div>
  );
};
