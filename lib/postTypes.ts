export const postTypeValues = [
  "nyhet",
  "pm",
  "historie",
  "protokoll",
  "rapport",
  "høringssvar",
  "veileder",
] as const;
export type postTypeValue = (typeof postTypeValues)[number];

export const postTypes: {
  title: string;
  value: postTypeValue;
}[] = [
  { title: "Nyhet", value: "nyhet" },
  { title: "Pressemelding", value: "pm" },
  { title: "Læringshistorie", value: "historie" },
  { title: "Protokoll", value: "protokoll" },
  { title: "Rapport", value: "rapport" },
  { title: "Høringssvar", value: "høringssvar" },
  { title: "Veileder", value: "veileder" },
] as const;
