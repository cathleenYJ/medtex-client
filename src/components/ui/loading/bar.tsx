"use client";

import { clsx } from "clsx";

export const LoadingBar: React.FC<{
  color?: string;
  size?: number;
  duration?: number;
}> = ({ color = "bg-black/40", size = 0.3, duration = 0.6 }) => {
  return (
    <div
      className="flex items-center"
      style={
        {
          gap: `${size}rem`,
          "--duration": `${duration}s`,
          "--w": `${size}rem`,
          "--h": `${size * 7}rem`,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            color,
            "rounded-full animate-loading w-(--w) h-(--h)"
          )}
          style={{ animationDelay: `${duration * i * 0.1}s` }}
        />
      ))}
    </div>
  );
};
