import { CalendarIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "eventReference",
  title: "Hendelse",
  icon: CalendarIcon,
  type: "reference",
  to: [{ type: "event" }],
  validation: (rule) => rule.required(),
  options: { disableNew: false },
});
