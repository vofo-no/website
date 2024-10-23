import { revalidateSecret } from "@/sanity/lib/api";
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export async function revalidateStatisticsCache(
  yearArg: string,
  hostname: string,
) {
  if (!revalidateSecret) throw "Revalidation not configured";
  if (!/^[a-z0-9\.\:]+$/.test(hostname)) throw "Invalid hostname";

  const body = JSON.stringify({ _type: "statisticsDataFile", _id: yearArg });
  const token = await encodeSignatureHeader(
    body,
    new Date().getTime(),
    revalidateSecret,
  );

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(SIGNATURE_HEADER_NAME, token);

  const response = await fetch(`https://${hostname}/api/revalidate`, {
    method: "POST",
    headers,
    body,
  });

  console.log(await response.json());
}
