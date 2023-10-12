import { FaceSmileIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import ContactButton from "components/ContactButton";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import { PersonPayload } from "types";

export default function PersonLayout({
  data,
  title,
}: {
  data?: PersonPayload;
  title?: string;
}) {
  const imageUrl = data?.image && urlForImage(data.image)?.size(256, 256).url();

  return (
    <div className="grid gap-4 grid-cols-[5rem_auto] md:grid-cols-[7rem_auto]">
      {imageUrl ? (
        <figure className="not-prose">
          <Image
            src={imageUrl}
            alt={data.image!.alt || ""}
            width={128}
            height={128}
            title={data.image!.credit}
            className="rounded-full aspect-square"
            placeholder="empty"
          />
        </figure>
      ) : (
        <div className="rounded-full bg-gray-100 aspect-square flex justify-center items-center">
          <FaceSmileIcon className="text-gray-300 w-3/4" />
        </div>
      )}
      <div
        className={classNames("flex flex-col self-center", {
          "animate-pulse": !data,
        })}
      >
        <h3 className="!my-0">
          {data ? (
            data.name
          ) : (
            <span className="w-36 inline-block bg-gray-300 h-4 rounded-md "></span>
          )}
        </h3>
        <div className="text-gray-600 text-sm leading-normal font-medium">
          {data ? (
            title || data.title
          ) : (
            <span className="w-24 inline-block bg-gray-300 h-3 rounded-md "></span>
          )}
        </div>
        <div className="flex justify-start flex-wrap gap-x-2 gap-y-1 mt-1">
          {data?.email && (
            <ContactButton protocol="mailto" value={data.email} />
          )}
          {data?.phone && <ContactButton protocol="tel" value={data.phone} />}
        </div>
      </div>
    </div>
  );
}
