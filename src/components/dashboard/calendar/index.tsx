"use client";

import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, {
  type DateClickArg,
} from "@fullcalendar/interaction";
import type {
  EventClickArg,
  EventInput,
  FormatterInput,
} from "@fullcalendar/core/index.js";
import { useModal } from "@modals/context";
import { CalendarCreateEvent } from "@modals/views";
import type { AuthMeeting } from "@/types";
import { useMeetingRequestSeller } from "@modals/views/calendar-create-event/state";

const handleEventClick = (arg: EventClickArg) => {
  const api = arg.view.calendar;
  console.log(api);
};

const views = {
  timeGridEventDays: {
    buttonText: "Event Period",
    eventClick: handleEventClick,
    type: "timeGrid",
    duration: { days: 2 },
  },
};

const timeFormat: FormatterInput = {
  hour: "2-digit",
  minute: "2-digit",
  meridiem: false,
  hour12: false,
};

export const B2bCalendar: React.FC<{ meetings: AuthMeeting[] }> = ({
  meetings,
}) => {
  const { openModal } = useModal();
  const initialDate = useMemo(() => new Date("2025-12-3"), []);
  const events = useMemo(() => {
    return meetings
      .filter((item) => item.schedule_time)
      .map((item) => ({
        id: String(item.id),
        title: `Meeting with ${item.seller_company}`,
        start: item.schedule_time && new Date(item.schedule_time.start),
        end: item.schedule_time && new Date(item.schedule_time.end),
      })) as EventInput[];
  }, [meetings]);
  const { seller } = useMeetingRequestSeller();

  const handleDateClick = (arg: DateClickArg) => {
    if (!seller) return;
    openModal(
      <CalendarCreateEvent seller={seller} start={arg.date} events={events} />
    );
  };

  return (
    <div className="max-w-7xl mx-auto backdrop-blur-xl bg-b2b-bg/20 border border-b2b-lv2/10">
      <FullCalendar
        allDaySlot={false}
        height="auto"
        initialDate={initialDate}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={Object.keys(views)[0]}
        slotMinTime="09:00:00"
        slotMaxTime="17:00:00"
        views={views}
        headerToolbar={false}
        events={events}
        dateClick={handleDateClick}
        eventTimeFormat={timeFormat}
        slotLabelFormat={timeFormat}
      />
    </div>
  );
};

// events https://fullcalendar.io/docs/event-parsing
// get calendarApi from click event. For example: calendarApi = arg.view.calendar in handleDateClick()
