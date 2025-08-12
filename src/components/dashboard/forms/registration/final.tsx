import Link from "next/link";
import { FormCompleted, StepInfo } from "@ui/form";
import { Routes } from "@/config/routes";

export const Final: React.FC = () => {
  return (
    <FormCompleted>
      <StepInfo
        title="Registration Completed!"
        nextPage={
          <Link href={Routes.private.checkoutForm}>
            → Continue to payment
          </Link>
        }
      />
    </FormCompleted>
  );
};
