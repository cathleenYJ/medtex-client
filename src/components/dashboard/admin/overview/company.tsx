"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { apiImageUrl } from "@/utils/api-image-url";

export const Company: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="flex gap-5 items-center">
      <div className="shrink-0">
        <Image
          className="rounded-xl bg-img-bg aspect-square object-contain"
          width={50}
          height={50}
          src={apiImageUrl(session?.user?.orgLogo)}
          alt="company logo"
        />
      </div>
      {session?.user?.orgName && (
        <div className="text-xl font-medium">{session.user.orgName}</div>
      )}
    </div>
  );
};
