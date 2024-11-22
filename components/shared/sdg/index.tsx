import { loadSdg } from "@/sanity/loader/loadQuery";

import { SdgLayout } from "./layout";

export interface SdgProps {
  id: string;
}

export async function Sdg({ id }: SdgProps) {
  const data = await loadSdg(id);

  return data ? <SdgLayout data={data} /> : null;
}
