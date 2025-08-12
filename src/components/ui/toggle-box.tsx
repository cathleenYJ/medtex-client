import clsx from "clsx";

export const ToggleBox: React.FC<{
  className?: string;
  children?: React.ReactNode;
  open: boolean;
}> = ({ className, children, open }) => {
  return (
    <div
      className={clsx(
        "grid transition-[grid-template-rows] duration-400 bg-inherit",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className={clsx("overflow-hidden bg-inherit", className)}>
        {children}
      </div>
    </div>
  );
};
