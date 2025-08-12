"use client";

import { useEffect, useRef, useState } from "react";

export const useRem = (rem: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [px, setPx] = useState<number>(0);
  useEffect(() => {
    ref.current && setPx(ref.current.offsetWidth);
  }, [ref.current]);
  return {
    px,
    elem: (
      <div
        ref={ref}
        style={{ width: `${rem}rem` }}
        className="h-0 fixed opacity-0"
      />
    ),
  };
};
