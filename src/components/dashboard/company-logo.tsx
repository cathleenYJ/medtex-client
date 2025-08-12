import clsx from "clsx";
import Image from "next/image";

export const CompanyLogo: React.FC<{
  className?: string;
  src: string;
  alt?: string;
}> = ({ className, src, alt }) => (
  <div
    className={clsx(
      "flex items-center shrink-0 relative overflow-hidden",
      className
    )}
  >
    <Image
      fill
      className="!relative object-contain"
      src={src}
      alt={alt || "company logo"}
    />
  </div>
);
