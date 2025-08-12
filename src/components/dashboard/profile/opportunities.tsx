import { Cooperation, MoneyBag, Discover } from "@icons";
import { Tag } from "@ui/tag";
import { Section } from "@ui/section";
import type { BuyerData } from "@/types";
import { ProfileCard } from "./profile-card";

export const Opportunities: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  return (
    <Section title="Opportunities">
      <ProfileCard
        className="w-max grow bg-b2b-lv4"
        icon={<Discover className="text-b2b-lv2" />}
        title={<span className="text-white/80">What we’re looking for?</span>}
      >
        <div className="flex flex-wrap gap-2.5">
          {(buyer.purchasing_requirement
            ? Object.entries(buyer.purchasing_requirement)
            : []
          ).map(([key, requirement]) => (
            <Tag key={`requirement-${key}`}>{requirement}</Tag>
          ))}
        </div>
      </ProfileCard>
      <ProfileCard
        className="w-max grow bg-b2b-lv6"
        icon={<Cooperation className="text-b2b-lv2" />}
        title={<span className="text-white/80">Partnership Types</span>}
      >
        <div className="flex flex-wrap gap-2.5">
          {(buyer.partnership_looking_for
            ? Object.entries(buyer.partnership_looking_for)
            : []
          ).map(([key, partnership]) => (
            <Tag key={`partnership-${key}`}>{partnership}</Tag>
          ))}
        </div>
      </ProfileCard>
      <ProfileCard
        className="w-max grow bg-b2b-lv1"
        icon={<MoneyBag className="text-b2b-lv4" />}
        title={<span className="text-b2b-lv4">Estimated Budget</span>}
      >
        <div className="flex flex-col gap-2.5">
          <div className="text-b2b-lv6 text-xl sm:text-4xl font-bold">
            {buyer.estimated_procurement_amount &&
              formatPrice(buyer.estimated_procurement_amount)}
          </div>
          <div className="text-b2b-lv6 text-sm sm:text-lg">
            Project‑based Negotiation
          </div>
        </div>
      </ProfileCard>
    </Section>
  );
};

const formatPrice = (price: string) =>
  `USD ${price.replace(/00(?=_)|00$/g, "M").replace("_", "~")}/year`;
