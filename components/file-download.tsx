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

export function FileDownload({ file }: { file: FileAsset }) {
  return (
    <Button variant="outline" asChild className="not-prose my-1">
      <Link
        href={`/filer/${file.assetId}/${file.originalFilename}`}
        className="h-auto w-full"
        title={`Last ned ${file.originalFilename}`}
      >
        <div className="grid grid-cols-[44px_auto] w-full">
          <span className="row-span-2 content-center">
            <FileDownIcon size={36} />
          </span>
          <span className="truncate">{file.originalFilename}</span>
          <small className="truncate font-normal flex">
            <span className="truncate">{file.mimeType}</span>
            <span>, {byteValueNumberFormatter.format(file.size)}</span>
          </small>
        </div>
      </Link>
    </Button>
  );
}
