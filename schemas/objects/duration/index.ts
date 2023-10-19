import { defineField } from "sanity";

import { DurationInput } from "./DurationInput";

export default defineField({
  type: "object",
  name: "duration",
  title: "Varighet",
  components: {
    input: DurationInput,
  },
  fields: [
    defineField({
      type: "datetime",
      name: "start",
      title: "Start",
    }),
    defineField({
      type: "datetime",
      name: "end",
      title: "Slutt",
    }),
  ],
});
