import { ComponentProps } from "react";

import { Cta } from "@/components/cta";

export const InlineCta = ({ value }: { value: ComponentProps<typeof Cta> }) => {
  return <Cta {...value} />;
};
