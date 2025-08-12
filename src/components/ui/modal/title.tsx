import clsx from "clsx";

export const Title: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        className || "text-center",
        "text-2xl text-black sm:text-5xl font-semibold"
      )}
    >
      {children}
    </div>
  );
};
