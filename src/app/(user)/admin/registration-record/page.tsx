"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { SearchBox } from "@ui/search-box";
import { Tabs, TabItem } from "@ui/tabs";
import { LoadingBlock } from "@dashboard/loading-block";
import { RegistrationCard, RegistrationCardData } from "@ui/registration-card";
import { fetchData } from "@/data/fetch-data";
import { useMeetingId } from "@/hooks/use-meeting-id";
import { getRegistrationData } from "./get-data";

// 擴充 RegistrationCardData 型別，加入 buttonLabel
type RegistrationTable = RegistrationCardData;
export default function RegistrationRecordPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get meeting_id from URL parameters (same as checkout step1)
  const { getMeetingIdAsNumber } = useMeetingId();
  const meetingId = getMeetingIdAsNumber();
  const safeMeetingId = meetingId ?? 0;

  // 先取得所有活動資訊
  const { data: allMeetingsData, isLoading: isAllMeetingsLoading } = useQuery({
    queryKey: ["all-meetings", meetingId],
    queryFn: () => fetchData.admin.meetingDetails(safeMeetingId, session),
    enabled: !!session?.user.adminToken,
  });
  // 取得所有活動 id 陣列
  const meetingsArr = useMemo((): Array<{ id: number; title: string; amount: number; start_time: string; end_time: string; address: string }> => {
    if (!allMeetingsData) return [];
    // 支援 { data: { meetings: [...] } } 結構
    if (
      typeof allMeetingsData === "object" &&
      "data" in allMeetingsData &&
      allMeetingsData.data &&
      typeof allMeetingsData.data === "object"
    ) {
      const dataObj = allMeetingsData.data as Record<string, unknown>;
      if (
        "meetings" in dataObj &&
        Array.isArray((dataObj.meetings))
      ) {
        return dataObj.meetings as Array<{ id: number; title: string; amount: number; start_time: string; end_time: string; address: string }>;
      }
      if (Array.isArray(allMeetingsData.data)) {
        return allMeetingsData.data as Array<{ id: number; title: string; amount: number; start_time: string; end_time: string; address: string }>;
      }
    }
    // 支援直接回傳陣列
    if (Array.isArray(allMeetingsData)) {
      return allMeetingsData as Array<{ id: number; title: string; amount: number; start_time: string; end_time: string; address: string }>;
    }
    return [];
  }, [allMeetingsData]);

  // 批量請求所有活動報名資料
  const meetingIds = useMemo(() => meetingsArr.map((m) => m.id), [meetingsArr]);
  const { data: batchOrderDetails, isLoading: isBatchLoading } = useQuery({
    queryKey: ["order-meeting-details-batch", meetingIds],
    queryFn: () => fetchData.admin.meetingsDetails(meetingIds, session),
    enabled: !!session?.user.adminToken && meetingIds.length > 0 && !isAllMeetingsLoading,
  });
  const isLoading = isAllMeetingsLoading || isBatchLoading;
  // 轉換 API 資料為 RegistrationCardData 格式
  const registrationData: RegistrationTable[] = useMemo(() => {
    return getRegistrationData(
      meetingsArr,
      { data: Array.isArray(batchOrderDetails?.data) ? batchOrderDetails.data ?? [] : [] }
    );
  }, [batchOrderDetails, meetingsArr]);

  // 根據 tab 分類資料 - 基於 meeting_details.start_time
  const { upcomingData, completedData } = useMemo(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // 設定為當天的開始時間
    
    // 使用會議開始時間進行分類
    const upcoming = registrationData.filter((item: RegistrationTable) => {
      const meetingStartTime = new Date(item.start_time as string);
      meetingStartTime.setHours(0, 0, 0, 0);
      
      // 如果會議開始日期大於等於今天，則為 upcoming
      return meetingStartTime >= currentDate;
    });
    
    const completed = registrationData.filter((item: RegistrationTable) => {
      const meetingStartTime = new Date(item.start_time as string);
      meetingStartTime.setHours(0, 0, 0, 0);
      
      // 如果會議開始日期小於今天，則為 completed
      return meetingStartTime < currentDate;
    });
    
    return { upcomingData: upcoming, completedData: completed };
  }, [registrationData]);

  // 過濾資料根據搜尋條件
  const getFilteredData = (tabData: RegistrationTable[]) => {
    return tabData?.filter((item) => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      
      // 將 ReactNode 轉換為字串進行搜尋
      const getString = (node: React.ReactNode): string => {
        if (typeof node === 'string' || typeof node === 'number') {
          return String(node);
        }
        return "";
      };
      
      const eventName = getString(item.event_name);
      const status = getString(item.status);
      const participantName = getString(item.participant_name);
      const company = getString(item.company);
      const note = getString(item.note);
      const registrationDate = getString(item.registration_date);
      
      return (
        eventName.toLowerCase().includes(searchLower) ||
        status.toLowerCase().includes(searchLower) ||
        participantName.toLowerCase().includes(searchLower) ||
        company.toLowerCase().includes(searchLower) ||
        note.toLowerCase().includes(searchLower) ||
        registrationDate.toLowerCase().includes(searchLower)
      );
    });
  };

  const renderTable = (tabData: RegistrationTable[]) => {
    const filteredData = getFilteredData(tabData);
    
    // 判斷是否為 Previous Event tab
    const isPreviousEvent = tabData === completedData;
    return (
      <div className="space-y-4">
        {filteredData?.length > 0 ? (
          filteredData.map((item, index) => (
            <RegistrationCard key={index} data={{ ...item, is_previous_event: isPreviousEvent }} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No registrations found
          </div>
        )}
      </div>
    );
  };

  const tabItems: TabItem[] = [
    {
      key: "upcoming",
      label: "Upcoming",
      content: renderTable(upcomingData),
    },
    {
      key: "previous",
      label: "Previous Event",
      content: renderTable(completedData),
    },
  ];

  return (
    <div>
      {!session || isLoading ? (
        <LoadingBlock />
      ) : (
        <div className="space-y-6">
          <SearchBox
            placeholder="Search"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Tabs
            items={tabItems}
            defaultActiveKey="upcoming"
          />
        </div>
      )}
    </div>
  );
}
