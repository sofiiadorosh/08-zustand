export const SITE_NAME = 'NoteHub';

export const SITE_DESCRIPTION =
  'NoteHub is a simple and efficient application for creating, organizing and searching personal notes.';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const OG_IMAGE = {
  url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

export function truncate(text: string, maxLength = 150): string {
  return text.length > maxLength
    ? `${text.slice(0, maxLength - 1).trimEnd()}…`
    : text;
}
