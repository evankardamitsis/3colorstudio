/**
 * Contentful content type definitions and raw API response shapes.
 * These mirror the Contentful content models: project, pageTextBlock.
 */

// —— Asset (image) ——
export interface ContentfulAsset {
  url: string;
  title?: string | null;
  description?: string | null;
  width?: number | null;
  height?: number | null;
}

// —— Rich text (GraphQL returns a JSON object)
export interface ContentfulRichText {
  json: Record<string, unknown>;
  links?: {
    assets?: { block?: Array<{ url: string; title?: string | null }> };
  };
}

// —— Project (raw from CMS) ——
export interface ContentfulProject {
  sys: { id: string };
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  coverImage?: { url: string; title?: string | null } | null;
  gallery?: Array<{ url: string; title?: string | null }> | null;
  services?: string[] | null;
  year?: number | string | null;
  client?: string | null;
  body?: ContentfulRichText | string | null;
  featured?: boolean | null;
}

// —— Page text block (raw from CMS) ——
export interface ContentfulPageTextBlock {
  sys: { id: string };
  internalName?: string | null;
  heading?: string | null;
  body?: string | ContentfulRichText | null;
  locationKey?: string | null;
}
