import { Section } from "@ui/section";
import { ProfileCard } from "@dashboard/profile/profile-card";
import type { BuyerData } from "@/types";
import { Certifications } from "./certifications";
import { Criteria } from "./criteria";

export const Qualfication: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  return (
    <Section title="Supplier Qualification Requirements">
      <ProfileCard
        title={
          <span className="text-b2b-lv4">Production Scale / Flexibility</span>
        }
        className="bg-b2b-lv1 md:basis-(--1-3-basis-gap-4) sm:basis-(--1-2-basis-gap-4) basis-full"
      >
        <CardContent
          title={buyer.production_scale || ""}
          description="Reserve capacity min."
        />
      </ProfileCard>
      <ProfileCard
        title={<span className="text-b2b-lv4">Delivery Period</span>}
        className="bg-b2b-lv1 md:basis-(--1-3-basis-gap-4) sm:basis-(--1-2-basis-gap-4) basis-full"
      >
        <CardContent
          title={buyer.delivery_period || ""}
          description="This can be discussed by project."
        />
      </ProfileCard>
      <ProfileCard
        title={
          <span className="text-b2b-lv4">Supplier Eligibility Criteria</span>
        }
        className="bg-b2b-lv1 md:basis-(--1-3-basis-gap-4) basis-full"
      >
        {buyer.eligibility_criteria && (
          <Criteria items={buyer.eligibility_criteria} />
        )}
      </ProfileCard>
      <ProfileCard
        title={
          <span className="text-white">
            Quality Management & Certifications
          </span>
        }
        className="bg-b2b-lv6 basis-full"
      >
        {buyer.required_certification && (
          <Certifications items={buyer.required_certification} />
        )}
      </ProfileCard>
    </Section>
  );
};

const CardContent: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="flex flex-col gap-4">
    <div className="text-xl sm:text-4xl font-bold">{title}</div>
    <div className="text-sm sm:text-lg">{description}</div>
  </div>
);
