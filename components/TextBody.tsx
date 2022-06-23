import { PortableText } from "@portabletext/react";

export default function TextBody({ content }: { content: any }) {
  return (
    <div className="max-w-prose">
      <PortableText value={content} />
    </div>
  );
}
