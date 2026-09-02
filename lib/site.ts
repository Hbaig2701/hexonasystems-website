export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hexonasystems.com',
  name: 'Hexona Systems',
  locale: 'en_CA',
} as const;

/** Absolute URL helper — OG images and JSON-LD both need one. */
export function absolute(path: string): string {
  return new URL(path, SITE.url).toString();
}
