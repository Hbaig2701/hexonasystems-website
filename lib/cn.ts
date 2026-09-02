export type ClassValue = string | false | null | undefined;

/** Minimal class joiner. No dependency needed for what this site does. */
export function cn(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(' ');
}
