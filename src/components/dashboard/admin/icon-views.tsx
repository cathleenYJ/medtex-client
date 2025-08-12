import { Routes } from "@/config/routes";
import {
  CurrencyDollarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { Gauge, Identification, ListChecks, BookOpen, Star } from "@icons";

export const iconViews = (pathname: string) => {
  switch (pathname) {
    case Routes.private.registrationRecord:
      return <Gauge className="size-5" />;
    case Routes.private.matchmaking:
      return <BookOpen className="size-5" />;
    case Routes.private.appointments:
      return <CalendarDaysIcon className="size-5" />;
    case Routes.private.wishlist:
      return <Star className="size-5" />;
    case Routes.private.registrationRecord:
      return <ListChecks className="size-5" />;
    case Routes.private.paymentHistory:
      return <CurrencyDollarIcon className="size-5" />;
    case Routes.private.profile:
      return <Identification className="size-5" />;
    default:
      return null;
  }
};
