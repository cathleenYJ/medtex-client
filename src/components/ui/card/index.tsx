import clsx from "clsx";

export const Card: React.FC<{
  className?: string;
  styles?: React.CSSProperties;
  children?: React.ReactNode;
  theme?: string;
  border?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ className, styles, children, theme, border = true, onClick }) => {
  return (
    <div
      style={styles}
      className={clsx(
        "rounded-2xl",
        border && "border border-solid border-white/20",
        className
      )}
      data-card-theme={theme}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const Cards: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return <div className={clsx("flex", className)}>{children}</div>;
};
