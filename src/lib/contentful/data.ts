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
  GET_PROJECT_CATEGORIES,
  GET_PROJECT_CATEGORY_BY_SLUG,
  GET_PROJECTS_BY_CATEGORY,
  GET_HOMEPAGE,
} from "./queries";
import {
  mapProject,
  mapProjectList,
  mapTextBlockList,
  mapProjectCategory,
  mapProjectCategoryList,
  mapToCategoryProjectList,
  mapHomepage,
} from "./mappers";
import type {
  Project,
  PageTextBlock,
  ProjectCategory,
  CategoryProject,
  Homepage,
} from "@/types/app";
import {
  mockProjects,
  mockTextBlocks,
  mockCategoryProjects,
  mockHomepage,
} from "./mockData";

/** Category order: 1 Brand Film, 2 Lifestyle And Content, 3 Culinary And Bars, 4 Events. */
const CATEGORY_ORDER: Record<string, number> = {
  brand: 0,
  "brand-film": 0,
  lifestyle: 1,
  "lifestyle-and-content": 1,
  culinary: 2,
  "culinary-and-bars": 2,
  events: 3,
};

function sortCategoriesByOrder<T extends { slug: string }>(items: T[]): T[] {
  const rank = (slug: string) => CATEGORY_ORDER[slug] ?? 999;
  return [...items].sort((a, b) => rank(a.slug) - rank(b.slug));
}

// —— Featured projects (home) ——
export async function getFeaturedProjects(options?: {
  revalidate?: number;
}): Promise<Project[]> {
  const data = await contentfulFetch<{
    projectCollection?: { items?: unknown[] };
  }>(GET_FEATURED_PROJECTS, undefined, {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (data?.projectCollection?.items) {
    const mapped = mapProjectList(
      data.projectCollection.items as Parameters<typeof mapProjectList>[0],
    );
    if (mapped.length > 0) return mapped;
  }

  return mockProjects.filter((p) => p.featured).slice(0, 6);
}

// —— All projects (index) ——
export async function getAllProjects(options?: {
  revalidate?: number;
}): Promise<Project[]> {
  const data = await contentfulFetch<{
    projectCollection?: { items?: unknown[] };
  }>(GET_ALL_PROJECTS, undefined, {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (data?.projectCollection?.items) {
    const mapped = mapProjectList(
      data.projectCollection.items as Parameters<typeof mapProjectList>[0],
    );
    if (mapped.length > 0) return mapped;
  }

  return mockProjects;
}

// —— Single project by slug ——
export async function getProjectBySlug(
  slug: string,
  options?: { revalidate?: number },
): Promise<Project | null> {
  const data = await contentfulFetch<{
    projectCollection?: { items?: unknown[] };
  }>(
    GET_PROJECT_BY_SLUG,
    { slug },
    {
      next: { revalidate: options?.revalidate ?? 60 },
    },
  );

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
  options?: { revalidate?: number },
): Promise<PageTextBlock[]> {
  if (locationKeys.length === 0) return [];

  const data = await contentfulFetch<{
    pageTextBlockCollection?: { items?: unknown[] };
  }>(
    GET_TEXT_BLOCKS_BY_LOCATION_KEYS,
    { locationKeys },
    {
      next: { revalidate: options?.revalidate ?? 60 },
    },
  );

  const items = data?.pageTextBlockCollection?.items;
  if (Array.isArray(items) && items.length > 0) {
    const mapped = mapTextBlockList(
      items as Parameters<typeof mapTextBlockList>[0],
    );
    if (mapped.length > 0) return mapped;
  }

  return mockTextBlocks.filter(
    (b) => b.locationKey && locationKeys.includes(b.locationKey),
  );
}

/** Single location key convenience. */
export async function getTextBlocksByLocationKey(
  locationKey: string,
  options?: { revalidate?: number },
): Promise<PageTextBlock[]> {
  return getTextBlocksByLocationKeys([locationKey], options);
}

// —— Project categories (category page hero) ——
export async function getProjectCategories(options?: {
  revalidate?: number;
}): Promise<ProjectCategory[]> {
  const data = await contentfulFetch<{
    projectCategoryCollection?: { items?: unknown[] };
  }>(GET_PROJECT_CATEGORIES, undefined, {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  const items = data?.projectCategoryCollection?.items;
  if (Array.isArray(items) && items.length > 0) {
    const mapped = mapProjectCategoryList(
      items as Parameters<typeof mapProjectCategoryList>[0],
    );
    if (mapped.length > 0) return sortCategoriesByOrder(mapped);
  }

  return [];
}

export async function getProjectCategoryBySlug(
  slug: string,
  options?: { revalidate?: number },
): Promise<ProjectCategory | null> {
  const data = await contentfulFetch<{
    projectCategoryCollection?: { items?: unknown[] };
  }>(
    GET_PROJECT_CATEGORY_BY_SLUG,
    { slug },
    {
      next: { revalidate: options?.revalidate ?? 60 },
    },
  );

  const items = data?.projectCategoryCollection?.items;
  if (Array.isArray(items) && items.length > 0) {
    return mapProjectCategory(
      items[0] as Parameters<typeof mapProjectCategory>[0],
    );
  }

  return null;
}

// —— Homepage (hero + reels) ——
export async function getHomepage(options?: {
  revalidate?: number;
}): Promise<Homepage> {
  const data = await contentfulFetch<{
    homepageCollection?: { items?: unknown[] };
  }>(GET_HOMEPAGE, undefined, {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  const items = data?.homepageCollection?.items;
  if (Array.isArray(items) && items.length > 0) {
    const mapped = mapHomepage(items[0] as Parameters<typeof mapHomepage>[0]);
    if (mapped) return mapped;
  }

  return mockHomepage;
}

// —— Projects by category (category page list) ——
export async function getProjectsByCategory(
  categorySlug: string,
  options?: { revalidate?: number },
): Promise<CategoryProject[]> {
  const data = await contentfulFetch<{
    projectCategoryCollection?: {
      items?: Array<{
        linkedFrom?: { entryCollection?: { items?: unknown[] } };
      }>;
    };
  }>(
    GET_PROJECTS_BY_CATEGORY,
    { categorySlug },
    {
      next: { revalidate: options?.revalidate ?? 60 },
    },
  );

  const categoryItems = data?.projectCategoryCollection?.items;
  const items =
    Array.isArray(categoryItems) && categoryItems.length > 0
      ? categoryItems[0]?.linkedFrom?.entryCollection?.items
      : undefined;
  if (Array.isArray(items) && items.length > 0) {
    const mapped = mapToCategoryProjectList(
      items as Parameters<typeof mapToCategoryProjectList>[0],
    );
    if (mapped.length > 0) return mapped;
  }

  return mockCategoryProjects[categorySlug] ?? [];
}

export { isContentfulConfigured };
