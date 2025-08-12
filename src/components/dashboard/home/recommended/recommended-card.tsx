"use client";

import clsx from "clsx";
import { Button } from "@ui/button";
import { Card } from "@ui/card";
import type { RecommandedItem } from "@/types";

export const RecommendedCard: React.FC<RecommandedItem> = ({
  name,
  position,
  theme,
  image,
  date,
}) => {
  return (
    <Card
      styles={{ "--product": `url(${image})` } as React.CSSProperties}
      className={clsx(
        "h-90 py-12.5 flex flex-col bg-white/50 shrink-0 basis-64.5 sm:basis-(--1-2-basis-gap-4) md:basis-(--1-4-basis-gap-4) ",
        image &&
          "bg-(image:--product) bg-cover bg-[center_top_100%] bg-no-repeat",
        position === "bottom" && "flex-col-reverse"
      )}
    >
      <div
        data-card-theme={theme}
        className={clsx(
          "flex flex-col gap-4",
          position === "center" ? "basis-full" : "basis-1/2"
        )}
      >
        <div className="text-center px-4 grow flex flex-wrap text-(--card-text)">
          <div
            className="basis-full text-3xl font-semibold"
            dangerouslySetInnerHTML={{
              __html: name ? name.replace(/\n/g, "<br/>") : "",
            }}
          />
          <div className="basis-full text-2xl font-light">{date}</div>
        </div>
        <div>
          <Button className="bg-(--card-btn-bg) text-(--card-btn-text) text-sm block rounded-lg px-4 py-2.5 mx-auto">
            {date ? "Add to your Calender" : "Find out more"}
          </Button>
        </div>
      </div>
      {position !== "center" && <div className="basis-1/2"></div>}
    </Card>
  );
};
