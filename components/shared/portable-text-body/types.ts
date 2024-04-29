import { PortableTextTypeComponent } from "next-sanity";
import { Reference } from "sanity";

interface DocumentLinkDef extends Reference {
  _type: "documentLink";
}

interface PeopleDef {
  _type: "people";
  members: { person: Reference }[];
}

export type DocumentLinkType = PortableTextTypeComponent<DocumentLinkDef>;
export type PeopleListType = PortableTextTypeComponent<PeopleDef>;
