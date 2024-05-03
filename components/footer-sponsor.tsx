import Image from "next/image";

import PoweredByVercel from "./powered-by-vercel.svg";

export function FooterSponsor() {
  return (
    <div className="flex flex-wrap justify-center items-center pt-8 gap-x-12 gap-y-4 text-sm">
      <a
        href="https://vercel.com/?utm_source=vofo-kursinfo&utm_campaign=oss"
        target="_blank"
      >
        <Image
          src={PoweredByVercel}
          alt="Powered by Vercel"
          className="max-w-full"
        />
      </a>
      <span>
        Structured content <br />
        powered by{" "}
        <a
          href="https://sanity.io"
          className="font-semibold text-foreground/80 underline hover:text-foreground"
        >
          Sanity.io
        </a>
      </span>
    </div>
  );
}
