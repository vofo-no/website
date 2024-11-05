import type { PreviewProps } from "sanity";

import { Cta } from "@/components/cta";

export function CtaPreview(props: PreviewProps) {
  const { title, subtitle } = props;
  return props.renderDefault({
    ...props,
    title: (
      <Cta
        href=""
        label={String(title || "<oppgi tekst!>")}
        subtitle={String(subtitle || "")}
      ></Cta>
    ),
    subtitle: undefined,
  });
}
