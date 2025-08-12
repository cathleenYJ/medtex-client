"use client";

import clsx from "clsx";
import { useTransition } from "react";
import { Button } from "@ui/button";

export const BasicAction = <T extends React.ElementType = typeof Button>({
  onClick,
  className,
  children,
  component,
  ...props
}: {
  component?: T;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      {...props}
      component={component || Button}
      loading={isPending}
      onClick={onClick ? () => startTransition(onClick) : undefined}
      className={clsx("px-2 py-1.5 rounded-md text-white", className)}
    >
      {children}
    </Button>
  );
};
