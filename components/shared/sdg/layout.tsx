import Image from "next/image";
import Link from "next/link";
import { imageBuilder } from "@/sanity/lib/image";
import { SdgPayload } from "@/types";

interface SdgLayoutProps {
  data: SdgPayload;
}

export function SdgLayout({ data }: SdgLayoutProps) {
  return (
    <div className="flex items-start space-x-4 not-prose my-5">
      <Link href={data.url!}>
        <Image
          src={imageBuilder.image(data.symbol).url()}
          alt={data.name}
          title={`Mål ${data.number}: ${data.name}`}
          width={64}
          height={64}
          className="mt-0.5"
        />
      </Link>
      <div className="flex-1 space-y-1">
        <p className="text-base font-semibold leading-tight">
          Mål {data.number}: {data.name}
        </p>
        <p className="text-sm text-muted-foreground">{data.description}</p>
      </div>
    </div>
  );
}
