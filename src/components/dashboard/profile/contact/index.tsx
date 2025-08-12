"use client";

import { Card } from "@ui/card";
import { Section } from "@ui/section";
import type { BuyerData } from "@/types";
import { LockedInfo } from "./locked-info";
import { AppointmentBtns, DisplayInfo } from "./display-info";

export const Contact: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  return (
    <Section title="Contact Info">
      <Card className="bg-b2b-lv4 py-7.5 sm:py-10 md:py-12 px-5 sm:px-7.5 md:px-12 w-full flex flex-wrap sm:flex-nowrap sm:flex-none gap-7.5 lg:gap-15">
        <DisplayInfo buyer={buyer} />
        <LockedInfo buyer={buyer} />
        <AppointmentBtns className="sm:hidden" buyer={buyer} />
      </Card>
    </Section>
  );
};
