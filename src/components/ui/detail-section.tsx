import React from "react";
// import { EditIcon } from "@/components/icons";

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
  showEditButton?: boolean;
  onEdit?: () => void;
}

export const DetailSection: React.FC<DetailSectionProps> = ({ 
  title, 
  children, 
  // showEditButton = false,
  // onEdit 
}) => {
  return (
    <div className="flex-1 relative min-w-0 overflow-hidden">
      <div className="flex justify-between items-start self-stretch mb-4">
        <h3 className="text-medtex-blue font-bold leading-[30px] sm:text-lg text-base">
          {title}
        </h3>
        {/* Edit 按鈕暫時註解 */}
        {/**
        {showEditButton && (
          <button 
            onClick={onEdit}
            className="sm:hidden flex items-center gap-2 text-[#0098C6] font-medium leading-[30px] sm:text-base text-sm hover:text-[#007ba3] transition-colors flex-shrink-0"
          >
            <EditIcon className="w-4 h-4" />
            Edit
          </button>
        )}
        */}
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};
