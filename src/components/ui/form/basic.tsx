import clsx from "clsx";

export const Description: React.FC<
  React.ComponentPropsWithoutRef<"div"> & {
    highlight?: React.ReactNode;
  }
> = ({ highlight, children, ...props }) => {
  return (
    <div {...props} className={clsx("text-center sm:text-left", props.className)}>
      {highlight && <div className="text-5xl text-black font-semibold">{highlight}</div>}
      <div className="text-black/60">{children}</div>
    </div>
  );
};

export const Fields: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => (
  <div className={clsx("flex flex-wrap gap-5", className)}>{children}</div>
);

export const Fieldset: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <fieldset className="flex flex-col gap-7.5">{children}</fieldset>;

export const Hint: React.FC<{ hint: string; children?: React.ReactNode }> = ({
  hint,
  children,
}) => (
  <div className="flex justify-center text-sm gap-3">
    <div className="text-black">{hint}</div>
    <div className="text-black">{children}</div>
  </div>
);
