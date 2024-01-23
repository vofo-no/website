import { PortableTextBlockComponent, toPlainText } from "@portabletext/react";

import slugify from "@/lib/slugify";

export const H2WithAnchor: PortableTextBlockComponent = ({
  value,
  children,
}) => {
  const anchor = slugify(toPlainText(value));
  return (
    <h2 id={anchor} className="scroll-mt-16 md:scroll-mt-28">
      {children}
    </h2>
  );
};
