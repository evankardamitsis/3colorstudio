/**
 * Maps Contentful GraphQL response shapes to app models.
 */

import type {
  Project,
  PageTextBlock,
  RichTextContent,
  ProjectCategory,
  CategoryProject,
  Homepage,
} from "@/types/app";

// GraphQL response types (minimal)
interface GqlAsset {
  url: string;
  title?: string | null;
}

interface GqlRichText {
  json: Record<string, unknown>;
}

interface GqlProjectItem {
  sys: { id: string };
  projectTitle?: string | null;
  slug?: string | null;
  projectDescription?: string | null;
  coverImage?: GqlAsset | null;
  featuredImage?: GqlAsset | null;
  featuredVideo?: { url: string } | null;
  gallery?: GqlAsset[] | null; // For direct queries (PROJECT_FIELDS, PROJECT_LIST_FIELDS)
  galleryCollection?: { items?: GqlAsset[] | null } | null; // For linkedFrom queries
  category?: { slug?: string | null } | null;
}

interface GqlProjectCategoryItem {
  sys: { id: string };
  slug?: string | null;
  title?: string | null;
  subtitle?: string | null;
  backgroundImage?: { url: string } | null;
  backgroundVideo?: { url: string } | null;
}

interface GqlHomepageItem {
  sys: { id: string };
  heroImage?: { url: string } | null;
  heroVideo?: { url: string } | null;
  homepageReels?: Array<{ url: string; title?: string | null }> | null;
}

interface GqlTextBlockItem {
  sys: { id: string };
  internalName?: string | null;
  heading?: string | null;
  body?: string | GqlRichText | null;
  locationKey?: string | null;
}

function mapRichText(
  body: GqlRichText | string | null | undefined,
): RichTextContent | string | null {
  if (body == null) return null;
  if (typeof body === "string") return body;
  return {
    type: "richtext",
    json: body.json,
  };
}

export function mapProject(
  item: GqlProjectItem | null | undefined,
): Project | null {
  if (!item?.sys?.id) return null;
  return {
    id: item.sys.id,
    title: item.projectTitle ?? "",
    slug: item.slug ?? "",
    excerpt: item.projectDescription ?? "",
    coverImage: item.featuredImage ?? item.coverImage ?? null,
    gallery: item.gallery ?? [],
    services: [],
    year: null,
    client: null,
    body: null,
    featured: false,
  };
}

export function mapProjectList(
  items: (GqlProjectItem | null)[] | null | undefined,
): Project[] {
  if (!Array.isArray(items)) return [];
  return items.map(mapProject).filter((p): p is Project => p !== null);
}

export function mapHomepage(
  item: GqlHomepageItem | null | undefined,
): Homepage | null {
  if (!item?.sys?.id) return null;
  const reels = (item.homepageReels ?? []).map((a) => ({
    src: a.url,
    alt: a.title ?? "",
  }));
  return {
    heroImage: item.heroImage?.url ?? null,
    heroVideo: item.heroVideo?.url ?? null,
    homepageReels: reels,
  };
}

export function mapTextBlock(
  item: GqlTextBlockItem | null | undefined,
): PageTextBlock | null {
  if (!item?.sys?.id) return null;
  return {
    id: item.sys.id,
    internalName: item.internalName ?? null,
    heading: item.heading ?? null,
    body: mapRichText(item.body ?? null),
    locationKey: item.locationKey ?? null,
  };
}

export function mapTextBlockList(
  items: (GqlTextBlockItem | null)[] | null | undefined,
): PageTextBlock[] {
  if (!Array.isArray(items)) return [];
  return items.map(mapTextBlock).filter((b): b is PageTextBlock => b !== null);
}

export function mapProjectCategory(
  item: GqlProjectCategoryItem | null | undefined,
): ProjectCategory | null {
  if (!item?.sys?.id) return null;
  return {
    slug: item.slug ?? "",
    title: item.title ?? "",
    subtitle: item.subtitle ?? "",
    backgroundImage: item.backgroundImage?.url ?? null,
    backgroundVideo: item.backgroundVideo?.url ?? null,
  };
}

export function mapProjectCategoryList(
  items: (GqlProjectCategoryItem | null)[] | null | undefined,
): ProjectCategory[] {
  if (!Array.isArray(items)) return [];
  return items
    .map(mapProjectCategory)
    .filter((c): c is ProjectCategory => c !== null);
}

/** Map a project list item (with category fields) to CategoryProject for the category page. */
export function mapToCategoryProject(
  item: GqlProjectItem | null | undefined,
): CategoryProject | null {
  if (!item?.sys?.id) return null;
  // Handle both gallery (direct) and galleryCollection (linkedFrom) formats
  const galleryItems = item.galleryCollection?.items ?? item.gallery ?? [];
  const reels = galleryItems.map((a) => ({
    src: a.url,
    alt: a.title ?? "",
  }));
  return {
    id: item.sys.id,
    title: item.projectTitle ?? "",
    description: item.projectDescription ?? "",
    featuredImage: item.featuredImage?.url ?? item.coverImage?.url,
    featuredVideo: item.featuredVideo?.url,
    reels,
  };
}

export function mapToCategoryProjectList(
  items: (GqlProjectItem | null)[] | null | undefined,
): CategoryProject[] {
  if (!Array.isArray(items)) return [];
  return items
    .map(mapToCategoryProject)
    .filter((p): p is CategoryProject => p !== null);
}
