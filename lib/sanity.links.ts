export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case "home":
      return "/";
    case "article":
      return slug ? `/aktuelt/${slug}` : undefined;
    case "county":
      return slug ? `/fylker/${slug}` : undefined;
    case "page":
      return slug ? `/${slug}` : undefined;
    case "project":
      return slug ? `/prosjekter/${slug}` : undefined;
    case "publication":
      return slug ? `/dokumenter/${slug}` : undefined;
    case "topic":
      return slug ? `/tema/${slug}` : undefined;
    case undefined:
      return slug;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}
