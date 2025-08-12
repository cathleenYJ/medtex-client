import clsx from "clsx";
import { useEffect } from "react";
import { Star } from "@icons";
import { useTimeout } from "@/hooks/use-timeout";

export const PingStar: React.FC<{
  className?: string;
  toggle: boolean;
}> = ({ className, toggle }) => {
  const { waiting, setWaiting } = useTimeout();
  useEffect(() => {
    setWaiting(1000);
  }, [toggle]);
  return (
    <div className={clsx("relative", className)}>
      <Star
        className={clsx("absolute inset-0", waiting && "animate-ping")}
        fill={toggle ? "var(--color-appointment-btn)" : "transparent"}
      />
      <Star
        className={clsx("absolute inset-0")}
        fill={toggle ? "var(--color-appointment-btn)" : "transparent"}
      />
    </div>
  );
};
