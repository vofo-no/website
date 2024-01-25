import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { PersonPayload } from "@/types";
import { MailIcon, PhoneIcon, SmileIcon } from "lucide-react";

import { formatPhone } from "@/lib/formatPhone";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface PersonLayoutProps {
  data: PersonPayload;
  hideContactInfo?: boolean;
}

export function PersonLayout(props: PersonLayoutProps) {
  const { name, image, position, phone, email } = props.data ?? {};

  const imageUrl = image && urlForImage(image)?.size(256, 256).url();

  return (
    <div className={"flex gap-4 my-4"}>
      <Avatar className="h-24 w-24 not-prose">
        {imageUrl && <AvatarImage src={imageUrl} />}
        <AvatarFallback>
          <SmileIcon />
        </AvatarFallback>
      </Avatar>
      <div
        className={cn("flex flex-col self-center", {
          "animate-pulse": !props.data,
        })}
      >
        <div className="text-lg font-medium leading-tight">
          {name ?? (
            <span className="w-36 inline-block bg-muted h-4 rounded-md "></span>
          )}
        </div>
        <div className="text-muted-foreground text-base leading-normal line-clamp-1">
          {position}
        </div>
        {!props.hideContactInfo && (
          <div className="flex justify-start flex-wrap gap-x-2 gap-y-1 mt-1 text-base">
            {email && (
              <Link
                href={`mailto:${email}`}
                className="text-blue-700 hover:underline flex items-center gap-1"
              >
                <MailIcon size={14} /> {email}
              </Link>
            )}
            {phone && (
              <Link
                href={`tel:${phone}`}
                className="text-blue-700 hover:underline flex items-center gap-1"
              >
                <PhoneIcon size={14} /> {formatPhone(phone)}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
