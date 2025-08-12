import React from "react";

export const StepInfo: React.FC<{
  status?: React.ReactNode;
  title: string;
  nextPage?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ status, title, nextPage, children }) => (
  <div className="flex flex-col gap-5 text-black">
    <div className="flex flex-col gap-2.5">
      {status && <div className="text-3xl text-black">{status}</div>}
      <div className="text-5xl font-semibold">{title}</div>
    </div>
    {nextPage && <div className="text-lg text-black">{nextPage}</div>}
    {children && <div className="text-sm text-black/80">{children}</div>}
  </div>
);
