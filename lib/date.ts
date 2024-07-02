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
  });
}

export function formatDate({
  date,
  endDate,
  locale,
  options,
}: {
  date?: string;
  endDate?: string;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
} = {}) {
  if (!date) return;

  const intl = getDateFormat(locale, options);

  if (!endDate) return intl.format(new Date(date));

  return intl.formatRange(new Date(date), new Date(endDate));
}

export function formatRelativeDate(dateStr: string, locale?: string) {
  const date = new Date(dateStr);

  const deltaSeconds = Math.round((date.getTime() - Date.now()) / 1000);

  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, Infinity];
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
  ];
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  if (unitIndex < 5) {
    return getRelativeTimeFormat(locale).format(
      Math.trunc(deltaSeconds / divisor),
      units[unitIndex],
    );
  }

  return getDateFormat(locale, { month: "long" }).format(date);
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
