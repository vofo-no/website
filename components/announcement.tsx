import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";

interface AnnouncementProps {
  emoji: string | null;
  title: string | null;
  href: string | null;
}

// "‼️" is U+203C followed by the emoji variation selector U+FE0F.
// Strip the selector so both "‼" and "‼️" count as urgent.
function isUrgent(emoji: string | null) {
  return emoji?.replace(/\uFE0F/g, "").trim() === "\u203C";
}

export function Announcement(props: AnnouncementProps) {
  if (isUrgent(props.emoji)) {
    return (
      <div role="alert" className="w-full">
        <Link
          href={props.href || ""}
          className="group flex w-full items-center gap-3 rounded-xl bg-destructive px-5 py-4 text-destructive-foreground shadow-lg shadow-destructive/30 ring-2 ring-destructive/40 ring-offset-2 ring-offset-background transition-all hover:bg-destructive/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4"
        >
          <span
            aria-hidden="true"
            className="text-3xl leading-none motion-safe:animate-pulse"
          >
            {props.emoji}
          </span>
          <Separator
            className="h-8 bg-destructive-foreground/40"
            orientation="vertical"
          />
          <span className="flex-1 text-balance text-base font-bold sm:text-lg group-hover:underline">
            {props.title}
          </span>
          <ArrowRightIcon className="h-5 w-5 shrink-0 transition-transform motion-safe:group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={props.href || ""}
      className="inline-flex items-center rounded-lg bg-muted px-3 py-2 text-sm font-medium transition-all hover:bg-primary-foreground group"
    >
      {props.emoji && (
        <>
          {props.emoji}
          <Separator className="mx-2 h-4" orientation="vertical" />
        </>
      )}
      <span className="group-hover:text-primary group-hover:underline text-balance">
        {props.title}
      </span>
      <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:text-primary" />
    </Link>
  );
}
