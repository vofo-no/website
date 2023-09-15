import { publicationDocTypes } from "lib/publicationDocTypes";

const knownTypes = [
  { title: "Artikkel", value: "article" },
  { title: "Arrangement", value: "event" },
  ...publicationDocTypes,
];

export default function docTypeDisplay(raw: string) {
  return knownTypes.find((item) => item.value === raw)?.title || raw;
}
