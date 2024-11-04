import Link from "next/link";
import {
  LucideIcon,
  SignpostBigIcon,
  SparklesIcon,
  SpeechIcon,
} from "lucide-react";

import { parseLocale, type localeName } from "@/lib/locale";
import { postTypeValues, type postTypeValue } from "@/lib/postTypes";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";

interface PostTypeBadgeProps {
  className?: string;
  docType?: string;
  locale?: string;
}

function pickAssets(
  docType: postTypeValue,
  locale: localeName,
): [string | undefined, LucideIcon | undefined, string | undefined] {
  switch (docType) {
    case "historie":
      return [
        "Læringshistorie",
        SparklesIcon,
        "text-[#009890] border-[#009890] border-2",
      ];
    case "høringssvar":
      return [
        locale === "nn-NO" ? "Innspel" : "Innspill",
        SpeechIcon,
        "text-[#0078a4] border-[#0078a4] border-2",
      ];
    case "veileder":
      return [
        locale === "nn-NO" ? "Rettleiar" : "Veileder",
        SignpostBigIcon,
        "text-[#ad7402] border-[#ad7402] border-2",
      ];
  }

  return [undefined, undefined, undefined];
}

export default function PostTypeBadge({
  className,
  docType,
  locale,
}: PostTypeBadgeProps) {
  const localeName = parseLocale(locale);

  if (!docType || !postTypeValues.includes(docType as postTypeValue)) return;

  const [name, Icon, style] = pickAssets(docType as postTypeValue, localeName);

  if (!name) return;

  return (
    <Link
      href={`/aktuelt?type=${docType}`}
      className={cn(
        badgeVariants({ variant: "outline" }),
        className,
        style,
        "bg-white/90 flex items-center gap-1",
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {name}
    </Link>
  );
}
