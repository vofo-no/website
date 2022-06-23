import { isUniqueAcrossAllDocuments } from "../../lib/isUniqueAcrossAllDocuments";

export default {
  name: "slug",
  type: "slug",
  title: "Tittel i nettadresse (URL)",
  description:
    "Unikt navn for dokumentet i URL-en. Bør ikke endres når dokumentet er publisert.",
  options: {
    source: "title",
    isUnique: isUniqueAcrossAllDocuments,
  },
  group: "seo",
  validation: (Rule) => [Rule.required()],
};
