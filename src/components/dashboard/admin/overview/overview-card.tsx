import clsx from "clsx";
import { Card } from "@ui/card";

export const OverviewCard: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => (
  <Card
    className={clsx(
      "p-5 bg-white/10 flex flex-col max-w-111.25 basis-full",
      className
    )}
    border={false}
  >
    {children}
  </Card>
);
