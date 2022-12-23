import Image from "next/image";
import { urlFor } from "../lib/sanity";
import ContactButton from "./ContactButton";

interface ContactPersonProps {
  name: string;
  image?: any;
  title: string;
  email?: string;
  phone?: string;
}

export default function ContactPerson({
  image,
  name,
  title,
  email,
  phone,
}: ContactPersonProps) {
  return (
    <div className="flex gap-2 items-start not-prose">
      {image && (
        <figure className="mb-2">
          <Image
            src={urlFor(image).size(128, 128).url()}
            alt={image.alt || ""}
            width={128}
            height={128}
            title={image.attribution}
            className="rounded-full"
            placeholder="blur"
            blurDataURL={urlFor(image).size(16, 16).quality(30).blur(50).url()}
          />
        </figure>
      )}
      <div className="flex flex-col gap-1 text-sm">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-500 text-base">{title}</p>
        {email && (
          <div>
            <ContactButton protocol="mailto" value={email} />
          </div>
        )}
        {phone && (
          <div>
            <ContactButton protocol="tel" value={phone} />
          </div>
        )}
      </div>
    </div>
  );
}
