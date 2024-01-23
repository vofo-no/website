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
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      {props.emoji && (
        <>
          {props.emoji}
          <Separator className="mx-2 h-4" orientation="vertical" />
        </>
      )}
      {props.title}
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  );
}
