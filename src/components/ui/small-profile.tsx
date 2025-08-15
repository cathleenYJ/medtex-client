import clsx from "clsx";
import Image from "next/image";
import { apiImageUrl } from "@/utils/api-image-url";

type SmallProfileProps = {
  title?: string;
};

export const SmallProfile: React.FC<SmallProfileProps> = ({ title }) => (
  <div
    data-component-theme="green"
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
        src={apiImageUrl("/public/example_logo_small.png")}
        alt=" "
      />
    </div>
    <div>
      <div className="text-sm font-light text-black" style={{ fontSize: '14px', fontWeight: 300, lineHeight: '20px' }}>
        Event Ticket
      </div>
      <div className="text-base font-normal text-black" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px' }}>
        {title || "MedXTech"}
      </div>
    </div>
  </div>
);
