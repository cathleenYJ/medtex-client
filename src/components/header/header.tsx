import { DesktopBtns } from "./desktop/desktop-btns";
import { DashboardLogo } from "../icons/dashboard-logo";
import { HeaderWrapper } from "./header-wrapper";

export const Header: React.FC = async () => {
  return (
    <HeaderWrapper>
      <header className="bg-white flex flex-col gap-1 py-3 px-5 sm:px-5 absolute z-10 top-0 w-full backdrop-blur-lg sm:backdrop-blur-none">
        <div className="flex justify-between items-center relative">
          <div className="sm:block w-full max-w-[180px] mb-2">
            <DashboardLogo className="w-full h-auto" />
          </div>
          {/* <MobileMenu items={allItems} /> */}
          <DesktopBtns />
        </div>
        {/* <DesktopMenu items={allItems} /> */}
      </header>
    </HeaderWrapper>
  );
};
