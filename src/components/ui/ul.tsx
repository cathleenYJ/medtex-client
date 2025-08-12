import clsx from "clsx";

export const Ul: React.FC<React.ComponentPropsWithoutRef<"ul">> = ({
  className,
  children,
}) => (
  <ul className={clsx(className, "list-disc list-outside ps-5")}>{children}</ul>
);
