import { PortableTextTypeComponentProps } from "@portabletext/react";
import { Reference } from "sanity";

interface OrganizationsDef {
  _type: "organizations";
  members: Reference[];
  showContactInfo?: boolean;
  showExtendedInfo?: boolean;
}

//export const OrganizationsList: PortableTextTypeComponent<OrganizationsDef>

export default function OrganizationsList(
  props: PortableTextTypeComponentProps<OrganizationsDef> & {
    preview?: boolean;
  }
) {
  return <p>ORGANISATIONS (preview: {props.preview ? "JA" : "NEI"})</p>;
}
