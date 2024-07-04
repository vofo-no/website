import dataIndex from "@/data/index-v2.json";

const years = [...new Set(dataIndex.map((item) => item.year))]
  .sort((a, b) => b - a)
  .map(String);

export interface StatistikkParams {
  sf: string;
  fylke: string;
  aar: string;
}

export const defaultStatistikkParams: StatistikkParams = {
  sf: "alle",
  fylke: "nasjonal",
  aar: years[0],
};

const slugs = [
  ...new Map(
    dataIndex
      .filter(
        (item) =>
          !(
            item.fylke === defaultStatistikkParams.fylke &&
            item.sf === defaultStatistikkParams.sf
          ),
      )
      .map((item) => [
        item.name ?? "?",
        {
          fylke: item.fylke,
          name: item.name ?? "",
          sf: item.sf,
        },
      ]),
  ).values(),
].sort((a, b) => a.name.localeCompare(b.name));

const sfs = slugs
  .filter((item) => item.fylke === defaultStatistikkParams.fylke)
  .map((item) => ({ slug: item.sf, name: item.name }));

const fylker = slugs
  .filter((item) => item.sf === defaultStatistikkParams.sf)
  .map((item) => ({ slug: item.fylke, name: item.name }));

export const statistikkOptions = {
  sfs,
  fylker,
  years,
};

export function parseSlugs(slug: string[] = []): StatistikkParams {
  return {
    sf: slug[0] ?? defaultStatistikkParams.sf,
    fylke: slug[1] ?? defaultStatistikkParams.fylke,
    aar: slug[2] ?? defaultStatistikkParams.aar,
  };
}

export function resolveStatisticUrl(changeSet: Partial<StatistikkParams>) {
  const nextParams = {
    ...defaultStatistikkParams,
    ...changeSet,
  };

  const nextPath = [
    "",
    "statistikk",
    nextParams.sf,
    nextParams.fylke,
    nextParams.aar,
  ];

  if (nextParams.aar !== defaultStatistikkParams.aar) {
    return nextPath.join("/");
  } else if (nextParams.fylke !== defaultStatistikkParams.fylke) {
    return nextPath.slice(0, -1).join("/");
  } else if (nextParams.sf !== defaultStatistikkParams.sf) {
    return nextPath.slice(0, -2).join("/");
  } else {
    return nextPath.slice(0, -3).join("/");
  }
}
