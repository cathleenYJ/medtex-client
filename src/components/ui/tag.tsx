import clsx from "clsx";
import { cleanDuplicate } from "@/utils/clean-duplicate-class";

export const Tag: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        className,
        cleanDuplicate(
          "bg-white/10 rounded-xl text-white px-3.5 py-1.5 text-sm sm:text-base",
          className
        )
      )}
    >
      {children}
    </div>
  );
};
