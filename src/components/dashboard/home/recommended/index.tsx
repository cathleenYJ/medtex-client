import { Section } from "@ui/section";
import { Slider } from "@ui/slider";
import { auth } from "@lib/nextauth/auth";
import { fetchData } from "@/data/fetch-data";
import { RecommendedCard } from "./recommended-card";

export const Recommended: React.FC = async () => {
  const session = await auth();
  const res = await fetchData.basic
    .recommended(session)
    .catch(() => ({ data: null }));
  return (
    <Section title="Recommended">
      {res.data && (
        <Slider>
          {res.data.map(
            (props) =>
              props && (
                <RecommendedCard key={`recommended-${props.id}`} {...props} />
              )
          )}
        </Slider>
      )}
    </Section>
  );
};
