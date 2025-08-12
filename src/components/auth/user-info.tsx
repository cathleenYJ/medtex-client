"use client";

import Link from "next/link";
import {
  ArrowRightEndOnRectangleIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@ui/button";
import { useAuthBtn } from "@/hooks/use-auth-btn";
import { Routes } from "@/config/routes";

export const UserInfo: React.FC<{ close: () => void }> = ({ close }) => {
  const { user, authItem } = useAuthBtn();
  return (
    <div className="p-1 w-56">
      <div className="p-2 flex items-center gap-2">
        <div className="shrink-0 text-sm">{user?.name}</div>
        <Button
          variant="userinfo"
          component={Link}
          href={Routes.private.registrationRecord}
          onClick={close}
        >
          <Content icon={PresentationChartBarIcon} text="Admin" />
        </Button>
        <Button
          variant="userinfo"
          component={Button}
          onClick={() => {
            close();
            authItem.onClick && authItem.onClick();
          }}
        >
          <Content icon={ArrowRightEndOnRectangleIcon} text={authItem.label} />
        </Button>
      </div>
    </div>
  );
};

const Content: React.FC<{
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  text: React.ReactNode;
}> = ({ icon: Icon, text }) => (
  <>
    <Icon className="shrink-0 size-5" />
    <div className="ps-0.5 text-xs max-w-0 transition-all overflow-clip">
      {text}
    </div>
  </>
);
