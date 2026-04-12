import { dataset, projectId } from "@/sanity/lib/api";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

export const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};
