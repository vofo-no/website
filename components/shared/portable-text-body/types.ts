import { PortableTextTypeComponent } from "next-sanity";
import { Reference } from "sanity";

interface DocumentLinkDef extends Reference {
  _type: "documentLink";
}

interface EventReferenceDef extends Reference {
  _type: "eventReference";
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
export type EventReferenceType = PortableTextTypeComponent<EventReferenceDef>;
export type PeopleListType = PortableTextTypeComponent<PeopleDef>;
export type SdgRefType = PortableTextTypeComponent<SdgRefDef>;
