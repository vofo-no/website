import organizations from "@/data/names.json";

export default function getOrganizationName(
  sf: number,
  org: number | null,
  year: number,
): string {
  const nameSet = organizations[String(sf) as keyof typeof organizations];
  const yearSet = Object.keys(nameSet).filter(
    (nameSetYear) => Number(nameSetYear) <= year,
  );

  const names: Record<string, { name: string }> = yearSet.reduce(
    (oldNames, key) => ({
      ...oldNames,
      ...nameSet[key as keyof typeof nameSet],
    }),
    {},
  );

  return names[String(org ?? 0)]?.name || "(ukjent organisasjon)";
}
