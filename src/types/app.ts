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

/** Category hero data for project category pages (from Contentful projectCategory). */
export interface ProjectCategory {
  slug: string;
  title: string;
  subtitle: string;
  backgroundImage: string | null;
  backgroundVideo: string | null;
}

/** Project shape for category page list (ProjectDisplay / ProjectsEndlessScroll). */
export interface CategoryProject {
  id: string;
  title: string;
  description: string;
  featuredImage?: string;
  featuredVideo?: string;
  reels: Array<{ src: string; alt: string }>;
}

/** Homepage content (from Contentful homepage content type). */
export interface Homepage {
  heroImage: string | null;
  heroVideo: string | null;
  homepageReels: Array<{ src: string; alt: string }>;
  hotelLogos: Array<{ src: string; alt: string }>;
}
