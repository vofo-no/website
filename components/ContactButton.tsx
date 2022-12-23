import Link from "next/link";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

interface ContactButtonProps {
  protocol: "mailto" | "tel";
  value: string;
}

function formatTelValue(value: string) {
  const cleanVal = value.replace(/\s/g, "");

  if (cleanVal.match(/^[489][0-9]{7}$/)) {
    return [
      cleanVal.substring(0, 3),
      cleanVal.substring(3, 5),
      cleanVal.substring(5),
    ].join(" ");
  }

  if (cleanVal.match(/^[123567][0-9]{7}$/)) {
    return cleanVal.match(/.{1,2}/g)?.join(" ");
  }

  return value;
}

export default function ContactButton({ protocol, value }: ContactButtonProps) {
  const Icon = protocol === "mailto" ? MdOutlineEmail : MdOutlinePhone;
  return (
    <Link
      href={[protocol, value].join(":")}
      className="border border-sky-700 hover:bg-sky-200 focus:bg-sky-200 px-2 py-1 text-sm rounded-md text-sky-700 inline-flex gap-2 items-center"
    >
      <Icon />
      {protocol === "tel" ? formatTelValue(value) : value}
    </Link>
  );
}
