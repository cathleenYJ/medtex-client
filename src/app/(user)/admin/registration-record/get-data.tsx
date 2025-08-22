import { ExternalLink } from "@ui/external-link";
import type { RegistrationCardData } from "@ui/registration-card";
import type { OrderMeetingDetailsResponse } from "@/types/admin";

// 工具函式：處理 registration-record 頁面資料
export const getRegistrationData = (
  meetingsArr: Array<{ id: number; title: string; amount: number; start_time: string; end_time: string; address: string }>,
  batchOrderDetails: { data?: Array<OrderMeetingDetailsResponse | null> },
) => {
  // 取得所有報名資料
  const registrationMap = new Map<number, OrderMeetingDetailsResponse | null>();
  const meetingBlocks = batchOrderDetails?.data ?? [];
  if (Array.isArray(meetingBlocks)) {
    meetingBlocks.forEach((meetingBlock) => {
      const key = Number(meetingBlock?.meeting_details?.id);
      registrationMap.set(key, meetingBlock);
    });
  }

  // 渲染所有活動卡片
  const allItems: RegistrationCardData[] = [];
  let globalIndex = 0;
  meetingsArr.forEach((meeting) => {
    const regData = registrationMap.get(meeting.id);
    let meetingDate: string = "-";
    if (meeting.start_time) {
      const d = new Date(meeting.start_time);
      if (!isNaN(d.getTime())) {
        meetingDate = d.toISOString().split('T')[0];
      }
    }
    if (regData && regData.orders && regData.orders.length > 0) {
      regData.orders.forEach((order) => {
        const paymentInfo = regData.payment_history?.find((payment) => payment.order_id === order.id);
        let registrationDate = meetingDate;
        let registerTime = "-";
        if (paymentInfo?.invoice_date) {
          const invoiceDate = new Date(paymentInfo.invoice_date * 1000);
          if (!isNaN(invoiceDate.getTime())) {
            registrationDate = invoiceDate.toISOString().split('T')[0];
            registerTime = invoiceDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          }
        }
        const isRegistered = true;
        let isPaymentComplete = false;
        if (paymentInfo?.payment_status === "paid") {
          isPaymentComplete = true;
        } else {
          isPaymentComplete = false;
        }
        const capitalizeStatus = (status: string) => {
          return status.charAt(0).toUpperCase() + status.slice(1);
        };
        allItems.push({
          no: ++globalIndex,
          event_name: <ExternalLink onClick={() => {}}>{meeting.title ?? ""}</ExternalLink>,
          registration_date: registrationDate,
          start_time: meeting.start_time ?? "",
          end_time: meeting.end_time ?? "",
          status: capitalizeStatus(order.status),
          participant_name: regData.participant_details?.participant_full_name ?? "-",
          company: "-",
          note: order.status === "fail" ? "付款失敗" : "-",
          price: `NT$${order.amount}`,
          invoice: paymentInfo?.invoice_number || "Pending",
          job_position: regData.participant_details?.job_title ?? "-",
          mobile: regData.participant_details?.mobile_number || "-",
          email: regData.participant_details?.participant_email ?? "-",
          dietary: regData.participant_details?.dietary_preferences || "-",
          register_time: registerTime,
          is_registered: isRegistered,
          is_payment_complete: isPaymentComplete,
          ticket_number: order.merchant_trade_no || `-`,
          meeting_title: meeting.title ?? "",
          meeting_address: meeting.address ?? "",
          meeting_id: meeting.id ?? 0,
        });
      });
    } else {
      // 未報名活動卡片
      allItems.push({
        no: ++globalIndex,
        event_name: <ExternalLink onClick={() => {}}>{meeting.title ?? ""}</ExternalLink>,
        registration_date: meetingDate,
        start_time: meeting.start_time ?? "",
        end_time: meeting.end_time ?? "",
        status: "Not Registered",
        participant_name: "-",
        company: "-",
        note: "-",
        price: "-",
        invoice: "-",
        job_position: "-",
        mobile: "-",
        email: "-",
        register_time: "-",
        is_registered: false,
        is_payment_complete: false,
        ticket_number: "-",
        meeting_title: meeting.title ?? "",
        meeting_address: meeting.address ?? "",
        meeting_id: meeting.id ?? 0,
      });
    }
  });
  return allItems;
};
