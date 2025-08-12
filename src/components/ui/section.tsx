import clsx from "clsx";
import { Cards } from "@ui/card";
import { SectionTitle } from "@ui/title";

export const Section: React.FC<{
  className?: string;
  childrenClassName?: string;
  title?: string;
  children?: React.ReactNode;
}> = ({ className, childrenClassName, title, children }) => (
  <SectionBlock className={className}>
    {title && (
      <SectionTitle id={title} className="font-light px-2.5">
        {title}
      </SectionTitle>
    )}
    <Cards className={childrenClassName || "gap-3 sm:gap-4 flex-wrap"}>
      {children}
    </Cards>
  </SectionBlock>
);

export const SectionBlock: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <section className={clsx("flex flex-col gap-6", className)}>
      {children}
    </section>
  );
};
