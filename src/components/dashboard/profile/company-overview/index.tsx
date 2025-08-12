import Image from "next/image";
import { Card } from "@ui/card";
import { Section } from "@ui/section";
import { BusinessAttributes } from "@dashboard/business-attributes";
import type { BuyerData } from "@/types";
import { CompanyInfo } from "./company-info";
import { apiImageUrl } from "@/utils/api-image-url";

export const CompanyOverview: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  return (
    <Section title="Company Overview">
      <Card className="bg-b2b-lv6 flex flex-wrap overflow-hidden">
        <div className="flex flex-wrap-reverse text-white w-full">
          <div className="w-full lg:w-1/2 pt-8 sm:pt-7.5 md:pt-12.5 px-6 sm:px-7.5 md:px-12 pb-9 flex flex-col gap-10">
            <CompanyInfo buyer={buyer} />
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              fill
              className="!relative object-cover aspect-16/9"
              src={apiImageUrl(buyer.company_overview_img)}
              alt="company_overview"
            />
          </div>
        </div>
        <BusinessAttributes
          className="px-6 sm:px-7.5 md:px-12 pt-8 sm:pt-7.5 pb-8 sm:pb-7.5 md:pb-10 bg-b2b-lv5"
          businessAttributes={Object.values(buyer.business_attributes || {})}
          businessNature={Object.values(buyer.business_nature || [])}
        />
      </Card>
    </Section>
  );
};
