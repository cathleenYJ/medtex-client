import { Suspense } from "react";
import { Spinner } from "@ui/loading";
import { SectionContainer } from "@ui/section-container";
import { ExploreBuyers } from "@dashboard/home/explore-buyers";

export default function ResultPage() {
  return (
    <SectionContainer className="pt-10 pb-40">
      <Suspense fallback={<Spinner className="border-white" />}>
        <ExploreBuyers className="w-full" />
      </Suspense>
    </SectionContainer>
  );
}
