import { Hr } from "@ui/splitter";
import { SmallProfile } from "@ui/small-profile";
import type { BuyerData } from "@/types";

export const OrderSummary: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  return (
    <>
      <div className="text-xl text-black font-medium">Order Summary</div>
      <SmallProfile buyer={buyer} />
      <div className="flex gap-5 justify-between text-sm">
        <div>Total（Tax Included）</div>
        <div>$3,000 NTD</div>
      </div>
      <Hr className="w-full my-5 h-px border-none bg-[rgba(19,19,20,0.20)]" />
    </>
  );
};
