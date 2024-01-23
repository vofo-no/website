import { defineArrayMember, defineField } from "sanity";

export default defineField({
  name: "contacts",
  title: "Kontaktpersoner",
  type: "array",
  of: [
    defineArrayMember({
      type: "reference",
      to: { type: "person" },
      options: { disableNew: true },
    }),
  ],
});
