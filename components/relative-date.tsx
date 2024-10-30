"use client";

import { formatRelativeDate } from "@/lib/date";

function localizedPrefixes(locale?: string): Record<string, string> {
  if (locale === "en-US")
    return {
      Publisert: "Published",
      Oppdatert: "Updated",
    };

  return {};
}

export function RelativeDate({
  value,
  locale,
  prefix,
}: {
  value?: string;
  locale?: string;
  prefix?: string;
}) {
  if (!value) return null;

  const localizedPrefix =
    (prefix && localizedPrefixes(locale)[prefix]) || prefix;

  return (
    <time dateTime={value}>
      {[localizedPrefix, formatRelativeDate(value, locale)]
        .filter(Boolean)
        .join(" ")}
      .
    </time>
  );
}
