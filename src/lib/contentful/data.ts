/**
 * Public data API: fetches from Contentful when configured,
 * otherwise returns fallback mock data so the site always works.
 */

import { contentfulFetch, isContentfulConfigured } from "./client";
import {
  GET_FEATURED_PROJECTS,
  GET_ALL_PROJECTS,
  GET_PROJECT_BY_SLUG,
  GET_TEXT_BLOCKS_BY_LOCATION_KEYS,
} from "./queries";
import { mapProject, mapProjectList, mapTextBlockList } from "./mappers";
import type { Project, PageTextBlock } from "@/types/app";
import { mockProjects, mockTextBlocks } from "./mockData";

// —— Featured projects (home) ——
export async function getFeaturedProjects(options?: { revalidate?: number }): Promise<Project[]> {
  const data = await contentfulFetch<{
    projectCollection?: { items?: unknown[] };
  }>(GET_FEATURED_PROJECTS, undefined, {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (data?.projectCollection?.items) {
    const mapped = mapProjectList(data.projectCollection.items as Parameters<typeof mapProjectList>[0]);
    if (mapped.length > 0) return mapped;
  }

  return mockProjects.filter((p) => p.featured).slice(0, 6);
}

// —— All projects (index) ——
export async function getAllProjects(options?: { revalidate?: number }): Promise<Project[]> {
  const data = await contentfulFetch<{
    projectCollection?: { items?: unknown[] };
  }>(GET_ALL_PROJECTS, undefined, {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (data?.projectCollection?.items) {
    const mapped = mapProjectList(data.projectCollection.items as Parameters<typeof mapProjectList>[0]);
    if (mapped.length > 0) return mapped;
  }

  return mockProjects;
}

// —— Single project by slug ——
export async function getProjectBySlug(
  slug: string,
  options?: { revalidate?: number }
): Promise<Project | null> {
  const data = await contentfulFetch<{
    projectCollection?: { items?: unknown[] };
  }>(GET_PROJECT_BY_SLUG, { slug }, {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  const items = data?.projectCollection?.items;
  if (Array.isArray(items) && items.length > 0) {
    const project = mapProject(items[0] as Parameters<typeof mapProject>[0]);
    if (project) return project;
  }

  return mockProjects.find((p) => p.slug === slug) ?? null;
}

// —— Text blocks by one or more location keys ——
export async function getTextBlocksByLocationKeys(
  locationKeys: string[],
  options?: { revalidate?: number }
): Promise<PageTextBlock[]> {
  if (locationKeys.length === 0) return [];

  const data = await contentfulFetch<{
    pageTextBlockCollection?: { items?: unknown[] };
  }>(GET_TEXT_BLOCKS_BY_LOCATION_KEYS, { locationKeys }, {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  const items = data?.pageTextBlockCollection?.items;
  if (Array.isArray(items) && items.length > 0) {
    const mapped = mapTextBlockList(items as Parameters<typeof mapTextBlockList>[0]);
    if (mapped.length > 0) return mapped;
  }

  return mockTextBlocks.filter((b) => b.locationKey && locationKeys.includes(b.locationKey));
}

/** Single location key convenience. */
export async function getTextBlocksByLocationKey(
  locationKey: string,
  options?: { revalidate?: number }
): Promise<PageTextBlock[]> {
  return getTextBlocksByLocationKeys([locationKey], options);
}

export { isContentfulConfigured };
