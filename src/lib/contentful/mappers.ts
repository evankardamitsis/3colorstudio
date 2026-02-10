/**
 * Maps Contentful GraphQL response shapes to app models.
 */

import type { Project, PageTextBlock, RichTextContent } from "@/types/app";

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
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  coverImage?: GqlAsset | null;
  gallery?: GqlAsset[] | null;
  services?: string[] | null;
  year?: number | string | null;
  client?: string | null;
  body?: GqlRichText | null;
  featured?: boolean | null;
}

interface GqlTextBlockItem {
  sys: { id: string };
  internalName?: string | null;
  heading?: string | null;
  body?: string | GqlRichText | null;
  locationKey?: string | null;
}

function mapRichText(body: GqlRichText | string | null | undefined): RichTextContent | string | null {
  if (body == null) return null;
  if (typeof body === "string") return body;
  return {
    type: "richtext",
    json: body.json,
  };
}

export function mapProject(item: GqlProjectItem | null | undefined): Project | null {
  if (!item?.sys?.id) return null;
  return {
    id: item.sys.id,
    title: item.title ?? "",
    slug: item.slug ?? "",
    excerpt: item.excerpt ?? "",
    coverImage: item.coverImage ?? null,
    gallery: item.gallery ?? [],
    services: item.services ?? [],
    year: item.year ?? null,
    client: item.client ?? null,
    body: mapRichText(item.body ?? null),
    featured: item.featured ?? false,
  };
}

export function mapProjectList(items: (GqlProjectItem | null)[] | null | undefined): Project[] {
  if (!Array.isArray(items)) return [];
  return items.map(mapProject).filter((p): p is Project => p !== null);
}

export function mapTextBlock(item: GqlTextBlockItem | null | undefined): PageTextBlock | null {
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
  items: (GqlTextBlockItem | null)[] | null | undefined
): PageTextBlock[] {
  if (!Array.isArray(items)) return [];
  return items.map(mapTextBlock).filter((b): b is PageTextBlock => b !== null);
}
