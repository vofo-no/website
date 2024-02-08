import { loadAllTopics } from "@/sanity/loader/loadQuery";

export async function GET() {
  const { data } = await loadAllTopics();

  return Response.json({ data });
}
