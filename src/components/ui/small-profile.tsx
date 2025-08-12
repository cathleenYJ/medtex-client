import clsx from "clsx";
import Image from "next/image";
import { apiImageUrl } from "@/utils/api-image-url";
import type { BuyerData } from "@/types";

export const SmallProfile: React.FC<{ buyer: BuyerData }> = ({ buyer }) => (
  <div
    data-component-theme={buyer.profile_theme || "green"}
    className={clsx(
      "flex flex-row gap-5",
      "rounded-lg p-4",
      "bg-black/5"
    )}
  >
    <div className="shrink-0 flex items-center">
      <Image
        className="bg-white rounded-md aspect-square object-contain"
        width={48}
        height={48}
        src={apiImageUrl(buyer.company_logo_small)}
        alt="buyer logo"
      />
    </div>
    <div>
      <div className="text-sm font-light text-black" style={{ fontSize: '14px', fontWeight: 300, lineHeight: '20px' }}>
        Event Ticket
      </div>
      <div className="text-base font-normal text-black" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px' }}>
        MedXTech Summit Asia 2025
      </div>
    </div>
  </div>
);
