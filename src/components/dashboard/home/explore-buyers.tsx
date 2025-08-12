import { Suspense } from "react";
import { Section } from "@ui/section";
import { Spinner } from "@ui/loading";
import { Card, Cards } from "@ui/card";
import { FilterResult, FilterOptions } from "@/components/search-filter";

export const ExploreBuyers: React.FC<{
  className?: string;
  title?: string;
}> = ({ className, title }) => {
  return (
    <Section
      className={className}
      childrenClassName="gap-6 sm:gap-12 flex-wrap md:flex-nowrap"
      title={title}
    >
      <Card className="w-full md:w-2/7 shrink-0 max-h-96 md:max-h-screen pe-0.5 py-6 md:py-7 bg-filter-options sticky top-0 z-10 shadow-lg md:shadow-none shadow-black/10">
        <Suspense fallback={<Spinner className="border-white" />}>
          <FilterOptions />
        </Suspense>
      </Card>
      <Cards className="flex-col gap-7.5 md:gap-10 grow">
        <Suspense fallback={<Spinner className="border-white" />}>
          <FilterResult />
        </Suspense>
      </Cards>
    </Section>
  );
};
