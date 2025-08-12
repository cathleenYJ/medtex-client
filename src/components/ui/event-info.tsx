import React from "react";
import { CalendarIcon, LocationIcon } from "@/components/icons";

interface EventInfoProps {
  eventName: string;
  startTime?: string; // 完整的日期時間字符串，格式：2025-12-05 10:00:00
  endTime?: string;   // 完整的日期時間字符串，格式：2025-12-05 11:00:00
  location?: string;
}

export const EventInfo: React.FC<EventInfoProps> = ({
  eventName,
  startTime,
  endTime,
  location = "南港展覽館 1館 4樓南港展覽館 1館 4樓"
}) => {
  const formatDateTime = () => {
    if (!startTime || !endTime) {
      return "Time TBD";
    }

    // 解析日期時間字符串，格式：2025-12-05 10:00:00
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    const startDateStr = startDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    const endDateStr = endDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    const startTimeStr = startDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    const endTimeStr = endDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    // 檢查是否為同一天
    if (startDateStr === endDateStr) {
      return `${startDateStr} · ${startTimeStr} – ${endTimeStr}`;
    } else {
      return `${startDateStr} ${startTimeStr} – ${endDateStr} ${endTimeStr}`;
    }
  };

  return (
    <div className="flex-1 space-y-2 sm:order-2 order-2">
      <div className="text-medtex-blue text-lg font-bold leading-[30px]">
        {eventName}
      </div>
      <div className="flex sm:items-center items-start gap-2 text-medtex-blue text-base leading-7">
        <CalendarIcon className="flex-shrink-0 sm:mt-0 mt-1" />
        <span className="break-words">{formatDateTime()}</span>
      </div>
      <div className="flex sm:items-center items-start gap-2 text-medtex-blue text-base leading-7">
        <LocationIcon className="flex-shrink-0 sm:mt-0 mt-1" />
        <span className="break-words">{location}</span>
      </div>
    </div>
  );
};
