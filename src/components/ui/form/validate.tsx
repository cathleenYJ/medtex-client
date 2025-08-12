import clsx from "clsx";

export const Validate: React.FC<{ className?: string; error?: string }> = ({
  className,
  error,
}) => (
  <div className={clsx("relative", className)}>
    {error && <div className="text-xs text-b2b-red-lv2 absolute">{error}</div>}
  </div>
);
