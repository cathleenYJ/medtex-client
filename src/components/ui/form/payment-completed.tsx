import Link from "next/link";
import { Button } from "@ui/button";
import { Routes } from "@/config/routes";

export const PaymentCompleted: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="px-4 sm:px-11 md:px-20 py-15 flex flex-col gap-10 w-3xl max-w-full text-white/80">
      {children}
      <div className="flex flex-col-reverse xs:flex-row justify-end gap-5">
        <Button
          component={Link}
          href={Routes.public.home}
          variant="cancel"
          style={{ height: "42px", minWidth: "120px" }}
        >
          Explore Events
        </Button>
        <Button
          component={Link}
          href={Routes.private.registrationRecord}
          variant="auth"
          style={{
            minWidth: "200px",
            height: "42px",
          }}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};
