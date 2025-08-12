"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { ConfigValue } from "@/config";
import { headerSans } from "@/styles/font";
import type { BuyerData } from "@/types";
import { MakeAppointmentBtn } from "@ui/make-appointment-btn";

export const DisplayInfo: React.FC<{
  buyer: BuyerData;
}> = ({ buyer }) => {
  return (
    <div className="w-full sm:w-1/2 flex flex-col justify-between gap-10 md:pt-7.5 md:pb-5">
      <BasicInfo buyer={buyer} />
      <AppointmentBtns className="hidden sm:flex" buyer={buyer} />
    </div>
  );
};

const BasicInfo: React.FC<{ buyer: BuyerData }> = ({ buyer }) => (
  <div className="flex flex-wrap gap-6 sm:gap-7.5">
    <div
      className={clsx(
        headerSans.variable,
        "basis-full text-white text-3xl sm:text-4xl md:text-5xl font-light"
      )}
    >
      {buyer.brief || ""}
    </div>
  </div>
);

export const AppointmentBtns: React.FC<{
  className?: string;
  buyer: BuyerData;
}> = ({ className, buyer }) => {
  const { data: session } = useSession();

  return (
    session?.user.role_id !== ConfigValue.ROLES.buyer && (
      <div className={clsx("flex flex-wrap gap-5", className)}>
        <MakeAppointmentBtn
          buyer={buyer}
          className="py-4 px-8 rounded-lg bg-appointment-btn text-b2b-bg font-medium shrink-0"
        >
          Make Appointment →
        </MakeAppointmentBtn>
      </div>
    )
  );
};
