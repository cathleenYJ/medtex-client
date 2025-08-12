"use client";

import { useState } from "react";
import clsx from "clsx";

export type TabItem = {
  key: string;
  label: string;
  content: React.ReactNode;
};

interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  onChange,
  className,
}) => {
  const [activeKey, setActiveKey] = useState(
    defaultActiveKey || items[0]?.key || ""
  );

  const handleTabClick = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  const activeContent = items.find((item) => item.key === activeKey)?.content;

  return (
    <div className={clsx("w-full", className)}>
      {/* Tab Headers */}
      <div className="flex sm:flex-row flex-row sm:w-auto w-full sm:gap-0 gap-0">
        {items.map((item) => {
          const isSelected = item.key === activeKey;
          return (
            <button
              key={item.key}
              onClick={() => handleTabClick(item.key)}
              className={clsx(
                "flex flex-col items-center sm:px-2 px-0 py-1 pb-1.5 cursor-pointer transition-colors sm:flex-none flex-1",
                isSelected
                  ? "border-b-2 border-medtex-blue text-medtex-blue"
                  : "border-b-2 border-transparent text-medtex-blue-lv4 hover:text-gray-800"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">{activeContent}</div>
    </div>
  );
};
