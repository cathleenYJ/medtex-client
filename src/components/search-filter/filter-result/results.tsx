"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Card } from "@ui/card";
import { Spinner } from "@ui/loading";
import { AddToList } from "@ui/button/add-to-list";
import { BusinessAttributes } from "@dashboard/business-attributes";
import { CompanyLocation } from "@dashboard/company-location";
import { CompanyLogo } from "@dashboard/company-logo";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppSearchParams } from "@/hooks/use-search-params";
import { apiImageUrl } from "@/utils/api-image-url";
import { ConfigValue } from "@/config";
import type { BuyerData, ResponseData, WishListItem } from "@/types";
import { filterWaitFamily } from "../state";
import { filterLogic } from "./filter-logic";

export const Results: React.FC<{
  wishlist: ResponseData<WishListItem>[] | null;
  buyers: BuyerData[];
}> = ({ wishlist, buyers }) => {
  const wishlistMap = useMemo(() => {
    if (!wishlist) return new Map();
    return new Map(wishlist.map((item) => [item.meeting_id, item]));
  }, [wishlist]);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px -100px 0px",
  });
  const { isWaiting } = useDebounce(filterWaitFamily);
  const { searchParams, setSearchParams } = useAppSearchParams();
  const pathname = usePathname();
  const currentSize = searchParams.get("size")
    ? Number(searchParams.get("size"))
    : ConfigValue.RESULT_LIMIT;
  const isMax = currentSize >= buyers.length;
  const loadMore = () => {
    if (isMax) return;
    setSearchParams({
      key: "size",
      value: String(currentSize + ConfigValue.RESULT_LIMIT),
    });
  };
  useEffect(() => {
    inView && loadMore();
  }, [inView]);
  useEffect(() => {
    if (!!searchParams.get("size")) return;
    setSearchParams({ key: "size", value: String(currentSize) });
  }, [pathname]);
  return isWaiting ? (
    <Spinner className="border-white" />
  ) : (
    <>
      {buyers
        .filter((buyer) => filterLogic(buyer, searchParams))
        .slice(0, currentSize + 1)
        .map((buyer) => (
          <BuyerResult
            key={buyer.id}
            buyer={buyer}
            isWishlisted={Boolean(wishlistMap.get(buyer.meeting_id))}
          />
        ))}
      {!isMax && (
        <div
          ref={ref}
          className={clsx(
            "w-full h-0 relative",
            "before:-mt-96 before:content-[''] before:block before:w-full before:h-96 before:bg-gradient-to-t before:from-black before:to-transparent"
          )}
        />
      )}
    </>
  );
};

const BuyerResult: React.FC<{ buyer: BuyerData; isWishlisted?: boolean }> = ({
  buyer,
  isWishlisted,
}) => {
  const starRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const onClick = (e: React.MouseEvent) => {
    if (!starRef.current) return;
    if (
      starRef.current.contains(e.target as Node) ||
      e.target === starRef.current
    )
      return;
    router.push(`/profile/${buyer.id}`);
  };
  return (
    <Card
      className="flex flex-col overflow-hidden cursor-pointer"
      theme={buyer.profile_theme || "green"}
      onClick={onClick}
    >
      <div className="relative flex flex-col sm:flex-row gap-5 px-5 sm:px-7 pt-4 sm:pt-7 pb-4 sm:pb-6 bg-gradient-to-r from-(--gradient-start) to-(--gradient-end) w-full">
        <CompanyLogo
          className="size-25 bg-img-bg rounded-[1.125rem] p-1"
          src={apiImageUrl(buyer.company_logo)}
          alt="logo"
        />
        <CompanyLocation
          className="text-white grow"
          companyName={buyer.company_name || ""}
          companyLocation={buyer.headquarter_location || ""}
          companyDescription={buyer.about_company || ""}
        />
        {buyer.meeting_id && (
          <div className="shrink-0 flex items-start absolute top-5 right-5 sm:static">
            <AddToList
              className="opacity-80 hover:opacity-100 transition-opacity size-5 text-white"
              ref={starRef}
              meeting_id={buyer.meeting_id}
              isWishlisted={isWishlisted}
            />
          </div>
        )}
      </div>
      <BusinessAttributes
        className="px-5 sm:px-7 pt-4 sm:pt-6 pb-4 sm:pb-7 bg-(--attribute-block)"
        businessAttributes={Object.values(buyer.business_attributes || [])}
        businessNature={Object.values(buyer.business_nature || [])}
      />
    </Card>
  );
};
