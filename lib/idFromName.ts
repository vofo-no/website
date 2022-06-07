export default function idFromName(name: string): string {
  return name.replace(/\W/g, "_");
}
