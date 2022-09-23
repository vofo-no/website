export default {
  name: "office",
  type: "object",
  title: "Kontor",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Kontornavn",
      description: "Navn på dette kontoret",
    },
    {
      name: "streetAddress",
      type: "string",
      title: "Adresse",
      description:
        "Besøksadressen til kontoret, f.eks. Akersgata 41, 0158 Oslo",
    },
    {
      name: "postalAddress",
      type: "string",
      title: "Postadresse",
      description:
        "Postadressen til kontoret, hvis den avviker fra besøksadressen.",
    },
    {
      name: "contacts",
      title: "Kontaktpersoner",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "employee" },
        },
      ],
    },
  ],
};
