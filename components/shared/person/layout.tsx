import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { PersonPayload } from "@/types";
import { MailIcon, PhoneIcon, SmileIcon } from "lucide-react";

import { formatPhone } from "@/lib/formatPhone";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface PersonLayoutProps {
  data?: PersonPayload;
  hideContactInfo?: boolean;
  loading?: boolean;
}

export function PersonLayout(props: PersonLayoutProps) {
  const { name, image, position, phone, email } = props.data ?? {};

  const imageUrl = image && urlForImage(image)?.dpr(2).size(96, 96).url();

  return (
    <div
      className={cn(
        "grid grid-cols-[96px_auto] items-center gap-4 my-4 max-w-full text-base not-prose",
        props.loading && "animate-pulse",
      )}
    >
      <div>
        <Avatar className="h-24 w-24">
          {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
          <AvatarFallback>
            <SmileIcon size={40} className="opacity-50" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div
        className={cn("self-center overflow-hidden", {
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
          <div className="flex justify-start flex-wrap gap-x-2 gap-y-1 mt-1 text-sm">
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
              <Link
                href={`tel:${phone}`}
                className="text-blue-700 hover:underline"
              >
                <PhoneIcon
                  size={14}
                  className="align-middle inline-block mr-1"
                />
                {formatPhone(phone)}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
