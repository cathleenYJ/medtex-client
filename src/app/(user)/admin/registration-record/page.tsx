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
  const safeMeetingId = meetingId ?? 0;

  const { data: meetingDetailsData, isLoading: isMeetingDetailsLoading } = useQuery({
    queryKey: ["meeting-details", meetingId],
    queryFn: () => fetchData.admin.orderMeetingDetails(safeMeetingId, session),
    enabled: !!session?.user.adminToken,
  });

  // 轉換 API 資料為 RegistrationCardData 格式
  const registrationData: RegistrationTable[] = useMemo(() => {
    if (!meetingDetailsData || meetingDetailsData.status !== "retrieved" || !meetingDetailsData.data) {
      return [];
    }
    // 支援 data 為 array（多會議）或 object（單一會議）
    const dataArray = Array.isArray(meetingDetailsData.data)
      ? meetingDetailsData.data
      : [meetingDetailsData.data];

    const allItems: RegistrationTable[] = [];
    let globalIndex = 0;
    dataArray.forEach((meetingBlock) => {
      const { orders, meeting_details, payment_history, participant_details } = meetingBlock as {
        orders: Array<{ id: number; status: string; amount: number; merchant_trade_no?: string }>;
        meeting_details: { id: number; start_time: string; end_time: string; title: string; address: string };
        payment_history: Array<{ order_id: number; invoice_date?: number; invoice_number?: string }>;
        participant_details: {
          participant_full_name: string;
          job_title: string;
          mobile_number?: string;
          participant_email: string;
        };
      };
      orders.forEach((order) => {
        const paymentInfo = payment_history.find((payment) => payment.order_id === order.id);
        const startDateTime = new Date(meeting_details.start_time);
        const meetingDate = startDateTime.toISOString().split('T')[0];
        let registrationDate = meetingDate;
        let registerTime = "-";
        if (paymentInfo?.invoice_date) {
          const invoiceDate = new Date(paymentInfo.invoice_date * 1000);
          registrationDate = invoiceDate.toISOString().split('T')[0];
          registerTime = invoiceDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
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
        const capitalizeStatus = (status: string) => {
          return status.charAt(0).toUpperCase() + status.slice(1);
        };
        const registrationItem: RegistrationTable = {
          no: ++globalIndex,
          event_name: <ExternalLink onClick={() => {}}>{meeting_details.title}</ExternalLink>,
          registration_date: registrationDate,
          start_time: meeting_details.start_time,
          end_time: meeting_details.end_time,
          status: capitalizeStatus(order.status),
          participant_name: participant_details.participant_full_name,
          company: "-",
          note: order.status === "fail" ? "付款失敗" : "-",
          price: `NT$${order.amount}`,
          invoice: paymentInfo?.invoice_number || "Pending",
          job_position: participant_details.job_title,
          mobile: participant_details.mobile_number || "-",
          email: participant_details.participant_email,
          register_time: registerTime,
          is_registered: isRegistered,
          is_payment_complete: isPaymentComplete,
          ticket_number: order.merchant_trade_no || `-`,
          meeting_title: meeting_details.title,
          meeting_address: meeting_details.address,
          meeting_id: meeting_details.id,
        };
        allItems.push(registrationItem);
      });
    });
    return allItems;
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
