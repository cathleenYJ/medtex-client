import { useEffect, useMemo, useState } from "react";
import { formatDate, formatTime } from "@/utils/format-schedule";
import { numToStr } from "@/utils/num-to-str";
import type { SelectItem } from "@/types";

export const useCalendarData = (start: Date) => {
  const { date, startTime, endTime } = useMemo(() => {
    const date = formatDate(start);
    const startTime = formatTime(start);
    const endTime = formatTime(new Date(start.getTime() + 60 * 60 * 1000));
    return { date, startTime, endTime };
  }, [start]);
  const slots = useMemo(
    () => getTimeSlots(start).map((time) => formatTime(time)),
    [start]
  );
  const [endSlots, setEndSlots] = useState<SelectItem[]>([]);

  const updateEndSlots = (start: Date) => {
    const newEndSlots: { id: string; name: string }[] = Array.from(
      { length: 2 },
      (_, i) => {
        const endTime = formatTime(
          new Date(start.getTime() + (i + 1) * 60 * 30 * 1000)
        );
        return { id: `end-${endTime}`, name: endTime };
      }
    );
    setEndSlots(newEndSlots);
    return newEndSlots.at(-1);
  };

  useEffect(() => {
    updateEndSlots(start);
  }, [start]);

  return { date, startTime, endTime, slots, endSlots, updateEndSlots };
};

const getTimeSlots = (date: Date) => {
  const dateString = formatDate(date);
  return Array.from({ length: 17 - 9 }).reduce((acc: Date[], _, i) => {
    return [
      ...acc,
      new Date(`${dateString}T${numToStr(9 + i)}:${numToStr(0)}:00+08:00`),
      new Date(`${dateString}T${numToStr(9 + i)}:${numToStr(30)}:00+08:00`),
    ];
  }, []);
};
