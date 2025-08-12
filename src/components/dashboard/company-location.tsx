import clsx from "clsx";
import { MapPinIcon } from "@heroicons/react/24/outline";

export const CompanyLocation: React.FC<{
  className?: string;
  companyName: string;
  companyLocation: string;
  companyDescription?: string;
}> = ({ className, companyName, companyLocation, companyDescription }) => (
  <>
    <div
      className={clsx(
        "flex flex-col gap-1 max-w-full justify-between",
        className
      )}
    >
      <div className="text-xl sm:text-2xl font-semibold">{companyName}</div>
      <div className="flex gap-1 items-center">
        {companyLocation.length > 0 && <MapPinIcon className="size-4" />}
        {companyLocation}
      </div>
      {companyDescription && (
        <div className="hidden sm:block text-white/70">
          {companyDescription}
        </div>
      )}
    </div>
    {companyDescription && (
      <div className="block sm:hidden text-white/70">{companyDescription}</div>
    )}
  </>
);
