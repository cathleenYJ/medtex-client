import Link from "next/link";
import { FormCompleted, StepInfo } from "@ui/form";
import { Routes } from "@/config/routes";

export const Final: React.FC = () => {
  return (
    <FormCompleted>
      <StepInfo
        title="Account Created!"
        nextPage={
          <Link href={Routes.public.home}>
            → Go back to homepage to find more events
          </Link>
        }
      />
    </FormCompleted>
  );
};
