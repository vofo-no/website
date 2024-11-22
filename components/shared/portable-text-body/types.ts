import { PortableTextTypeComponent } from "next-sanity";
import { Reference } from "sanity";

interface DocumentLinkDef extends Reference {
  _type: "documentLink";
}

interface PeopleDef {
  _type: "people";
  members: { person: Reference }[];
}

interface SdgRefDef extends Reference {
  _type: "sdg-ref";
  sdg: Reference;
}

export type DocumentLinkType = PortableTextTypeComponent<DocumentLinkDef>;
export type PeopleListType = PortableTextTypeComponent<PeopleDef>;
export type SdgRefType = PortableTextTypeComponent<SdgRefDef>;
