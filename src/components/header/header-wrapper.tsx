"use client";

import { usePathname } from "next/navigation";

interface HeaderWrapperProps {
  children: React.ReactNode;
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  
  // 只有在 admin 頁面才顯示 header
  const isAdminPage = pathname.startsWith('/admin');
  
  // 如果不是 admin 頁面，不顯示 header
  if (!isAdminPage) {
    return null;
  }

  return <>{children}</>;
};
