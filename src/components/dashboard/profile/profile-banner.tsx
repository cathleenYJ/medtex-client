import clsx from "clsx";
import Image from "next/image";
import { BannerContainer } from "@ui/banner-container";
import { MakeAppointmentBtn } from "@ui/make-appointment-btn";
import { apiImageUrl } from "@/utils/api-image-url";
import { headerSans } from "@/styles/font";
import type { BuyerData } from "@/types";

export const ProfileBanner: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  return (
    <div
      className={clsx(
        "sm:pt-32 sm:pb-20 w-full bg-(image:--profile-banner) bg-no-repeat bg-cover bg-center",
        "relative before:content-[''] before:block before:sm:hidden before:absolute before:inset-0 before:backdrop-blur-lg before:bg-black/30"
      )}
    >
      <BannerContainer>
        <div className="flex flex-wrap gap-10 sm:px-10 pt-0 sm:pt-14 pb-14 w-full max-w-4xl sm:backdrop-blur-lg sm:bg-black/30 sm:rounded-2xl relative">
          <div className="flex flex-wrap gap-5 sm:gap-7 w-full text-white">
            <div className="w-full flex flex-wrap gap-2.5 sm:gap-5">
              <div className="flex items-center w-28">
                <Image
                  fill
                  className="!relative"
                  src={apiImageUrl(buyer.company_logo)}
                  alt="company_logo"
                />
              </div>
              <div className="flex items-center w-max sm:w-fit text-base sm:text-lg md:text-xl font-semibold">
                {buyer.company_name}
              </div>
            </div>
            <div
              className={clsx(
                "w-full text-4xl sm:text-5xl md:text-6xl",
                headerSans.variable
              )}
            >
              {buyer.hero_title || ""}
            </div>
            <div className="w-full text-base md:text-lg text-b2b-lv1">
              {buyer.hero_subtitle || ""}
            </div>
          </div>
          <MakeAppointmentBtn
            buyer={buyer}
            className="px-8 py-4 bg-white border border-solid border-white/20 shadow-btn rounded-[0.5rem] font-medium sm:text-lg text-base text-b2b-lv6"
          >
            Get in touch →
          </MakeAppointmentBtn>
        </div>
      </BannerContainer>
    </div>
  );
};
