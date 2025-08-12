import { EventInput } from "@fullcalendar/core/index.js";

export const useAvailableSlots = (events: EventInput[]) => {
  const isSlotAvailable = (slot: { start: string; end: string }) => {
    return events.every((event) => {
      if (!(event.start instanceof Date && event.end instanceof Date))
        return false;
      const eventStart = event.start.getTime();
      const eventEnd = event.end.getTime();
      const slotStart = new Date(slot.start).getTime();
      const slotEnd = new Date(slot.end).getTime();
      return !(
        (slotStart <= eventStart && eventStart < slotEnd) ||
        (slotStart < eventEnd && eventEnd <= slotEnd)
      );
    });
  };

  return { isSlotAvailable };
};
