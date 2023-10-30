import {
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import formatPhoneNumber from "lib/formatPhoneNumber";
import Link from "next/link";

interface ContactButtonProps {
  protocol: "mailto" | "tel" | "url";
  value: string;
}

const protocolIcon: Record<ContactButtonProps["protocol"], typeof PhoneIcon> = {
  mailto: EnvelopeIcon,
  tel: PhoneIcon,
  url: GlobeAltIcon,
};

function FormatValue({ protocol, value }: ContactButtonProps) {
  switch (protocol) {
    case "tel":
      return formatPhoneNumber(value);
    case "url":
      return new URL(value).hostname.replace(/^(www\.)/, "");
    default:
      return value;
  }
}

export default function ContactButton({ protocol, value }: ContactButtonProps) {
  const Icon = protocolIcon[protocol];
  const href = protocol === "url" ? value : [protocol, value].join(":");
  return (
    <Link
      href={href}
      className="text-sm inline-flex gap-1 items-center text-blue-700 hover:text-crimson-500 underline font-medium"
    >
      <Icon className="h-4" />
      <FormatValue protocol={protocol} value={value} />
    </Link>
  );
}
