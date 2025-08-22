import { ConfigValue } from "@/config";
import { Routes } from "@/config/routes";

export const privileges = (role_id: number, pathname: string) => {
  // 使用新的 PRIVILEGES 陣列，不分角色
  return ConfigValue.PRIVILEGES.some((route) => {
    const r = String(route);
    if (r === Routes.private.registrationRecord) {
      return pathname === r;
    }
    return pathname.startsWith(r);
  });
};
