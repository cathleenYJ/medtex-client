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
  
  // 參考 registration-record，支援單一/多個 meetingId
  const { getMeetingIdAsNumber } = useMeetingId();
  const meetingId = getMeetingIdAsNumber();
  const safeMeetingId = meetingId ?? 0;

  const { data: meetingDetailsData, isLoading: isMeetingDetailsLoading } = useQuery({
    queryKey: ["meeting-details", meetingId],
    queryFn: () => fetchData.admin.orderMeetingDetails(safeMeetingId, session),
    enabled: !!session?.user.adminToken,
  });

  // 轉換 API 資料為 PaymentTable 格式 (支援多會議/單一會議)
  const paymentData: PaymentTable[] = useMemo(() => {
    if (!meetingDetailsData || meetingDetailsData.status !== "retrieved" || !meetingDetailsData.data) {
      return [];
    }
    // 支援 data 為 array（多會議）或 object（單一會議）
    const dataArray = Array.isArray(meetingDetailsData.data)
      ? meetingDetailsData.data
      : [meetingDetailsData.data];

    let allItems: PaymentTable[] = [];
    dataArray.forEach((meetingBlock: any) => {
      const { orders, meeting_details, payment_history } = meetingBlock;
      orders
        .filter((order: any) => order.merchant_trade_no)
        .forEach((order: any) => {
          const paymentInfo = payment_history.find((payment: any) => payment.order_id === order.id);
          let registrationDate = "-";
          if (paymentInfo?.invoice_date) {
            const invoiceDate = new Date(paymentInfo.invoice_date * 1000);
            const year = invoiceDate.getFullYear();
            const month = invoiceDate.getMonth() + 1;
            const day = invoiceDate.getDate();
            const hours = invoiceDate.getHours().toString().padStart(2, '0');
            const minutes = invoiceDate.getMinutes().toString().padStart(2, '0');
            registrationDate = `${year}/${month}/${day} ${hours}:${minutes}`;
          }
          const capitalizeStatus = (status: string) => {
            return status.charAt(0).toUpperCase() + status.slice(1);
          };
          const paymentItem: PaymentTable = {
            no: order.merchant_trade_no,
            event_name: <ExternalLink onClick={() => {}}>{meeting_details.title}</ExternalLink>,
            registration_date: registrationDate,
            payment_status: capitalizeStatus(order.status),
            amount_paid: `NT$${order.amount}`,
            invoice: paymentInfo?.invoice_number || "Pending",
            note: order.status === "fail" ? "付款失敗" : "-",
          };
          allItems.push(paymentItem);
        });
    });
    return allItems;
  }, [meetingDetailsData]);

  const isLoading = isMeetingDetailsLoading;
  // 過濾資料根據搜尋條件
  // 支援 ReactNode 轉字串（element/array/children）
  const getString = (node: React.ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(getString).join(' ');
    }
    // @ts-ignore
    if (node && typeof node === 'object' && node.type && node.props) {
      // @ts-ignore
      return getString(node.props.children);
    }
    return '';
  };

  const filteredData = paymentData?.filter((item) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    // 將所有欄位合併成一個字串
    const allText = [
      item.no,
      item.event_name,
      item.registration_date,
      item.payment_status,
      item.amount_paid,
      item.invoice,
      item.note
    ].map(getString).join(' ').toLowerCase();
    return allText.includes(searchLower);
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
