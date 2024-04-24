import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { YouTubePreview } from "./youtube-preview";

export const youtube = defineType({
  name: "youtube",
  type: "object",
  title: "YouTube-video",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube-video URL",
    }),
  ],
  preview: {
    select: { title: "url" },
  },
  components: {
    preview: YouTubePreview,
  },
});
