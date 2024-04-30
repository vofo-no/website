"use client";

import { formatRelativeDate } from "@/lib/date";

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
  return (
    <time dateTime={value}>
      {[prefix, formatRelativeDate(value, locale)].filter(Boolean).join(" ")}.
    </time>
  );
}
