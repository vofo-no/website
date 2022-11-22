import Link from "next/link";
import { PropsWithChildren } from "react";

interface LinkButtonProps {
  href: string;
}

export default function LinkButton({
  href,
  children,
}: PropsWithChildren<LinkButtonProps>) {
  return (
    <Link
      href={href}
      className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-lg rounded-md font-semibold text-white inline-flex gap-2 items-center"
    >
      {children}
    </Link>
  );
}
