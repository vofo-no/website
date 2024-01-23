export function formatPhone(input: string) {
  if (input.length !== 8) return input;

  if (input.startsWith("4") || input.startsWith("8") || input.startsWith("9")) {
    return [
      input.substring(0, 3),
      input.substring(3, 5),
      input.substring(5),
    ].join(" ");
  }

  return [
    input.substring(0, 2),
    input.substring(2, 4),
    input.substring(4, 6),
    input.substring(6),
  ].join(" ");
}
