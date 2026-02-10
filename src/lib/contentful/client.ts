/**
 * Contentful GraphQL Delivery API client.
 * Uses fetch; no SDK. Reads env at runtime.
 */

const CONTENTFUL_GRAPHQL_URL = "https://graphql.contentful.com/content/v1";

export type ContentfulConfig = {
  spaceId: string;
  environment: string;
  deliveryToken: string;
};

function getConfig(): ContentfulConfig | null {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
  const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

  if (!spaceId || !deliveryToken) {
    return null;
  }

  return { spaceId, environment, deliveryToken };
}

export function isContentfulConfigured(): boolean {
  return getConfig() !== null;
}

export interface ContentfulFetchOptions {
  /** Cache strategy for Next.js fetch */
  next?: RequestInit["next"] & { revalidate?: number };
}

/**
 * Execute a GraphQL query against Contentful Delivery API.
 * Returns null if Contentful is not configured or the request fails.
 */
export async function contentfulFetch<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  options?: ContentfulFetchOptions
): Promise<T | null> {
  const config = getConfig();
  if (!config) {
    return null;
  }

  const url = `${CONTENTFUL_GRAPHQL_URL}/spaces/${config.spaceId}/environments/${config.environment}`;

  const nextConfig = options?.next ?? { revalidate: 60 };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.deliveryToken}`,
      },
      body: JSON.stringify({ query, variables: variables ?? {} }),
      next: nextConfig,
    });

    if (!res.ok) {
      console.error("[Contentful] HTTP error:", res.status, await res.text());
      return null;
    }

    const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };
    if (json.errors?.length) {
      console.error("[Contentful] GraphQL errors:", json.errors);
      return null;
    }

    return json.data ?? null;
  } catch (err) {
    console.error("[Contentful] Request failed:", err);
    return null;
  }
}
