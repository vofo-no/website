import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";

interface AnnouncementProps {
  emoji?: string;
  title: string;
  href: string;
}

export function Announcement(props: AnnouncementProps) {
  return (
    <Link
      href={props.href}
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
