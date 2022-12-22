export default {
  name: "image",
  type: "image",
  title: "Bilde",
  group: "content",
  description: "Bilde som kan vises ved presentasjon av dokumentet",
  options: { hotspot: true },
  validation: (Rule) => [Rule.required()],
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternativ tekst",
      description: "Beskrivelse av bildet (for lesere som ikke kan se bildet)",
      hidden: ({ document }) => !document?.image,
    },
    {
      name: "attribution",
      type: "string",
      title: "Attribusjon",
      description:
        'Dersom rettighetshaver krever det, skal attribusjon vises når vi bruker bildet. F.eks. "Foto: Kari Nordmann"',
      hidden: ({ document }) => !document?.image,
    },
    {
      name: "caption",
      type: "string",
      title: "Bildetekst",
      description: "Tekst som kan vises sammen med bildet.",
      hidden: ({ document }) => !document?.image,
    },
  ],
};
