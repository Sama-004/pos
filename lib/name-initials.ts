export function getInitials(fullName: string): string {
  if (!fullName) return "";

  const nameParts = fullName.split(" ").filter((part) => part.length > 0);

  if (nameParts.length === 0) return "";
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();

  return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
}
