"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { SearchBox } from "@ui/search-box";
import { Tabs, TabItem } from "@ui/tabs";
import { ExternalLink } from "@ui/external-link";
import { LoadingBlock } from "@dashboard/loading-block";
import { RegistrationCard, RegistrationCardData } from "@ui/registration-card";
import { fetchData } from "@/data/fetch-data";
import { useMeetingId } from "@/hooks/use-meeting-id";

type RegistrationTable = RegistrationCardData;

export default function RegistrationRecordPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get meeting_id from URL parameters (same as checkout step1)
  const { getMeetingIdAsNumber } = useMeetingId();
  const meetingId = getMeetingIdAsNumber();
  
  // 獲取單一會議的詳細資料
  const { data: meetingDetailsData, isLoading: isMeetingDetailsLoading } = useQuery({
    queryKey: ["meeting-details", meetingId],
    queryFn: () => {
      if (!meetingId) throw new Error("No meeting ID provided");
      return fetchData.admin.orderMeetingDetails(meetingId, session);
    },
    enabled: !!session?.user.adminToken && !!meetingId,
  });

  // 轉換 API 資料為 RegistrationCardData 格式
  const registrationData: RegistrationTable[] = useMemo(() => {
    if (!meetingDetailsData || meetingDetailsData.status !== "retrieved" || !meetingDetailsData.data) {
      return [];
    }
    
    const { orders, meeting_details, payment_history, participant_details } = meetingDetailsData.data;
    console.log("Meeting details data:", meetingDetailsData.data);
    
    // 為每個訂單創建一個註冊記錄
    return orders.map((order, index) => {
      // 找到對應的付款記錄
      const paymentInfo = payment_history.find(payment => payment.order_id === order.id);
      
      // 解析會議日期用於 registration_date
      const startDateTime = new Date(meeting_details.start_time);
      const meetingDate = startDateTime.toISOString().split('T')[0]; // YYYY-MM-DD
      
      // 使用 invoice_date 作為 registration_date，如果沒有則使用會議日期
      let registrationDate = meetingDate; // 預設使用會議日期
      let registerTime = "-"; // 預設值
      
      if (paymentInfo?.invoice_date) {
        const invoiceDate = new Date(paymentInfo.invoice_date * 1000); // Unix timestamp to Date
        registrationDate = invoiceDate.toISOString().split('T')[0]; // YYYY-MM-DD
        registerTime = invoiceDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      
      // 決定狀態 - 根據可能的狀態值：'pending','paying','paid','fail'
      let isRegistered = false;
      let isPaymentComplete = false;
      
      if (order.status === "paid") {
        isRegistered = true;
        isPaymentComplete = true;
      } else if (order.status === "pending" || order.status === "paying") {
        isRegistered = true;
        isPaymentComplete = false;
      } else if (order.status === "fail") {
        isRegistered = true;
        isPaymentComplete = false;
      }
      
      // 將狀態首字母大寫
      const capitalizeStatus = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
      };
      
      const registrationItem: RegistrationTable = {
        no: index + 1,
        event_name: <ExternalLink onClick={() => {}}>{meeting_details.title}</ExternalLink>,
        registration_date: registrationDate,
        start_time: meeting_details.start_time, // 傳入完整的日期時間字符串
        end_time: meeting_details.end_time,     // 傳入完整的日期時間字符串
        status: capitalizeStatus(order.status), // 首字母大寫的狀態
        participant_name: participant_details.participant_full_name,
        company: "-", // API 沒有提供公司資訊
        note: order.status === "fail" ? "付款失敗" : "-",
        price: `NT$${order.amount}`,
        invoice: paymentInfo?.invoice_number || "Pending",
        job_position: participant_details.job_title,
        mobile: participant_details.mobile_number || "-",
        email: participant_details.participant_email,
        register_time: registerTime,
        // 移除 dietary 欄位
        is_registered: isRegistered,
        is_payment_complete: isPaymentComplete,
        ticket_number: order.merchant_trade_no || `Order-${order.id}`,
        // 加入會議詳細資訊供 EventInfo 使用
        meeting_title: meeting_details.title,
        meeting_address: meeting_details.address,
      };
      
      return registrationItem;
    });
  }, [meetingDetailsData]);

  const isLoading = isMeetingDetailsLoading;

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
    
    return (
      <div className="space-y-4">
        {filteredData?.length > 0 ? (
          filteredData.map((item, index) => (
            <RegistrationCard key={index} data={item} />
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
