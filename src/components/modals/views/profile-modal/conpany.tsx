import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { apiImageUrl } from "@/utils/api-image-url";
import { ConfigValue } from "@/config";
import type { DialogProfile, ResponseData } from "@/types";

const annualRevenue = new Map(Object.entries(ConfigValue.ANNUAL_REVENUE));

const labels = {
  business_capital_amount: "Capital Amount (USD)",
  purchasing_requirement: "Main Business",
  business_nature: "Nature of Business",
  headquarter_location: "Headquarter Location",
  required_certification: "Certification:",
  company_website: "Website URL",
  product_url: "Product URL",
};

const Tags: React.FC<{ tags: Record<string, string> }> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {Object.entries(tags).map(([key, value]) => (
        <div className="text-sm bg-white/10 px-2.5 py-0.5 rounded-sm" key={key}>
          {value}
        </div>
      ))}
    </div>
  );
};

const labelViews = (labelKey: string, label: unknown) => {
  if (!label) return "";
  switch (labelKey) {
    case "business_capital_amount":
      return annualRevenue.get(label as string) || "";
    case "purchasing_requirement":
      return <Tags tags={label as Record<string, string>} />;
    case "business_nature":
      return <Tags tags={label as Record<string, string>} />;
    case "required_certification":
      return <Tags tags={label as Record<string, string>} />;
    case "business_attributes":
      return <Tags tags={label as Record<string, string>} />;
    case "company_website":
      return (
        <Link href={label} target="_blank">
          {label as string}
        </Link>
      );
    case "product_url":
      return (
        <>
          {(label as string[]).map((link) => (
            <Link key={link} href={link} target="_blank">
              {link}
            </Link>
          ))}
        </>
      );
    default:
      if (typeof label === "string") return label;
      return "";
  }
};

export const Company: React.FC<{ data: ResponseData<DialogProfile> }> = ({
  data,
}) => {
  const dataMap = useMemo(() => new Map(Object.entries(data)), [data]);
  return (
    <>
      <div className="shrink-0">
        <div className="size-10 sm:size-20">
          <Image
            fill
            className="rounded-lg bg-white  !relative object-contain"
            src={apiImageUrl(data.logo)}
            alt="buyer logo"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="text-2xl font-semibold">{data.company_name}</div>
        <div className="tezt-sm flex flex-col gap-2">
          {Object.entries(labels).map(([key, label]) => {
            const value = dataMap.get(key);
            if (!value) return null;
            return (
              <div
                className="flex flex-col sm:flex-row gap-1 sm:gap-3.5"
                key={key}
              >
                <div className="w-45 shrink-0 text-white/60">{label}</div>
                <div className="grow">{labelViews(key, value)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
