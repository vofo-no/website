const dateFormatDefaults: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

function getDateFormat(locale?: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale || "nb-NO", {
    ...dateFormatDefaults,
    ...options,
  });
}

function getRelativeTimeFormat(locale?: string) {
  return new Intl.RelativeTimeFormat(locale || "nb-NO", {
    numeric: "auto",
    style: "long",
  });
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

export function formatRelativeDate(dateStr: string, locale?: string) {
  const now = new Date();
  const date = new Date(dateStr);

  const daysSinceDate =
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceDate > -7) {
    return getRelativeTimeFormat(locale).format(
      Math.ceil(daysSinceDate),
      "day",
    );
  } else {
    return getDateFormat(locale, { month: "long" }).format(date);
  }
}

export function formatShortDate(dateStr: string, locale?: string) {
  const currentYear = new Date().getFullYear();
  const date = new Date(dateStr);

  return Intl.DateTimeFormat(locale || "nb-NO", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === currentYear ? undefined : "2-digit",
  }).format(date);
}
