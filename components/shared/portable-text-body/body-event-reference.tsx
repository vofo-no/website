import { CalendarEvent } from "@/components/shared/calendar-event";

import { EventReferenceType } from "./types";

export const BodyEventReference: EventReferenceType = (props) => {
  return props.value._ref ? <CalendarEvent id={props.value._ref} /> : null;
};
