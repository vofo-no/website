import { Reference } from "sanity";

import Organization from "./Organization";

export interface OrganizationsProps {
  members: Reference[];
  showContactInfo?: boolean;
}

export default function Organizations({
  members,
  showContactInfo,
}: OrganizationsProps) {
  return (
    <div className="grid grid-cols-1 divide-y my-5">
      {members.map(({ _ref }) => (
        <Organization key={_ref} id={_ref} showContactInfo={showContactInfo} />
      ))}
    </div>
  );
}
