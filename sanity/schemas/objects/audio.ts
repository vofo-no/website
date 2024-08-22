import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { refToFileUrl } from "@/components/shared/portable-text-body/utils";

import { AudioPreview } from "./audio-preview";

export const audio = defineType({
  name: "audio",
  type: "object",
  title: "Lyd",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "URL",
    }),
    defineField({
      name: "file",
      title: "Lydfil",
      type: "file",
      options: { accept: "audio/*" },
    }),
  ],
  preview: {
    select: {
      title: "url",
      media: "file.asset",
    },
    prepare({ title, media }) {
      return {
        title: title || refToFileUrl(media._ref),
      };
    },
  },
  components: {
    preview: AudioPreview,
  },
});
