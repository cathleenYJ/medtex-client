"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Hr } from "@ui/splitter";
import type { BuyerContact, BuyerData } from "@/types";
import { ContactBlock } from "./contact-block";
import { MakeAppointmentBtn } from "@ui/make-appointment-btn";

const contactPlaceholder = {
  id: 0,
  avatar: null,
  user_name: "buyer name",
  buyer_title: "job title",
  region_covered: null,
};

export const LockedInfo: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  const { data: session } = useSession();
  const { buyer_id } = useParams();
  const [lock, setLock] = useState<boolean>(true);
  const [contact, setContact] = useState<BuyerContact>(contactPlaceholder);

  const unLockInfo = async () => {
    console.log("unLockInfo", buyer_id);
    // if (!lock || !session) return;
    // const res = await fetchData.buyers.contact(Number(buyer_id), session);
    // if (!res.data) return;
    // setLock(false);
    // setContact(res.data);
  };
  const lockInfo = () => {
    setLock(true);
    setContact(contactPlaceholder);
  };

  useEffect(() => {
    session ? unLockInfo() : lockInfo();
  }, [session]);

  return (
    <div className="w-full sm:w-1/2 rounded-xl border border-b2b-lv3">
      <div
        className={clsx(
          "flex pt-5 pb-3.5 px-9",
          " sm:flex-col md:flex-row gap-7 relative border-b border-b2b-lv3",
          lock &&
            "before:content-[''] before:absolute before:z-10 before:inset-0 before:backdrop-blur-md before:bg-b2b-lv1/10 before:rounded-t-xl"
        )}
      >
        {lock && (
          <MakeAppointmentBtn className="!absolute inset-0" buyer={buyer}>
            <LockClosedIcon className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-9 text-b2b-lv2" />
          </MakeAppointmentBtn>
        )}
        <div className="flex flex-col gap-1.5">
          <div className="text-white text-3xl">
            {contact.user_name || "buyer name"}
          </div>
          <div className="text-b2b-lv2 text-xl">
            {contact.buyer_title || "job title"}
          </div>
          <div className="text-b2b-lv1">
            {contact.region_covered
              ? Object.values(contact.region_covered).join(", ")
              : "contact location"}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row pt-3.5 pb-5 px-9 gap-1 sm:gap-7.5">
        <ContactBlock title="Contact Time Zone">
          {buyer.timezone || ""}
        </ContactBlock>
        <Hr className="sm:border-l" />
        <ContactBlock title="Language">
          {Object.values(buyer.languages || {}).join(", ") || ""}
        </ContactBlock>
      </div>
    </div>
  );
};
