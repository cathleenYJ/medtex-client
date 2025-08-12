type MenuItemBase = {
  key: string;
  label: React.ReactNode;
  items?: MenuItemType[]; // allow nesting
};

type MenuItemHref = MenuItemBase & {
  href: string | URL;
  onClick?: never;
};

type MenuItemClick = MenuItemBase & {
  onClick: () => void;
  href?: never;
};

export type MenuItemType =
  | MenuItemHref
  | MenuItemClick
  | (MenuItemBase & { href?: never; onClick?: never });
