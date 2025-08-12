import { useMemo } from "react";
import type { DialogProfile, ResponseData } from "@/types";

const labels = {
  user_name: "Full Name",
  job_title: "Job Title",
  timezone: "Timezone",
};

export const Contact: React.FC<{ data: ResponseData<DialogProfile> }> = ({
  data,
}) => {
  const dataMap = useMemo(() => new Map(Object.entries(data)), [data]);

  return (
    <>
      <div className="w-20 shrink-0 hidden sm:block"></div>
      <div>
        <div className="text-b2b-lv2/80 font-bold text-base">
          Contact Person
        </div>
        <div>
          {Object.entries(labels).map(([key, label]) => {
            let value = dataMap.get(key);
            if (!value) return null;
            value = typeof value === "object" ? "" : value;
            return (
              <div className="flex gap-3.5" key={key}>
                <div className="w-45 shrink-0 text-white/60">{label}</div>
                <div className="grow">{value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
