"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Hr } from "@ui/splitter";
import { AddToList } from "@ui/button/add-to-list";
import { LoadingBlock } from "@dashboard/loading-block";
import { MakeAppointment } from "@dashboard/admin/actions";
import { CompanyLogo } from "@dashboard/company-logo";
import { useModal } from "@modals/context";
import { ProfileModal } from "@modals/views/profile-modal";
import { fetchData } from "@/data/fetch-data";
import type { WishListItem } from "@/types";
import { apiImageUrl } from "@/utils/api-image-url";

export default function WishlistPage() {
  const { data: session } = useSession();
  const { data, isFetching } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => fetchData.admin.wishlist(session),
    select: (res) => res.data,
    enabled: !!session,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const { openModal } = useModal();
  const openProfile = (id: number) => {
    if (!session?.user.role_id) return;
    openModal(<ProfileModal id={id} session={session} />);
  };

  return (
    <div className="flex flex-col gap-5">
      {isFetching || !session ? (
        <LoadingBlock />
      ) : (
        data?.map((item) => (
          <WishListBuyer key={item.id} {...item} openProfile={openProfile} />
        ))
      )}
    </div>
  );
}

const WishListBuyer: React.FC<
  WishListItem & { openProfile: (id: number) => void }
> = ({
  id,
  meeting_id,
  buyer_theme,
  buyer_id,
  buyer_logo_small,
  buyer_company,
  region_covered,
  openProfile,
}) => {
  return (
    <div
      data-component-theme={buyer_theme || "green"}
      className="p-4 md:px-7 md:py-5 flex flex-col md:flex-row items-center justify-between gap-5 relative bg-linear-90 from-b2b-bg to-b2b-lv5 md:from-b2b-bg/40 md:to-b2b-bg/40 rounded-md"
    >
      <div
        className="flex flex-col md:flex-row md:items-center gap-2.5 md:gap-5 cursor-pointer w-full md:w-2/3"
        onClick={() => openProfile(buyer_id)}
      >
        <CompanyLogo
          className="size-15 p-2 bg-white rounded-lg"
          src={apiImageUrl(buyer_logo_small)}
        />
        <div className="flex flex-col md:flex-row md:gap-3.5 w-full">
          <div className="font-medium text-lg w-full md:w-1/2">
            {buyer_company}
          </div>
          <Hr className="border-l" />
          {region_covered ? (
            <div className="flex items-center gap-1.5 text-sm w-full md:w-1/2">
              <MapPinIcon className="size-5" />
              <div>{Object.values(region_covered).join(", ")}</div>
            </div>
          ) : (
            "-"
          )}
        </div>
      </div>
      <MakeAppointment className="text-sm w-full md:w-auto" buyer_id={buyer_id}>
        Make an Appointment
      </MakeAppointment>
      <div className="absolute md:static top-5 right-5">
        {meeting_id && (
          <AddToList
            className="opacity-80 hover:opacity-100 size-5"
            id={id}
            meeting_id={meeting_id}
          />
        )}
      </div>
    </div>
  );
};
