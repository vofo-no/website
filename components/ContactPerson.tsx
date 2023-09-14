import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import { Person } from "types";

import ContactButton from "./ContactButton";

export default function ContactPerson({
  image,
  name,
  title,
  email,
  phone,
}: Pick<Person, "image" | "email" | "name" | "phone" | "title">) {
  const imageUrl = image && urlForImage(image)?.size(256, 256).url();
  const blurImageUrl =
    image && urlForImage(image)?.size(16, 16).quality(30).blur(50).url();

  return (
    <div className="flex gap-4 items-start not-prose">
      {imageUrl && (
        <figure className="mb-2">
          <Image
            src={imageUrl}
            alt={image.alt || ""}
            width={128}
            height={128}
            title={image.credit}
            className="rounded-full"
            placeholder="blur"
            blurDataURL={blurImageUrl}
          />
        </figure>
      )}
      <div className="flex flex-col gap-1 self-center text-sm pb-4">
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
