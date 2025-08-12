"use client";

import { useEffect, useRef } from "react";
import { LoadingBlock } from "@dashboard/loading-block";

export const ECPaySubmit: React.FC<{ formHtml: string }> = ({ formHtml }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const form = containerRef.current?.querySelector("form");
    if (!formHtml || !form) return;
    form.submit();
  }, [formHtml, containerRef]);

  return (
    <div>
      <LoadingBlock />
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: JSON.parse(formHtml || "") }}
      />
    </div>
  );
};
