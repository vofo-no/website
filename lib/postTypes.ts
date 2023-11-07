interface postType {
  title: string;
  value: string;
}

export const newsPostTypes: readonly postType[] = [
  { title: "Nyhet", value: "article" },
  { title: "Pressemelding", value: "release" },
] as const;

export const newsPostTypeValues = newsPostTypes.map(({ value }) => value);

export const documentPostTypes: readonly postType[] = [
  { title: "Notat", value: "memo" },
  { title: "Protokoll", value: "protocol" },
  { title: "Rapport", value: "report" },
  { title: "Høringssvar", value: "statement" },
  { title: "Veileder", value: "guide" },
] as const;

export const documentPostTypeValues = documentPostTypes.map(
  ({ value }) => value
);

export function resolveVirtualTypeFromDocType(docType: string = "") {
  return newsPostTypeValues.includes(docType) ? "__artikkel" : "__dokument";
}

const postTypes = [...newsPostTypes, ...documentPostTypes];

export default postTypes;
