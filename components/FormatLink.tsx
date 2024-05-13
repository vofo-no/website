import Link from "next/link";
import { vercelStegaSplit } from "@vercel/stega";

interface FormatLinkProps {
  className?: string;
  value: string;
  formatHref: (value: string) => string;
  formatLabel: (value: string) => React.ReactNode;
}

export function FormatLink(props: FormatLinkProps) {
  const { cleaned, encoded } = vercelStegaSplit(props.value);

  return (
    <Link href={props.formatHref(cleaned)} className={props.className}>
      {props.formatLabel(cleaned)}
      {encoded}
    </Link>
  );
}
