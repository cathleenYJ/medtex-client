import { SectionTitle } from "@ui/title";
import { fetchData } from "@/data/fetch-data";
import { auth } from "@lib/nextauth/auth";
import { Results } from "./results";

export const FilterResult: React.FC = async () => {
  const session = await auth();
  const buyers = await fetchData.buyers
    .all(session)
    .catch(() => ({ data: null }));
  const wishlist = await fetchData.admin
    .wishlist(session)
    .catch(() => ({ data: null }));

  return (
    <>
      <SectionTitle className="text-right font-light">Sort</SectionTitle>
      {buyers.data && <Results wishlist={wishlist.data} buyers={buyers.data} />}
    </>
  );
};
