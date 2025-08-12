"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@ui/table";
import { SearchBox } from "@ui/search-box";
import { ExternalLink } from "@ui/external-link";
import { LoadingBlock } from "@dashboard/loading-block";
import { fetchData } from "@/data/fetch-data";
import { useMeetingId } from "@/hooks/use-meeting-id";

type PaymentTable = {
  no: React.ReactNode;
  event_name: React.ReactNode;
  registration_date: React.ReactNode;
  payment_status: React.ReactNode;
  amount_paid: React.ReactNode;
  invoice: React.ReactNode;
  note: React.ReactNode;
};

export default function PaymentHistoryPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get meeting_id from URL parameters (same as RegistrationRecordPage)
  const { getMeetingIdAsNumber } = useMeetingId();
  const meetingId = getMeetingIdAsNumber();
  
  // 獲取單一會議的詳細資料 (與 RegistrationRecordPage 共用同一套邏輯)
  const { data: meetingDetailsData, isLoading: isMeetingDetailsLoading } = useQuery({
    queryKey: ["meeting-details", meetingId],
    queryFn: () => {
      if (!meetingId) throw new Error("No meeting ID provided");
      return fetchData.admin.orderMeetingDetails(meetingId, session);
    },
    enabled: !!session?.user.adminToken && !!meetingId,
  });

  // 轉換 API 資料為 PaymentTable 格式 (參考 RegistrationRecordPage 的邏輯)
  const paymentData: PaymentTable[] = useMemo(() => {
    if (!meetingDetailsData || meetingDetailsData.status !== "retrieved" || !meetingDetailsData.data) {
      return [];
    }
    
    const { orders, meeting_details, payment_history } = meetingDetailsData.data;
    console.log("Payment History data:", meetingDetailsData.data);
    
    // 為每個訂單創建一個付款記錄
    return orders
      .filter((order) => order.merchant_trade_no) // 只顯示有 merchant_trade_no 的記錄
      .map((order) => {
        // 找到對應的付款記錄
        const paymentInfo = payment_history.find(payment => payment.order_id === order.id);
        
        // 使用 invoice_date 作為 registration_date，如果沒有則使用訂單創建時間
        let registrationDate = "-";
        
        if (paymentInfo?.invoice_date) {
          const invoiceDate = new Date(paymentInfo.invoice_date * 1000); // Unix timestamp to Date
          // 格式: 2025/12/4 13:00
          const year = invoiceDate.getFullYear();
          const month = invoiceDate.getMonth() + 1; // getMonth() returns 0-11
          const day = invoiceDate.getDate();
          const hours = invoiceDate.getHours().toString().padStart(2, '0');
          const minutes = invoiceDate.getMinutes().toString().padStart(2, '0');
          
          registrationDate = `${year}/${month}/${day} ${hours}:${minutes}`;
        }
        
        // 將狀態首字母大寫
        const capitalizeStatus = (status: string) => {
          return status.charAt(0).toUpperCase() + status.slice(1);
        };
        
        const paymentItem: PaymentTable = {
          no: order.merchant_trade_no, // 直接使用 merchant_trade_no（已確保存在）
          event_name: <ExternalLink onClick={() => {}}>{meeting_details.title}</ExternalLink>,
          registration_date: registrationDate,
          payment_status: capitalizeStatus(order.status), // 首字母大寫的狀態
          amount_paid: `NT$${order.amount}`,
          invoice: paymentInfo?.invoice_number || "Pending",
          note: order.status === "fail" ? "付款失敗" : "-",
        };
        
        return paymentItem;
      });
  }, [meetingDetailsData]);

  const isLoading = isMeetingDetailsLoading;
  // 過濾資料根據搜尋條件
  const filteredData = paymentData?.filter((item) => {
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
    const paymentStatus = getString(item.payment_status);
    const invoice = getString(item.invoice);
    const amountPaid = getString(item.amount_paid);
    const note = getString(item.note);
    const registrationDate = getString(item.registration_date);
    
    return (
      eventName.toLowerCase().includes(searchLower) ||
      paymentStatus.toLowerCase().includes(searchLower) ||
      invoice.toLowerCase().includes(searchLower) ||
      amountPaid.toLowerCase().includes(searchLower) ||
      note.toLowerCase().includes(searchLower) ||
      registrationDate.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      {isLoading || !session ? (
        <LoadingBlock />
      ) : (
        <div className="space-y-6">
          <SearchBox
            placeholder="Search"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Table
            className="-mx-5 sm:-mx-10 px-5 sm:px-10 mask-(--mask-x-5) sm:mask-(--mask-x-10)"
            cols={{
              no: {
                label: "No.",
                sort: true,
                width: "120px",
              },
              event_name: {
                label: "Event Name",
                width: "auto",
              },
              registration_date: {
                label: "Registration Date",
                sort: true,
                width: "120px",
              },
              payment_status: {
                label: "Payment Status",
                width: "120px",
              },
              amount_paid: {
                label: "Amount Paid",
                width: "120px",
              },
              invoice: {
                label: "Invoice",
                width: "120px",
              },
              note: {
                label: "Note",
                width: "120px",
              },
            }}
            data={filteredData}
          />
        </div>
      )}
    </div>
  );
}
