"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { ColsProps, SortTable } from "./sort-table";

type TableProps<T> = {
  className?: string;
  children?: React.ReactNode;
  cols?: T;
  data?: Record<keyof T, React.ReactNode>[];
};

export const Table = <T extends ColsProps>({
  className,
  children,
  cols,
  data,
}: TableProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const isEnd = el.scrollLeft === el.scrollWidth - el.clientWidth;
      const isStart = el.scrollLeft === 0;
      if (e.deltaY > 0 && isEnd) return;
      if (e.deltaY < 0 && isStart) return;
      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ref.current]);
  return (
    <div
      ref={ref}
      className={clsx(
        "w-full overflow-x-auto overscroll-behavior relative",
        "before:content-[''] before:block before:absolute before:left-0 before:top-0 before:w-10 before:h-full",
        className
      )}
    >
      <table className="table-auto border-separate border-spacing-0 border-spacing-y-1 text-sm">
        {data && cols ? <SortTable cols={cols} data={data} /> : children}
      </table>
    </div>
  );
};
export * from "./sort-table";
export * from "./basic";
