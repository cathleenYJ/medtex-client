import clsx from "clsx";

export const Slider: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div
        className={clsx(
          "w-min sm:w-full flex flex-nowrap sm:flex-wrap gap-4",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
