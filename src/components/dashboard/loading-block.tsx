import { LoadingBar } from "@ui/loading";
import clsx from "clsx";

export const LoadingBlock: React.FC<{ color?: string; className?: string }> = ({
  className,
  color,
}) => (
  <div
    className={clsx(className, "grid place-content-center absolute inset-0")}
  >
    <LoadingBar color={color} />
  </div>
);
