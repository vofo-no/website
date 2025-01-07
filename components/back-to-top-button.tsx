"use client";

import Link from "next/link";
import { ArrowUpCircleIcon } from "lucide-react";

import useScrollPosition from "@/lib/useScrollPosition";
import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  locale?: string;
}

export function BackToTopButton({ label, locale }: Props) {
  const scrollPosition = useScrollPosition();

  return (
    <div>
      <Link
        href="#topp"
        className={cn(
          "motion-safe:transition-opacity motion-safe:duration-700 focus-visible:not-sr-only focus-visible:opacity-100",
          "inline-flex gap-1 items-center text-muted-foreground/80 hover:text-foreground hover:underline",
          scrollPosition > 300 ? "opacity-100" : "opacity-0 sr-only",
        )}
      >
        <ArrowUpCircleIcon className="h-6" />
        {label || (locale === "en-US" ? "Back to top" : "Tilbake til toppen")}
      </Link>
    </div>
  );
}
