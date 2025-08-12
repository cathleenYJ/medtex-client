"use client";

import clsx from "clsx";
import { forwardRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@ui/button";
import { Bookmark } from "@ui/animation/bookmark";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";

type Props = {
  className?: string;
  children?: React.ReactNode;
  meeting_id: number;
  id?: number;
  isWishlisted?: boolean;
};

const AddToList = forwardRef<HTMLElement, Props>(
  ({ className, children, meeting_id, id, isWishlisted }, ref) => {
    const { data: session } = useSession();
    const [favoriteStatus, setFavorite] = useState<boolean>(
      Boolean(isWishlisted || id)
    );
    const { mutate, isPending } = useMutation({
      mutationKey: ["add-to-list", meeting_id],
      mutationFn: () => {
        if (favoriteStatus && id) {
          return fetchData.admin.delWishlist(id, session);
        } else {
          return fetchData.admin.addWishlist(
            { item_name: "meeting", meeting_id },
            session
          );
        }
      },
      onSuccess: (res) => {
        console.log(res);
        setFavorite((prev) => !prev);
      },
    });

    return (
      session && (
        <Button
          ref={ref}
          loading={isPending}
          className={clsx(
            isPending
              ? "[&_span.children]:text-b2b-lv6/50"
              : "[&_span.children]:text-b2b-lv6"
          )}
          onClick={mutate}
        >
          <Bookmark
            className={clsx(className || "size-6 md:size-8")}
            toggle={favoriteStatus}
          />
          {children && <span className="children">{children}</span>}
        </Button>
      )
    );
  }
);
AddToList.displayName = "AddToList";

export { AddToList };
