export function resolveHref(
  documentType: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case "home":
      return "/";
    case "post":
      return `/aktuelt/${slug}`;
    case "county":
      return `/fylker/${slug}`;
    case "topic":
      return `/tema/${slug}`;
    case "page":
      return `/${slug}`;
    case "statistic":
      return slug && slug !== "nasjonal"
        ? `/statistikk/${slug}`
        : "/statistikk";
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}
