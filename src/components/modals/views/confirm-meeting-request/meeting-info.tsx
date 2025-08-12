import Link from "next/link";
import { Ul } from "@ui/ul";
import { Title } from "@ui/modal";
import { SmallProfile } from "@ui/small-profile";
import { WarningBlock } from "@ui/warning-block";
import { ConfigValue } from "@/config";
import type { BuyerData } from "@/types";

export const MeetingInfo: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <div className="text-b2b-lv2 text-3xl">Step before Conversation</div>
        <Title className="text-left">
          Confirm Meeting & Proceed to Payment
        </Title>
      </div>
      <div className="text-white/80 text-sm">
        You are about to request a meeting during December 4–7 (exact time to be
        confirmed by the buyer) with this buyer. To proceed, your credit card
        will be pre-authorized for USD $100.
      </div>
      <SmallProfile buyer={buyer} />
      <WarningBlock className="bg-b2b-lv6/60 text-b2b-lv2">
        You will only be charged if the buyer accepts the request.
      </WarningBlock>
      <Ul className="text-white/80 text-sm">
        <li>
          Once your request is accepted by the buyer and payment is completed,
          the meeting will be officially confirmed and cannot be changed through
          the platform.
        </li>
        <li>
          If you wish to reschedule after confirmation, please contact the IBMI
          Taiwan B2B Support Team at{" "}
          <Link
            className="text-b2b-lv2"
            href={`mailto:${ConfigValue.CONTACT_EMAIL}`}
          >
            {ConfigValue.CONTACT_EMAIL}
          </Link>
          .
        </li>
        <li>
          All rescheduling requests are subject to review and availability.
        </li>
      </Ul>
    </div>
  );
};
