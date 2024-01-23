const dateFormat: Record<string, Intl.DateTimeFormat> = {
  "nb-NO": new Intl.DateTimeFormat("nb-NO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  "nn-NO": new Intl.DateTimeFormat("nn-NO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  "en-US": new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
};

function getDateFormat(locale = "nb-NO") {
  return dateFormat[locale] || dateFormat["nb-NO"];
}

export function formatDate({
  date,
  endDate,
  locale,
}: { date?: string; endDate?: string; locale?: string } = {}) {
  if (!date) return;

  const intl = getDateFormat(locale);

  if (!endDate) return intl.format(new Date(date));

  return intl.formatRange(new Date(date), new Date(endDate));
}
