"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "@ui/loading";
import { ConfigValue } from "@/config";
import type { SidebarItem } from "@/types";
import { iconViews } from "./icon-views";

const privileges = (role: number, pathname: string) => {
  const roleName = role === ConfigValue.ROLES.buyer ? "buyer" : "seller";
  return Object.values(ConfigValue.PRIVILEGES[roleName]).includes(pathname);
};

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const { data: session } = useSession();
  
  // 靜態側邊欄數據
  const sidebarData: SidebarItem[] = [
    {
      label: "Dashboards",
      items: [
        { label: "Overview", href: "/admin" },
        { label: "Registration Record", href: "/admin/registration-record" },
        { label: "Payment History", href: "/admin/payment-history" },
      ]
    }
  ];

  // 根據用戶角色過濾項目
  const data = session?.user 
    ? sidebarData.map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          privileges(session.user.role_id, item.href)
        ),
      }))
    : [];

  const isFetching = false;

  // const userRole = useMemo(() => {
  //   if (!session?.user.role_id) return null;
  //   return session?.user.role_id === ConfigValue.ROLES.buyer
  //     ? "Buyer"
  //     : "Seller";
  // }, [session?.user.role]);

  return (
    <aside
      className={clsx(
        "bg-medtex-blue min-h-screen pt-15 sm:py-7 pb-7 sm:ps-10 sm:pe-4 flex flex-col gap-5 sm:-ml-5 sm:pl-5",
        className
      )}
    >
      <div className="hidden sm:block text-lg font-medium text-white">Merchant</div>
      {/* <div className="hidden sm:block text-lg font-medium">{userRole}</div> */}
      <div className="flex flex-col gap-7">
        {isFetching ? (
          <Spinner />
        ) : (
          data?.map((group) => (
            <ItemsGroup
              key={group.label}
              label={group.label}
              items={group.items}
            />
          ))
        )}
      </div>
    </aside>
  );
};

type ItemProps = SidebarItem["items"][number] & { current?: boolean };

const ItemsGroup: React.FC<{
  label: SidebarItem["label"];
  items: ItemProps[];
}> = ({ label, items }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-2">
      <div className="hidden sm:block px-3 text-white/60">{label}</div>
      {items.map((item) => (
        <Item key={item.label} {...item} current={pathname === item.href} />
      ))}
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ label, href, current = false }) => (
  <Link
    className={clsx(
      "ps-2.5 sm:ps-7 py-1.5 flex gap-1 items-center text-sm relative rounded-xs text-white hover:text-white",
      current &&
        "bg-white/10 before:content-[''] before:absolute before:top-0 before:left-0 before:bg-medtex-blue-light before:block before:w-1 before:h-full before:rounded-sm text-white"
    )}
    href={href}
  >
    <span className="block shrink-0">{iconViews(href)}</span>
    <span className="hidden sm:block grow">{label}</span>
  </Link>
);
