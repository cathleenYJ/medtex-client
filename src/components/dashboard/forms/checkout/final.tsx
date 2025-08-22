import Link from "next/link";
import { PaymentCompleted, StepInfo } from "@ui/form";
import { Routes } from "@/config/routes";

export const Final: React.FC = () => (
  <PaymentCompleted>
    <StepInfo
      title="Payment Success!"
      nextPage={
        <Link href={Routes.private.registrationRecord}>
          → Go back to homepage to find more events
        </Link>
      }
    />
  </PaymentCompleted>
);
