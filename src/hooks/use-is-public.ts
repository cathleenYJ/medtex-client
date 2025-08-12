import { usePathname } from "next/navigation";
import { Routes } from "@/config/routes";

export const useIsPublic = () => {
  const pathname = usePathname();
  return ![
    ...Object.values(Routes.private),
    ...Object.values(Routes.auth),
    ...Object.values(Routes.documents),
  ].some((path) => pathname.startsWith(path));
};
