"use client";

import { usePathname } from "next/navigation";
import { Routes } from "@/config/routes";

export const Welcome: React.FC = () => {
  const pathname = usePathname();
  return pathname.startsWith(Routes.private.makeAppointment) ? null : (
    <div className="flex gap-5 justify-between">
      <div className="text-4xl font-medium">{welcomeText(pathname)}</div>
      {/* <Button
        component={Link}
        href="/result"
        className="bg-white text-black rounded-md hidden sm:flex items-center gap-1.5 px-3 py-2.5"
      >
        <PlusIcon className="size-5" />
        <span className="text-sm">Explore More</span>
      </Button> */}
    </div>
  );
};

const welcomeText = (pathname: string) => {
  switch (pathname) {
    case Routes.private.registrationRecord:
      return "Welcome back,";
    case Routes.private.matchmaking:
      return "Matchmaking";
    case Routes.private.appointments:
      return "Appointments";
    case Routes.private.wishlist:
      return "Wishlist";
    case Routes.private.registrationRecord:
      return "Registration Record";
    case Routes.private.paymentHistory:
      return "Payment History";
    case Routes.private.profile:
      return "Profile Page";
    default:
      return "Welcome back,";
  }
};
