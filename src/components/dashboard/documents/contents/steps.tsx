import clsx from "clsx";
import { Fragment } from "react";
import { Hr } from "@ui/splitter";

export const Steps: React.FC<{
  steps: { title: string; description: React.ReactNode }[];
}> = ({ steps }) => {
  return (
    <div className="ps-2.5">
      <div
        className={clsx(
          "ps-2.5 border-dashed border-s border-black relative",
          "before:content-[''] before:absolute before:block",
          "before:-left-px before:top-1 before:bg-black before:w-px before:h-5",
          "after:content-[''] after:absolute after:block",
          "after:-left-px after:top-3 after:bg-black after:w-2.5 after:h-px"
        )}
      >
        <div className="ps-2 sm:ps-5 flex flex-col gap-4">
          {steps.map((step, i) => (
            <Fragment key={i}>
              <div className="flex gap-2.5 flex-col sm:flex-row">
                <div className="w-15 shrink-0 font-semibold">Step {i + 1}.</div>
                <div>
                  <div className="font-semibold">{step.title}</div>
                  <div className="text-sm">{step.description}</div>
                </div>
              </div>
              <Hr className="border-t !border-gray-200" />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
