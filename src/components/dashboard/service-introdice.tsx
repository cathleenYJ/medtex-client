import clsx from "clsx";
import { Card } from "@ui/card";

// const steps = [
//   "Seller Explore Buyers, and Send a Request",
//   "Buyer Confirms Meeting with Time-slot",
//   "Attend the Meeting with QR Code",
// ];

export const ServiceIntroduce: React.FC = () => {
  return (
    <Card
      className={clsx(
        "h-full border-0 relative overflow-hidden",
        "bg-blend-difference",
        "before:absolute before:inset-0 before:opacity-15 before:bg-(image:--bg-noise)",
        "pt-40 pb-15 px-8"
      )}
      styles={{ backgroundImage: "url(/rectangle.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/*
      <div className="flex flex-col gap-10 text-white relative">
        <div className="flex flex-col text-9xl font-semibold px-8 border-s-2 border-white/40">
          {"How Matchup Works".split(" ").map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={step}
              style={
                {
                  "--number-height": "calc(0.25rem * 9 / 2)",
                } as React.CSSProperties
              }
              className={clsx(
                "flex gap-4 relative py-1.25 items-center",
                i !== 0 &&
                  "before:content-[''] before:absolute before:left-4.25 before:block before:w-0.5 before:bg-white/40",
                i !== 0 &&
                  "before:bottom-[calc(50%+var(--number-height))] before:h-[calc(50%-var(--number-height))]",
                i !== steps.length - 1 &&
                  "after:content-[''] after:absolute after:left-4.25 after:block after:w-0.5 after:bg-white/40",
                i !== steps.length - 1 &&
                  "after:top-[calc(50%+var(--number-height))] after:h-[calc(50%-var(--number-height))]"
              )}
            >
              <div className="size-9 p-1.5 flex items-center justify-center rounded-full border-2 border-white/40 shrink-0">
                {i + 1}
              </div>
              <div>{step}</div>
            </div>
          ))}
          <div className="text-sm text-white/40">
            *You’ll only be charged once the buyer confirms the meeting.
          </div>
        </div>
      </div>
      */}
    </Card>
  );
};
