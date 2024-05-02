import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { revalidateSecret } from "@/sanity/lib/api";
import { parseBody } from "next-sanity/webhook";

import {
  updateRecordFromWebhook,
  WebhookIndexableDocument,
} from "@/lib/algolia/write";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } =
      await parseBody<WebhookIndexableDocument>(req, revalidateSecret);
    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(message, { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag(body._type);
    revalidateTag(`${body._type}:${body._id}`);
    if (body.slug) {
      revalidateTag(`${body._type}:${body.slug}`);
    }

    // Push record to search index
    updateRecordFromWebhook(body);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
