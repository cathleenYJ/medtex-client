import { Ul } from "@ui/ul";

export const sellerSteps = [
  {
    title: "Submit a Matchmaking Request",
    description: (
      <Ul>
        <li>Browse the buyer list and submit a meeting request.</li>
        <li>
          A credit card preauthorization of TWD 3000 per request is required.
          This step only reserves the amount — no charge is made at this stage.
        </li>
      </Ul>
    ),
  },
  {
    title: "Preauthorization Policy",
    description: (
      <>
        If the buyer declines or does not respond within 7 calendar days, the
        preauthorization will be automatically canceled, and no charges will
        apply.
      </>
    ),
  },
  {
    title: "Buyer Selects Available Timeslot",
    description: (
      <>
        <Ul>
          <li>
            If the buyers accept the meeting request, they will choose a
            preferred meeting time.
          </li>
          <li>
            The platform will notify the seller once the timeslot is confirmed.
          </li>
        </Ul>
        ⚠️ Note: Time selection works on a first-come, first-served basis —
        similar to booking event tickets.
      </>
    ),
  },
  {
    title: "Confirmation and Payment",
    description: (
      <>
        Once the buyer confirms a time slot, the system will finalize the
        meeting and charge TWD 3000 to the seller’s credit card.
      </>
    ),
  },
  {
    title: "Receive Meeting Details",
    description: (
      <>
        The system will email the meeting venue, scheduled time, and a QR code
        for on-site check-in.
      </>
    ),
  },
  {
    title: "Attend the Meeting On Time",
    description: (
      <>
        Please arrive punctually at your scheduled meeting time and present your
        QR code and Expo Pass at the venue.
      </>
    ),
  },
  {
    title: "Complete the Post-Meeting Survey",
    description: (
      <>
        After the meeting, kindly fill out the feedback questionnaire to help us
        maintain high-quality matchmaking experiences.
      </>
    ),
  },
  {
    title: "Buyer No-Show",
    description: (
      <>
        If the buyer does not attend the meeting, sellers may contact IBMI
        Taiwan for a manual refund review.
      </>
    ),
  },
  {
    title: "Post-Meeting Follow-Up",
    description: (
      <>
        IBMI Taiwan may follow up with sellers to gather feedback or explore
        further business matching opportunities.
      </>
    ),
  },
];
