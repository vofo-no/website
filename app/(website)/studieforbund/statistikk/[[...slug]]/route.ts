import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  redirect(`https://statistikk.vofo.no/${(params.slug || []).join("/")}`);
}
