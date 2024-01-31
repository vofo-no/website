import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { resolveHref } from "@/lib/resolveHref";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "opacity-90 hover:opacity-100 hover:underline inline-flex items-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        county: "text-teal-600",
        topic: "text-primary",
      },
      size: {
        default: "text-xs gap-1",
        lg: "text-2xl font-semibold gap-2",
      },
    },
    defaultVariants: {
      variant: "topic",
      size: "default",
    },
  },
);

export interface TagLinkProps extends VariantProps<typeof buttonVariants> {
  data: {
    _type: string;
    slug: string;
    title: string;
  };
}

export function TagLinkLayout({
  data: { _type, slug, title },
  variant,
  size,
}: TagLinkProps) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: variant ?? (_type as TagLinkProps["variant"]),
          size,
        }),
      )}
      href={resolveHref(_type, slug)!}
    >
      <svg viewBox="0 0 100 100" className="h-[0.8em]">
        <circle cx="50" cy="53" r="44" fill="currentColor" />
      </svg>
      {title}
    </Link>
  );
}
