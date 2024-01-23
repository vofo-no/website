"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

const vofoRegex = /\b(vofo)\b/g;

function displayPathName(raw: string) {
  const str = raw.charAt(0).toUpperCase() + raw.slice(1);
  return str.replace("-", " ").replace(vofoRegex, "Vofo");
}

function Sep() {
  return <ChevronRightIcon size={14} className="text-muted-foreground/30" />;
}

export function Breadcrumbs() {
  const segments = useSelectedLayoutSegments().slice(0, -1);

  if (!segments.length) return null;

  return (
    <div className="container relative mt-2 text-sm">
      <ol className="flex flex-wrap gap-1">
        {segments.map((link, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          return (
            <li key={href} className="flex items-center gap-2">
              <Link
                href={href}
                className="hover:underline hover:text-primary text-muted-foreground/80"
              >
                {displayPathName(link)}
              </Link>
              <Sep />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
