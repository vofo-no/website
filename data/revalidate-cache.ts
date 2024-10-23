import { revalidateSecret } from "@/sanity/lib/api";

export async function revalidateStatisticsCache(
  yearArg: string,
  hostname: string,
) {
  if (!revalidateSecret) throw "Revalidation not configured";
  if (!/^[a-z0-9\.\:]+$/.test(hostname)) throw "Invalid hostname";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${revalidateSecret}`);

  const response = await fetch(`https://${hostname}/api/revalidate`, {
    method: "POST",
    headers,
    body: JSON.stringify({ _type: "statisticsDataFile", _id: yearArg }),
  });

  return response.json();
}
