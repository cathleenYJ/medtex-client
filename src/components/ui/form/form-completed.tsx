import Link from "next/link";
import { Button } from "@ui/button";
import { Routes } from "@/config/routes";

export const FormCompleted: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="px-4 sm:px-11 md:px-20 py-15 flex flex-col gap-10 w-3xl max-w-full text-white/80 items-center justify-center text-center">
      {children}
      <Button
        component={Link}
        href={`${Routes.private.registrationForm}/1`}
        variant="auth"
        style={{ minWidth: "200px", height: "42px" }}
      >
        Continue Registration
      </Button>
    </div>
  );
};
