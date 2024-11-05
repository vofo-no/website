import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

interface CtaProps {
  label: string;
  href: string;
  target?: "_self" | "_blank";
  subtitle?: string;
}

export function Cta({ label, href, target = "_self", subtitle }: CtaProps) {
  return (
    <p className="flex flex-col items-center gap-1">
      {href ? (
        <span className="not-prose">
          <Link
            href={href}
            target={target}
            className={buttonVariants({ size: "lg" })}
          >
            {label}
          </Link>
        </span>
      ) : (
        <span className={buttonVariants({ size: "lg" })}>{label}</span>
      )}
      {subtitle && (
        <span className="text-muted-foreground text-sm">{subtitle}</span>
      )}
    </p>
  );
}
