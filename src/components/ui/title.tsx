import clsx from "clsx";
import { headerSans } from "@/styles/font";
import { toId } from "@/utils/elements-id";

export const SectionTitle: React.FC<{
  id?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ id, className, children }) => {
  return (
    <h3
      id={toId(id)}
      className={clsx(
        "text-white text-xl sm:text-5xl",
        className,
        headerSans.variable
      )}
    >
      {children}
    </h3>
  );
};
