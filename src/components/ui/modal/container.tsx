import clsx from "clsx";

export const Container: React.FC<React.ComponentPropsWithoutRef<"div">> = ({
  className,
  children,
  ...props
}) => (
  <div
    {...props}
    className={clsx(
      "flex flex-col gap-7.5 bg-white px-4 py-10 sm:px-17 sm:py-20 max-w-full border border-white/12",
      className
    )}
  >
    {children}
  </div>
);
