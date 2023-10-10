export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case "home":
      return "/";
    case "publication":
      return slug ? `/dokumenter/${slug}` : undefined;
    case "article":
      return slug ? `/aktuelt/${slug}` : undefined;
    case "page":
      return slug ? `/${slug}` : undefined;
    case "project":
      return slug ? `/projects/${slug}` : undefined;
    case "county":
      return slug ? `/fylker/${slug}` : undefined;
    case undefined:
      return slug;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}
