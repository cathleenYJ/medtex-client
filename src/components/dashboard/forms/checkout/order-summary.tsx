import { Hr } from "@ui/splitter";
import { SmallProfile } from "@ui/small-profile";

type Props = {
  meetingDetails?: any;
  isLoading?: boolean;
};

export const OrderSummary: React.FC<Props> = ({ meetingDetails, isLoading }) => {
  // 取出 meeting_details
  const details = meetingDetails?.meeting_details || {};
  const title = details.title || "-";
  const price = details.amount != null ? details.amount : 3000;

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
