import { FaceSmileIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import ContactButton from "components/ContactButton";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import { PersonPayload } from "types";

export default function PersonLayout({
  data,
  title,
  className,
  compact = false,
  showContactInfo,
}: {
  data?: PersonPayload;
  title?: string;
  className?: string;
  compact?: boolean;
  showContactInfo?: boolean;
}) {
  const imageUrl = data?.image && urlForImage(data.image)?.size(256, 256).url();

  return (
    <div
      className={classNames(
        className,
        "grid gap-4 py-2",
        compact
          ? "grid-cols-[4rem_auto] md:grid-cols-[5rem_auto]"
          : "grid-cols-[5rem_auto] md:grid-cols-[7rem_auto]"
      )}
    >
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
        <div className="font-roboto text-lg font-medium leading-tight">
          {data ? (
            data.name
          ) : (
            <span className="w-36 inline-block bg-gray-300 h-4 rounded-md "></span>
          )}
        </div>
        <div className="text-gray-500 text-sm leading-normal line-clamp-1">
          {data ? (
            title || data.title
          ) : (
            <span className="w-24 inline-block bg-gray-300 h-3 rounded-md "></span>
          )}
        </div>
        {showContactInfo && (
          <div className="flex justify-start flex-wrap gap-x-2 gap-y-1 mt-1">
            {data?.email && (
              <ContactButton protocol="mailto" value={data.email} />
            )}
            {data?.phone && <ContactButton protocol="tel" value={data.phone} />}
          </div>
        )}
      </div>
    </div>
  );
}
