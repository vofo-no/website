export function refToFileUrl(ref?: string) {
  if (typeof ref !== "string") return undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_file, id, extension] = ref.split("-");
  return `/filer/${id}.${extension}`;
}
