import formatPhoneNumber from "lib/formatPhoneNumber";
import Link from "next/link";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

interface ContactButtonProps {
  protocol: "mailto" | "tel";
  value: string;
}

export default function ContactButton({ protocol, value }: ContactButtonProps) {
  const Icon = protocol === "mailto" ? MdOutlineEmail : MdOutlinePhone;
  return (
    <Link
      href={[protocol, value].join(":")}
      className="text-sm inline-flex gap-1 items-center text-blue-700 hover:text-crimson-500 underline font-medium"
    >
      <Icon />
      {protocol === "tel" ? formatPhoneNumber(value) : value}
    </Link>
  );
}
