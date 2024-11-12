export function parseSearch(
  searchParams: URLSearchParams,
  filters: { slug: string; _id: string }[],
): {
  docTypes: string[] | null;
  q: string | null;
  refs: string[] | null;
  years: string[] | null;
} {
  const refs = searchParams
    .getAll("filter")
    .map((slug) => filters.find((item) => item.slug === slug)?._id)
    .filter(Boolean) as string[];

  return {
    docTypes: searchParams.has("type") ? searchParams.getAll("type") : null,
    q: searchParams.get("q") ?? null,
    refs: refs.length ? refs : null,
    years: searchParams.has("tid") ? searchParams.getAll("tid") : null,
  };
}
