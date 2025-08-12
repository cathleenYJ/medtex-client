import Link from "next/link";
import { Fragment } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { Tag } from "@ui/tag";
import { Hr } from "@ui/splitter";
import { CompanyLogo } from "@dashboard/company-logo";
import { CompanyLocation } from "@dashboard/company-location";
import { apiImageUrl } from "@/utils/api-image-url";
import type { BuyerData } from "@/types";
import { ConfigValue } from "@/config";

const annualRevenue = new Map(Object.entries(ConfigValue.ANNUAL_REVENUE));

export const CompanyInfo: React.FC<{ buyer: BuyerData }> = ({ buyer }) => {
  const info = [
    { title: "Established Since", description: buyer.company_established_year },
    {
      title: "Annual revenue",
      description: buyer.business_annual_revenue
        ? annualRevenue.get(buyer.business_annual_revenue) || ""
        : "",
    },
    { title: "Employees", description: buyer.number_of_employees },
  ];
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-5">
        <CompanyLogo
          className="max-w-36"
          src={apiImageUrl(buyer.company_logo)}
          alt="logo"
        />
        <CompanyLocation
          className="grow"
          companyName={buyer.company_name || ""}
          companyLocation={buyer.headquarter_location || ""}
        />
      </div>
      {buyer.company_website && <CompanyWebsite href={buyer.company_website} />}
      <div
        className="text-sm sm:text-base"
        dangerouslySetInnerHTML={{
          __html: buyer.about_company
            ? buyer.about_company.replaceAll("\n", "<br>")
            : "",
        }}
      />
      <div className="basis-full flex flex-wrap gap-4 sm:gap-7.5 font-bold">
        {info.map(({ title, description }, i) => (
          <Fragment key={title}>
            <CompanyInfoSingle title={title}>
              {description || ""}
            </CompanyInfoSingle>
            {i !== info.length - 1 && (
              <Hr className="w-full sm:w-0 sm:border-l sm:h-full" />
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

const CompanyWebsite: React.FC<{ href: string }> = ({ href }) => (
  <div className="w-full">
    <Tag className="max-w-full w-full xs:w-auto inline-block h-min text-center px-0 py-0">
      <Link
        className="flex gap-2.5 justify-between items-center w-full h-min px-5 py-3"
        href={href}
        target="_blank"
      >
        {href.replace(/^http[s]?\:\/\/|\/$/g, "")}
        <ArrowUpRightIcon className="size-4 shrink-0" />
      </Link>
    </Tag>
  </div>
);

const CompanyInfoSingle: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => (
  <div className="flex sm:flex-col justify-between gap-5 grow sm:w-min w-full font-medium">
    <div className="text-sm sm:text-base">{title}</div>
    <div className="text-base sm:text-xl w-max">{children}</div>
  </div>
);
