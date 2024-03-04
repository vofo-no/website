export const postTypes: {
  title: string;
  value: string;
}[] = [
  { title: "Nyhet", value: "nyhet" },
  { title: "Pressemelding", value: "pm" },
  { title: "Læringshistorie", value: "historie" },
  { title: "Protokoll", value: "protokoll" },
  { title: "Rapport", value: "rapport" },
  { title: "Høringssvar", value: "høringssvar" },
  { title: "Veileder", value: "veileder" },
] as const;
