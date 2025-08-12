import { useQuery } from "@tanstack/react-query";
import { ConfigValue } from "@/config";
import { fetchData } from "@/data/fetch-data";
import type { Session } from "next-auth";
import type {
  ApiResponse,
  BuyerData,
  DialogProfile,
  ResponseData,
  SellerData,
} from "@/types";
import timezones from "@/data/timezone.json";

const timezomesMap = new Map(timezones.map((time) => [time.id, time.name]));

export const useModalData = (id: number, session: Session) => {
  const role_id = session?.user.role_id;
  const isSeller = role_id === ConfigValue.ROLES.seller;
  const isBuyer = role_id === ConfigValue.ROLES.buyer;

  const { data, isLoading } = useQuery({
    queryKey: [isSeller ? "buyer" : "seller", id],
    queryFn: () => {
      if (isSeller) return fetchData.buyers.one(id, session);
      if (isBuyer) return fetchData.sellers.one(id, session);
      return Promise.reject("Invalid role");
    },
    select: (res: ApiResponse<ResponseData<SellerData | BuyerData>>) =>
      res.data && role_id ? getTarget(res.data, role_id) : null,
    enabled: !!session && (isSeller || isBuyer),
  });

  return { data, isLoading };
};

const getTarget = (
  data: ResponseData<SellerData | BuyerData>,
  role_id: number
): ResponseData<DialogProfile> | undefined => {
  if (role_id === ConfigValue.ROLES.seller) {
    const buyer = data as ResponseData<BuyerData>;
    return {
      theme: buyer.profile_theme,
      logo: buyer.company_logo,
      company_name: buyer.company_name,
      business_nature: buyer.business_nature,
      company_website: buyer.company_website,
      user_name: buyer.user_name,
      job_title: buyer.buyer_title,
      timezone:
        buyer.timezone && (timezomesMap.get(buyer.timezone) || buyer.timezone),
      business_annual_revenue: buyer.business_annual_revenue,
      purchasing_requirement: buyer.purchasing_requirement,
      headquarter_location: buyer.headquarter_location,
      required_certification: buyer.required_certification,
    };
  }
  if (role_id === ConfigValue.ROLES.buyer) {
    const seller = data as ResponseData<SellerData>;
    return {
      theme: "green",
      logo: seller.company_logo,
      company_name: seller.company_name,
      business_nature: seller.nature_of_business
        ? (JSON.parse(seller.nature_of_business) as Record<string, string>)
        : null,
      company_website: seller.website_url,
      user_name: seller.full_name,
      job_title: seller.job_title,
      timezone:
        seller.timezone &&
        (timezomesMap.get(seller.timezone) || seller.timezone),
      product_url: seller.product_url
        ? (JSON.parse(seller.product_url) as string[])
        : null,
    };
  }
};
