"use client";

import { useSession } from "next-auth/react";
import { Button } from "@ui/button";
import { useModal } from "@modals/context";
import {
  CalendarCreateEvent,
  ConfirmDecline,
  ConfirmMeetingRequest,
  Message,
  VertifyEmail,
} from "@modals/views";
import { ProfileModal } from "@modals/views/profile-modal";
import { CheckFat } from "@icons";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";

export default function TestPage() {
  const { data: session } = useSession();
  const { openModal, closeModal } = useModal();
  const { data } = useQuery({
    queryKey: ["buyerTest", session?.user.id],
    queryFn: () => fetchData.buyers.one(1057, session),
    select: (res) => res.data,
    enabled: !!session?.user.id,
  });
  if (!session) return null;
  return (
    <div className="flex flex-wrap gap-5 w-7xl max-w-full mx-auto px-4">
      <Button
        className="basis-full sm:basis-(--1-3-basis-gap-5)"
        variant="auth"
        onClick={() => {
          openModal(<Message closeModal={closeModal}>Error Message</Message>);
        }}
      >
        Root error
      </Button>
      <Button
        className="basis-full sm:basis-(--1-3-basis-gap-5)"
        variant="auth"
        onClick={() => {
          openModal(<ProfileModal id={1057} session={session} />);
        }}
      >
        Profile Modal
      </Button>
      <Button
        className="basis-full sm:basis-(--1-3-basis-gap-5)"
        variant="auth"
        onClick={() => {
          openModal(
            <Message
              title="Recovery Link Sent"
              btnCancel="Close"
              closeModal={closeModal}
            >
              Recovery Link Sent message
            </Message>
          );
        }}
      >
        Recovery Link Sent
      </Button>
      <Button
        className="basis-full sm:basis-(--1-3-basis-gap-5)"
        variant="auth"
        onClick={() => {
          openModal(
            <Message
              icon={<CheckFat className="size-12 text-b2b-lv2" />}
              title="Successful Password Reset"
              btnCancel="Login"
              closeModal={closeModal}
            >
              You can now use your new password to login to your account.
            </Message>
          );
        }}
      >
        Successful Password Reset
      </Button>
      <Button
        className="basis-full sm:basis-(--1-3-basis-gap-5)"
        variant="auth"
        onClick={() => {
          openModal(
            <VertifyEmail
              user_id={1057}
              email={"Bt3Q2@example.com"}
              password={"123456"}
              resend={async () => {
                window.alert("resend");
              }}
            />
          );
        }}
      >
        Vertify Email
      </Button>
      <Button
        className="basis-full sm:basis-(--1-3-basis-gap-5)"
        variant="auth"
        onClick={() => {
          openModal(
            <ConfirmDecline id={123} seller_id={123} seller_company={"test"} />
          );
        }}
      >
        Decline Request
      </Button>
      <Button
        className="basis-full sm:basis-(--1-3-basis-gap-5)"
        variant="auth"
        onClick={() => {
          data &&
            openModal(
              <ConfirmMeetingRequest buyer={{ ...data, meeting_id: 41 }} />
            );
        }}
      >
        Confirm Meeting
      </Button>
      <Button
        className="basis-full sm:basis-(--1-3-basis-gap-5)"
        variant="auth"
        onClick={() => {
          openModal(
            <CalendarCreateEvent
              start={new Date()}
              seller={{ seller_id: 123, seller_company: "test company" }}
              events={[]}
            />
          );
        }}
      >
        Create Calendar Event
      </Button>
    </div>
  );
}
