import clsx from "clsx";

export const BannerContainer: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-7xl pt-10 px-4 sm:px-10",
        className
      )}
    >
      {children}
    </div>
  );
};
