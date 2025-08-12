import clsx from "clsx";

export const Ol: React.FC<React.ComponentPropsWithoutRef<"ol">> = ({
  className,
  children,
}) => (
  <ol className={clsx(className || "list-decimal", "list-outside ps-5")}>
    {children}
  </ol>
);
