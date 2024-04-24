import Link from "next/link";
import { FileDownIcon } from "lucide-react";
import { FileAsset } from "sanity";

import { Button } from "@/components/ui/button";

const byteValueNumberFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

export function FileDownload({ file }: { file?: FileAsset }) {
  if (!file) return null;

  return (
    <p>
      <Button variant="outline" asChild className="not-prose">
        <Link
          href={file.url}
          className="grid grid-cols-[46px_auto] h-auto"
          title={`Last ned ${file.originalFilename}`}
        >
          <span className="row-span-2">
            <FileDownIcon size={36} />
          </span>
          <span className="truncate">{file.originalFilename}</span>
          <small className="font-normal">
            {file.mimeType}, {byteValueNumberFormatter.format(file.size)}
          </small>
        </Link>
      </Button>
    </p>
  );
}
