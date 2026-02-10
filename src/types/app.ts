/**
 * Application-level models (mapped from Contentful or used as fallbacks).
 */

export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: { url: string; title?: string | null } | null;
  gallery: Array<{ url: string; title?: string | null }>;
  services: string[];
  year: string | number | null;
  client: string | null;
  body: RichTextContent | string | null;
  featured: boolean;
}

/** Rich text as stored in app (can be JSON or plain string). */
export type RichTextContent =
  | { type: "richtext"; json: Record<string, unknown>; plain?: string }
  | { type: "plain"; text: string };

export interface PageTextBlock {
  id: string;
  internalName: string | null;
  heading: string | null;
  body: string | RichTextContent | null;
  locationKey: string | null;
}
