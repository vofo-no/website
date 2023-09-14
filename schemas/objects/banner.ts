import { defineField, defineType } from "sanity";

export default defineType({
  name: "banner",
  title: "Banner",
  type: "object",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Overskrift",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "string",
      name: "description",
      title: "Tekst på knappen (oppfordring)",
    }),
    defineField({
      type: "url",
      name: "url",
      title: "Lenke",
    }),
    defineField({
      type: "string",
      name: "colorScheme",
      title: "Profilfarge",
      initialValue: "crimson",
      options: {
        list: [
          { title: "Inkludering (burgunder)", value: "crimson" },
          { title: "Læring (rød)", value: "red" },
          { title: "Mestring (grønn)", value: "green" },
          { title: "Kunnskap (blå)", value: "blue" },
          { title: "Levende lokalsamfunn (turkis)", value: "teal" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternativ tekst",
          description: "Kort beskrivelse av bildet for brukere som ikke kan se",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      description: "description",
      image: "image",
      title: "title",
    },
    prepare({ description, image, title }) {
      return {
        media: image,
        subtitle: description,
        title,
      };
    },
  },
});
