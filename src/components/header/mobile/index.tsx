import { MobileMenu } from "./mobile-menu";
import { menuItemsMain, menuItemsRest } from "../menu-items";

export const Menu: React.FC = async () => {
  const mainItems = await menuItemsMain().catch(() => []);
  const restItems = await menuItemsRest().catch(() => []);
  return <MobileMenu items={[...mainItems, ...restItems]} />;
};
