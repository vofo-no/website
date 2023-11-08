"use client";

import { Disclosure } from "@headlessui/react";
import { CubeIcon } from "@heroicons/react/24/solid";
import { INamed } from "types/kursinfo";

interface Props {
  members: INamed[];
}

export default function MemberOrganizations({ members }: Props) {
  if (!members.length) return null;

  const title =
    members.length === 1
      ? "Én medlemsorganisasjon"
      : `${members.length} medlemsorganisasjoner`;

  return (
    <Disclosure as="div">
      <Disclosure.Button className="underline text-blue-800 hover:text-crimson-500 font-medium inline-flex gap-1 items-center">
        <CubeIcon className="h-4" />
        {title}
      </Disclosure.Button>
      <Disclosure.Panel>
        <ol>
          {members
            .map((org) => org.name)
            .sort()
            .map((name) => (
              <li key={name}>{name}</li>
            ))}
        </ol>
      </Disclosure.Panel>
    </Disclosure>
  );
}
