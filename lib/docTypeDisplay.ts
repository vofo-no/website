import { publicationDocTypes } from "lib/publicationDocTypes";

export const newsDocTypes = [
  { title: "Nyhetssak", value: "article" },
  ...publicationDocTypes,
];

export default function docTypeDisplay(raw: string) {
  return newsDocTypes.find((item) => item.value === raw)?.title || raw;
}
