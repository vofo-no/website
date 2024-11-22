import { Sdg } from "@/components/shared/sdg";

import { SdgRefType } from "./types";

export const BodySdgRef: SdgRefType = (props) => {
  return props.value.sdg ? <Sdg id={props.value.sdg._ref} /> : null;
};
