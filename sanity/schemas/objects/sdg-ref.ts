import { ColorWheelIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "sdg-ref",
  title: "Bærekraftsmål",
  icon: ColorWheelIcon,
  type: "object",
  fields: [
    defineField({
      name: "sdg",
      title: "Mål",
      type: "reference",
      to: [{ type: "sdg" }],
      options: { disableNew: true },
    }),
  ],
  preview: {
    select: { title: "sdg.name", number: "sdg.number", media: "sdg.symbol" },
    prepare: ({ title, number, media }) => ({
      title,
      subtitle: `Mål ${number || "uten nummer"}`,
      media,
    }),
  },
});
