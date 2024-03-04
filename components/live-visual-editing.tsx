"use client";

import { useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { useLiveMode } from "@sanity/react-loader";
import { VisualEditing } from "next-sanity";

// Always enable stega in Live Mode
const stegaClient = client.withConfig({ stega: true });

export default function LiveVisualEditing() {
  useLiveMode({ client: stegaClient });
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview" &&
      window === parent &&
      !opener
    ) {
      // If not an iframe, turn off Draft Mode
      location.href = "/api/disable-draft";
    }
  }, []);

  return <VisualEditing />;
}
