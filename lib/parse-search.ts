export function parseSearch(
  searchParams: URLSearchParams,
  counties: { slug: string; _id: string }[],
  topics: { slug: string; _id: string }[],
): {
  docTypes: string[] | null;
  q: string | null;
  refs: string[] | null;
  years: string[] | null;
} {
  const refs = [
    ...searchParams
      .getAll("tema")
      .map((slug) => topics.find((item) => item.slug === slug)?._id),
    ...searchParams
      .getAll("fylke")
      .map((slug) => counties.find((item) => item.slug === slug)?._id),
  ].filter(Boolean) as string[];

  return {
    docTypes: searchParams.has("type") ? searchParams.getAll("type") : null,
    q: searchParams.get("q") ?? null,
    refs: refs.length ? refs : null,
    years: searchParams.has("tid") ? searchParams.getAll("tid") : null,
  };
}
