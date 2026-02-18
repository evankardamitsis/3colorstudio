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

// —— Project (raw from CMS). Field IDs: projectTitle, slug, projectDescription, coverImage, featuredImage, featuredVideo, gallery, category (Reference to projectCategory) ——
export interface ContentfulProject {
  sys: { id: string };
  projectTitle?: string | null;
  slug?: string | null;
  projectDescription?: string | null;
  coverImage?: { url: string; title?: string | null } | null;
  featuredImage?: { url: string; title?: string | null } | null;
  featuredVideo?: { url: string } | null;
  gallery?: Array<{ url: string; title?: string | null }> | null;
  category?: { slug?: string | null } | null;
}

// —— Page text block (raw from CMS) ——
export interface ContentfulPageTextBlock {
  sys: { id: string };
  internalName?: string | null;
  heading?: string | null;
  body?: string | ContentfulRichText | null;
  locationKey?: string | null;
}

// —— Project category (raw from CMS, content type: projectCategory) ——
export interface ContentfulProjectCategory {
  sys: { id: string };
  slug?: string | null;
  title?: string | null;
  subtitle?: string | null;
  backgroundImage?: { url: string } | null;
  backgroundVideo?: { url: string } | null;
}

// —— Homepage (raw from CMS, content type: homepage). Fields: heroImage, heroVideo, homepageReels ——
export interface ContentfulHomepage {
  sys: { id: string };
  heroImage?: { url: string } | null;
  heroVideo?: { url: string } | null;
  homepageReels?: Array<{ url: string; title?: string | null }> | null;
}
