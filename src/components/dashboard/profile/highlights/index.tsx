import { Cards } from "@ui/card";
import { Section } from "@ui/section";
import { Flag, Market, Target } from "@icons";
import type { BuyerData } from "@/types";
import { HighlightCard } from "./highlight-card";
import { HighlightCard2 } from "./highlight-card2";

export const Highlights: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  return (
    <Section
      title="Company Highlights"
      className="before:absolute before:-z-10 before:content-[''] before:block before:w-[120vw] before:left-1/2 before:-translate-x-1/2 before:h-96 before:rounded-b-[100%] before:border-b before:border-white before:shadow-(--bg-line) before:bg-gradient-to-t before:from-highlight-start before:to-70% before:to-highlight-end/0"
    >
      {buyer.key_strengths && (
        <Cards className="basis-full gap-3 sm:gap-4 flex-wrap lg:flex-nowrap">
          {buyer.key_strengths.map(({ title, description }, i) => (
            <HighlightCard key={title} title={title} number={i + 1}>
              {description}
            </HighlightCard>
          ))}
        </Cards>
      )}
      <Cards className="basis-full gap-3 sm:gap-4 flex-wrap flex-row">
        {buyer.market_presence && (
          <HighlightCard2
            icon={<Market className="text-b2b-lv2" />}
            title="Market Presence"
            description={buyer.market_presence}
          />
        )}
        {buyer.strategic_focus_areas && (
          <HighlightCard2
            icon={<Flag className="text-b2b-lv2" />}
            title="Strategic Focus Areas"
            description={buyer.strategic_focus_areas}
          />
        )}
        {buyer.regional_insights && (
          <HighlightCard2
            icon={<Target className="text-b2b-lv2" />}
            title="Brands in Charge for Distribution"
            description={buyer.regional_insights}
          />
        )}
      </Cards>
    </Section>
  );
};
