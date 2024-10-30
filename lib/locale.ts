export type localeName = "nb-NO" | "nn-NO" | "en-US";

export function parseLocale(locale?: string) {
  return Intl.getCanonicalLocales(locale || "nb-NO")[0] as localeName;
}
