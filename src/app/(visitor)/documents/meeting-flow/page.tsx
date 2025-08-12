import { Ul } from "@ui/ul";
import { Description, Section, Steps } from "@dashboard/documents/contents";
import { sellerSteps } from "./seller-steps";
import { buyerSteps } from "./buyer-steps";

export default function Page() {
  return (
    <>
      <Description title="B2B Matchmaking Process Expo Face-to-Face Meeting Flow">
        IBMI Taiwan provides a professional B2B matchmaking platform to connect
        international buyers with Taiwanese sellers through in-person meetings.
        The following outlines the step-by-step process to ensure a smooth and
        successful experience for all participants.
      </Description>
      <Section title="For Sellers (Taiwan Suppliers)">
        <Steps steps={sellerSteps} />
      </Section>
      <Section title="For Buyers (International Participants)">
        <Steps steps={buyerSteps} />
      </Section>
      <div>
        <div className="font-semibold">Important Notes</div>
        <Ul>
          <li>Charges apply only after the buyer confirms a timeslot.</li>
          <li>
            If the buyer does not respond within 7 calendar days, the request
            will be automatically closed and no fees will be charged.
          </li>
          <li>
            All meetings are conducted in person at the event venue, with
            details provided via email.
          </li>
        </Ul>
      </div>
    </>
  );
}
