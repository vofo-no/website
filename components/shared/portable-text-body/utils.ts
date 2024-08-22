export function refToFileUrl(ref?: string) {
  if (typeof ref !== "string") return undefined;

  const [_file, id, extension] = ref.split("-");
  return `/filer/${id}.${extension}`;
}
