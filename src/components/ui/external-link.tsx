import clsx from "clsx";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Button } from "@ui/button";

export const ExternalLink: React.FC<
  React.ComponentPropsWithoutRef<typeof Button>
> = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      className={clsx("flex justify-between items-center gap-2.5", className)}
    >
      <span>{children}</span>
      <ArrowTopRightOnSquareIcon className="size-5" />
    </Button>
  );
};
