import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import type { Session } from "next-auth";

export const useInvoiceDefault = (session: Session | null, userEmail: string) => {
  // Fetch profile data to prefill form
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile-data"],
    queryFn: () => fetchData.sellers.getProfileData(session!), // 使用 ! 因為 enabled 確保了 session 存在
    enabled: !!session?.user?.adminToken, // 更安全的檢查
  });

  // 取得預設值
  let defaultValues = {
    tax_email: userEmail || "",
    tax_title: "",
    tax_id: "",
  };

  if (profileData?.data) {
    const { invoice_info, profile_info, participant_info } = profileData.data;
    defaultValues = {
      tax_email: invoice_info?.invoice_email || profile_info?.contact_email || userEmail || "",
      tax_title: invoice_info?.invoice_company_name || 
                 participant_info?.participant_company_name_zh || 
                 participant_info?.participant_company_name || "",
      tax_id: invoice_info?.invoice_business_id || profile_info?.business_id || "",
    };
  }

  return {
    defaultValues,
    isLoading: isProfileLoading,
  };
};