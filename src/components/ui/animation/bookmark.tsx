import clsx from "clsx";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";

export const Bookmark: React.FC<{
  className?: string;
  toggle: boolean;
}> = ({ className, toggle }) => {
  return (
    <div className={clsx("relative", className)}>
      <BookmarkIconOutline className="absolute inset-0" />
      <BookmarkIconSolid
        className={clsx(
          "absolute inset-0 transition-opacity",
          !toggle && "opacity-0"
        )}
      />
    </div>
  );
};
