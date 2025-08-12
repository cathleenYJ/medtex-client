"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
} from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { MenuItemType } from "@/types";
export * from "./menu-item-icon";

const menuItemStyles = [
  "hover:bg-b2b-lv4 hover:text-white",
  "text-black",
  "cursor-pointer group w-full rounded-md px-2 py-2 text-sm flex items-center",
];

export const NestMenu: React.FC<{
  btn: React.ReactNode;
  className?: string;
  items?: MenuItemType[];
  customElem?: React.ElementType<{ close: () => void }>;
  itemsClassName?: string;
}> = ({ btn, className, items, customElem: CustomElem, itemsClassName }) => {
  return (
    <Menu
      as="div"
      className={clsx("relative text-left", className || "inline-block")}
    >
      <div className="flex items-end">
        <MenuButton className="w-max inline-flex items-end gap-3 cursor-pointer">
          {btn}
        </MenuButton>
      </div>
      <MenuItems
        transition
        anchor="bottom start"
        className={clsx(
          itemsClassName || "w-max max-w-full min-w-56",
          "absolute z-50 right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-white/30 ring-opacity-5 focus:outline-none",
          "origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
        )}
      >
        {CustomElem && (
          <MenuItem>{({ close }) => <CustomElem close={close} />}</MenuItem>
        )}
        {items &&
          items.map(({ key, items: subItems, ...props }) => (
            <NestItems key={key} items={subItems} {...props} />
          ))}
      </MenuItems>
    </Menu>
  );
};

const renderNestItems = (
  label: React.ReactNode,
  submenuVisible: boolean,
  subMenuToggle: (e: React.MouseEvent<HTMLButtonElement>) => void,
  close: () => void,
  href?: string | URL,
  onClick?: () => void,
  items?: MenuItemType[]
) => {
  if (items) {
    return (
      <ExpandBtn
        label={label}
        submenuVisible={submenuVisible}
        onClick={subMenuToggle}
      />
    );
  } else if (href) {
    return <MenuLink label={label} href={href} close={close} />;
  } else if (onClick) {
    return <MenuBtn label={label} onClick={onClick} close={close} />;
  } else {
    return <></>;
  }
};

type NestItemsProps = {
  label: React.ReactNode;
  href?: string | URL;
  onClick?: () => void;
  items?: MenuItemType[];
};
const NestItems: React.FC<NestItemsProps> = ({
  label,
  href,
  onClick,
  items,
}) => {
  const [submenuVisible, setSubmenuVisible] = useState<boolean>(false);
  const subMenuToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmenuVisible((prev) => !prev);
  };
  return (
    <>
      <div className="px-1 py-1 max-h-[50vh] overflow-y-auto">
        <MenuItem>
          {({ close }) =>
            renderNestItems(
              label,
              submenuVisible,
              subMenuToggle,
              close,
              href,
              onClick,
              items
            )
          }
        </MenuItem>
      </div>
      {items && submenuVisible && (
        <div className="px-1 py-1 max-h-[50vh] overflow-y-auto">
          {items.map(({ key, ...props }) => (
            <NestItems key={key} {...props} />
          ))}
        </div>
      )}
    </>
  );
};

type ExpandBtnProps = {
  label: React.ReactNode;
  submenuVisible: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const ExpandBtn: React.FC<ExpandBtnProps> = ({
  label,
  submenuVisible,
  onClick,
}) => {
  return (
    <Button className={clsx(...menuItemStyles)} onClick={onClick}>
      {!submenuVisible ? (
        <>
          {label}
          <ChevronRightIcon className="size-5 mr-2" />
        </>
      ) : (
        <>
          <ChevronLeftIcon className="size-5 mr-2" />
          {label}
        </>
      )}
    </Button>
  );
};

type MenuLinkProps = {
  label: React.ReactNode;
  href: string | URL;
  close: () => void;
};
const MenuLink: React.FC<MenuLinkProps> = ({ label, href, close }) => (
  <Link href={href} onClick={close} className={clsx(...menuItemStyles)}>
    {label}
  </Link>
);

type MenuBtnProps = {
  label: React.ReactNode;
  onClick: () => void;
  close: () => void;
};
const MenuBtn: React.FC<MenuBtnProps> = ({ label, onClick, close }) => {
  const handleClick = () => {
    close();
    onClick();
  };
  return (
    <Button onClick={handleClick} className={clsx(...menuItemStyles)}>
      {label}
    </Button>
  );
};
