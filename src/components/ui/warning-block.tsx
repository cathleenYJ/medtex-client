import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const WarningBlock: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => (
  <div className={clsx(className, "px-4 py-2.5 rounded-lg flex gap-2.5")}>
    <ExclamationCircleIcon className="size-6 shrink-0" />
    <div className="text-sm">{children}</div>
  </div>
);
