import { loadAllCounties } from "@/sanity/loader/loadQuery";

export async function GET() {
  const data = await loadAllCounties();

  return Response.json({ data });
}
