import { defineField } from "sanity";

import imageField from "./imageField";

export default defineField({
  ...imageField,
  fields: [
    ...imageField.fields!,
    defineField({
      title: "Posisjon",
      name: "position",
      type: "string",
      options: {
        list: [{ value: "floatRight", title: "Flyt til høyre" }],
      },
    }),
  ],
});
