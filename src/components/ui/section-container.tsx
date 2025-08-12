import clsx from "clsx";

export const SectionContainer: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "w-full max-w-7xl mx-auto px-2.5 sm:px-10 flex flex-col",
        className
      )}
    >
      {children}
    </div>
  );
};
