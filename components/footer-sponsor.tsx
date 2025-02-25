import Image from "next/image";

import Miljofyrtarn from "./miljofyrtarn-sertifisert-virksomhet-horisontal-RGB.svg";

export function FooterSponsor() {
  return (
    <div className="flex flex-wrap justify-center items-center pt-8 gap-x-12 gap-y-4 text-sm">
      <a
        href="/tema/baerekraft"
        title="Vofo er Miljøfyrtårn-sertifisert. Det betyr at vi tar bærekraft på alvor og har oppfylt strenge miljøkrav."
      >
        <Image
          src={Miljofyrtarn}
          alt="Miljøfyrtårn-sertifisert virksomhet"
          className="max-w-full"
          height={65}
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
