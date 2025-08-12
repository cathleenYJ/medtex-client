import clsx from "clsx";

export const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          "animate-spin rounded-full size-5 border-b-2",
          className
        )}
      />
    </div>
  );
};
