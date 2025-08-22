import clsx from "clsx";

export const FormLayout: React.FC<{
  children?: React.ReactNode;
  size?: "w-7xl" | "w-5xl" | "w-3xl" | "w-full" | "w-min";
  minHeight?: number;
}> = ({ children, size = "w-min", minHeight }) => (
  <div data-home className="-mt-30 sm:px-10 px-5 py-5 sm:py-0">
    <div
      className={clsx(
        "pt-32 sm:pb-20 max-w-full min-h-screen mx-auto relative",
        size
      )}
    >
      <div
        className={clsx(
          "flex gap-6 md:gap-15 py-10 px-5 sm:py-15 sm:px-20",
          minHeight ? "" : "min-h-[calc(100vh-4.375rem)] sm:min-h-[calc(100vh-13rem)]",
          "rounded-4xl border border-transparent sm:border-white bg-white text-white"
        )}
        style={minHeight ? { minHeight } : undefined}
      >
        {children}
      </div>
    </div>
  </div>
);
