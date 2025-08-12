import { notFound } from "next/navigation";
import { SectionContainer } from "@ui/section-container";
import {
  ProfileBanner,
  Opportunities,
  Qualfication,
  CompanyOverview,
  Highlights,
  Contact,
} from "@dashboard/profile";
import { auth } from "@lib/nextauth/auth";
import { fetchData } from "@/data/fetch-data";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ buyer_id: string }>;
}) {
  const session = await auth();
  const { buyer_id } = await params;
  const res = await fetchData.buyers.one(Number(buyer_id), session);
  if (!res.data) notFound();
  return (
    <div
      className="sm:-mt-32 relative overflow-x-hidden"
      data-theme={res.data.profile_theme || "green"}
    >
      <ProfileBanner buyer={res.data} />
      <SectionContainer className="py-24 gap-20">
        <Opportunities buyer={res.data} />
        <Qualfication buyer={res.data} />
        <CompanyOverview buyer={res.data} />
        <Highlights buyer={res.data} />
        <Contact buyer={res.data} />
      </SectionContainer>
    </div>
  );
}
