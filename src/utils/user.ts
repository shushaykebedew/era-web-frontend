/**
 * Extracts initials from a full name for avatar display.
 * Returns first letter of each word, up to 2 characters, uppercase.
 * Returns "U" if no name is provided.
 */
export function getUserInitials(fullName?: string): string {
  if (!fullName) return "U";
  return fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
