import { auth } from "@lib/nextauth/auth";
import { fetchData } from "@/data/fetch-data";
import { Options } from "./options";

export const FilterOptions: React.FC = async () => {
  const session = await auth();
  const res = await fetchData.basic
    .filterOptions(session)
    .catch(() => ({ data: null }));
  return (
    <div className="flex flex-col bg-inherit h-full overflow-y-auto ps-6 pe-5.5">
      {res.data && <Options filterOptions={res.data} />}
    </div>
  );
};
