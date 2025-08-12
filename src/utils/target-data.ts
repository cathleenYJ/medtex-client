import { ConfigValue } from "@/config";

export const targetData = <T>(
  buyerData: T,
  sellerData: T,
  roleId: number
): T => {
  return roleId === ConfigValue.ROLES.buyer ? sellerData : buyerData;
};
