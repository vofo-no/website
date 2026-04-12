import Link from "next/link";
import { PersonByIdQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";
import { MailIcon, PhoneIcon, SmileIcon } from "lucide-react";

import { formatPhone } from "@/lib/formatPhone";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormatLink } from "@/components/FormatLink";

export interface PersonLayoutProps {
  data?: PersonByIdQueryResult;
  hideContactInfo?: boolean;
  showDescription?: boolean;
  loading?: boolean;
}

export function PersonLayout(props: PersonLayoutProps) {
  const { name, image, position, phone, email, description } = props.data ?? {};

  const imageUrl = image && urlForImage(image)?.dpr(2).size(96, 96).url();

  return (
    <div
      className={cn(
        "grid grid-cols-[96px_auto] items-start gap-4 my-4 max-w-full text-base not-prose",
        props.loading && "animate-pulse",
      )}
    >
      <div>
        <Avatar className="h-24 w-24">
          {imageUrl && <AvatarImage src={imageUrl} alt={name || ""} />}
          <AvatarFallback>
            <SmileIcon size={40} className="opacity-50" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div
        className={cn("overflow-hidden pt-2", {
          "animate-pulse": !props.data,
        })}
      >
        <p className="font-medium truncate">
          {name ?? (
            <span className="w-2/3 inline-block bg-muted h-4 rounded-md "></span>
          )}
        </p>
        <p className="text-muted-foreground truncate">{position}</p>
        {!props.hideContactInfo && (
          <div className="flex justify-start flex-wrap gap-x-3 gap-y-1 mt-1 text-md">
            {email && (
              <Link
                href={`mailto:${email}`}
                className="text-blue-700 hover:underline truncate"
              >
                <MailIcon
                  size={14}
                  className="align-middle inline-block mr-1"
                />
                {email}
              </Link>
            )}
            {phone && (
              <FormatLink
                formatHref={(str) => `tel:${str}`}
                formatLabel={(str) => (
                  <>
                    <PhoneIcon
                      size={14}
                      className="align-middle inline-block mr-1"
                    />
                    {formatPhone(str)}
                  </>
                )}
                value={phone}
                className="text-blue-700 hover:underline"
              />
            )}
          </div>
        )}
        {props.showDescription && <p className="my-2">{description}</p>}
      </div>
    </div>
  );
}
