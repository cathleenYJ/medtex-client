import { LoadingBar } from "@ui/loading";
import clsx from "clsx";

export const LoadingBlock: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div
    className={clsx(className, "grid place-content-center absolute inset-0")}
  >
    <LoadingBar />
  </div>
);
