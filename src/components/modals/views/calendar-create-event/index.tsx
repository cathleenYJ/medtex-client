"use client";

import clsx from "clsx";
import * as z from "zod/v4";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { Field } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EventInput } from "@fullcalendar/core/index.js";
import { Button } from "@ui/button";
import { Confirm } from "@ui/confirm";
import { Hr } from "@ui/splitter";
import { Container, Title } from "@ui/modal";
import { Fields, Select } from "@ui/form";
import { WarningBlock } from "@ui/warning-block";
import { useModal } from "@modals/context";
import { useCalendarData } from "@/hooks/use-calendar-data";
import { useAvailableSlots } from "@/hooks/use-available-slots";
import type { AppointmentItem, SelectItem } from "@/types";
import { ConfirmSelectTime } from "./confirm-select-time";
import { SelectTimeSlotSchema } from "./state";

export const CalendarCreateEvent: React.FC<{
  start: Date;
  seller: Pick<AppointmentItem, "seller_id" | "seller_company">;
  events: EventInput[];
}> = ({ start, seller, events }) => {
  const { data: session } = useSession();
  const { openModal, closeModal } = useModal();
  const { isSlotAvailable } = useAvailableSlots(events);
  const { date, startTime, endTime, slots, endSlots, updateEndSlots } =
    useCalendarData(start);
  const { control, handleSubmit, watch, setValue } = useForm<
    z.infer<typeof SelectTimeSlotSchema>
  >({
    resolver: zodResolver(SelectTimeSlotSchema),
    mode: "all",
    defaultValues: {
      date: { id: date, name: date },
      start: { id: `start-${startTime}`, name: startTime },
      end: { id: `end-${endTime}`, name: endTime },
    },
  });
  const isConflict = useMemo(() => {
    const start = `${watch("date").name}T${watch("start").name}:00+08:00`;
    const end = `${watch("date").name}T${watch("end").name}:00+08:00`;
    return !isSlotAvailable({ start, end });
  }, [watch, isSlotAvailable]);

  const onSubmit: SubmitHandler<z.infer<typeof SelectTimeSlotSchema>> = async (
    data
  ) => {
    if (!session || isConflict) return;
    const start = `${data.date.name}T${data.start.name}:00+08:00`;
    const end = `${data.date.name}T${data.end.name}:00+08:00`;

    await closeModal();
    openModal(
      <ConfirmSelectTime
        seller={seller}
        data={{
          start,
          end,
          description: "Meeting slot",
          meeting_type: "in_person",
          meeting_location: "TaiNEX1, room 404",
          disabled: 0,
        }}
        session={session}
      />
    );
  };

  return (
    <Container className="bg-white/12 w-150">
      <Title>Select Your Available Time Slot</Title>
      <form
        className="flex flex-col gap-10 text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="text-sm">Timezone: GMT+8</div>
            <Fields className="xs:!flex-nowrap">
              <Field className="flex gap-5 basis-full sm:basis-1/2">
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <Select
                      value={field.value as SelectItem}
                      onChange={field.onChange}
                      items={[
                        { id: "2025-12-03", name: "2025-12-03" },
                        { id: "2025-12-04", name: "2025-12-04" },
                      ]}
                    />
                  )}
                />
              </Field>
              <Field
                className={clsx(
                  isConflict &&
                    "[&_button]:!outline-1 [&_button]:!outline-danger",
                  "flex gap-2 items-center basis-full sm:basis-1/2"
                )}
              >
                <Controller
                  control={control}
                  name="start"
                  render={({ field }) => (
                    <Select
                      value={field.value as SelectItem}
                      onChange={(e) => {
                        const newEnd = updateEndSlots(
                          new Date(
                            `${watch("date").name}T${
                              (e as SelectItem).name
                            }:00+08:00`
                          )
                        );
                        newEnd && setValue("end", newEnd);
                        field.onChange(e);
                      }}
                      items={slots.slice(0, -1).map((slot) => ({
                        id: `start-${slot}`,
                        name: slot,
                      }))}
                    />
                  )}
                />
                <Hr className="border-t-2 !border-white w-3 h-0" />
                <Controller
                  control={control}
                  name="end"
                  render={({ field }) => (
                    <Select
                      value={field.value || endSlots.at(-1)}
                      onChange={field.onChange}
                      items={endSlots}
                    />
                  )}
                />
              </Field>
            </Fields>
          </div>
          <div
            className={clsx(
              "grid transition-[grid-template-rows] duration-400",
              isConflict ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden">
              <WarningBlock className="bg-danger">
                You have a conflicting appointment during this time. Please
                select another available slot.
              </WarningBlock>
            </div>
          </div>
        </div>
        <Confirm>
          <Button disabled={isConflict} variant="modal" type="submit">
            Confirm Selection
          </Button>
        </Confirm>
      </form>
    </Container>
  );
};
// https://originui.com/search?tags=time
