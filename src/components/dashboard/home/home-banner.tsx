import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { BannerContainer } from "@ui/banner-container";
import { ArrowDownCircle } from "@icons";
import { ExploreBuyersString, toId } from "@/utils/elements-id";
import { headerSans } from "@/styles/font";

export const HomeBanner: React.FC = () => {
  return (
    <BannerContainer className="flex flex-wrap sm:flex-nowrap gap-7.5 pb-12.5">
      <div className="w-full sm:w-1/2 flex flex-col gap-2.5 py-5">
        <div className="flex flex-col gap-3.5">
          <div className="text-2xl sm:text-3xl text-b2b-lv1">
            Buyer–Supplier Matching Hub
          </div>
          <div
            className={clsx(
              "text-3xl sm:text-4xl md:text-7xl text-white font-semibold",
              headerSans.variable
            )}
          >
            Partner with Verified Buyers. Scale Without Borders.
          </div>
        </div>
        <div className="flex flex-col gap-10 content-between text-white grow">
          <div className="text-base sm:text-lg font-medium grow">
            We connect Taiwan’s biomedical innovators with trusted global
            buyers. Access pre-qualified leads and expand your global reach.
          </div>
          <div>
            <Link
              className="block w-fit mx-auto sm:ms-0"
              href={`#${toId(ExploreBuyersString)}`}
              scroll={true}
            >
              <ArrowDownCircle className="size-12" />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 rounded-[1.25rem] overflow-hidden">
        <Image
          fill
          className="!relative object-cover"
          src="/home-banner-event.png"
          alt="event"
        />
      </div>
    </BannerContainer>
  );
};
