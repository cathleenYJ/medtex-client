import { Hr } from "@ui/splitter";
import { SmallProfile } from "@ui/small-profile";
import type { MeetingDetailsResponse } from "@/types";

type Props = {
  meetingDetails?: MeetingDetailsResponse | undefined;
  isLoading?: boolean;
};

export const OrderSummary: React.FC<Props> = ({ meetingDetails, isLoading }) => {
  let details: MeetingDetailsResponse = null;
  if (Array.isArray(meetingDetails)) {
    details = meetingDetails[0] || null;
  } else if (
    meetingDetails &&
    typeof meetingDetails === "object" &&
    "data" in meetingDetails &&
    meetingDetails.data &&
    typeof meetingDetails.data === "object" &&
    "meeting_details" in meetingDetails.data &&
    meetingDetails.data.meeting_details
  ) {
    details = meetingDetails.data.meeting_details as MeetingDetailsResponse;
  } else if (meetingDetails && typeof meetingDetails === "object") {
    details = meetingDetails as MeetingDetailsResponse;
  }
  const title = (details && 'title' in details && details.title) ? details.title : "-";
  const price = (details && 'amount' in details && details.amount != null) ? details.amount : 3000;

  return (
    <>
      <div className="text-xl text-black font-medium">Order Summary</div>
      <SmallProfile title={title} />
      <div className="flex gap-5 justify-between text-sm">
        <div>Total（Tax Included）</div>
        <div>{isLoading ? "-" : `NT$${price}`}</div>
      </div>
      <Hr className="w-full my-5 h-px border-none bg-[rgba(19,19,20,0.20)]" />
    </>
  );
};
