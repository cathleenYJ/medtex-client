import clsx from "clsx";

export const ContactBlock: React.FC<{
  className?: string;
  title: string;
  children?: React.ReactNode;
}> = ({ className, title, children }) => (
  <div className={clsx("w-full xl:w-1/2 flex flex-col", className)}>
    <div className="text-sm md:text-base text-b2b-lv1">{title}</div>
    <div className="text-base md:text-xl font-medium text-white">
      {children}
    </div>
  </div>
);
