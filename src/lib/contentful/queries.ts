/**
 * Contentful GraphQL queries.
 * Content type IDs in Contentful must match: project, pageTextBlock.
 */

const PROJECT_FIELDS = `
  sys { id }
  title
  slug
  excerpt
  coverImage { url title }
  gallery { url title }
  services
  year
  client
  body {
    json
  }
  featured
`;

const PROJECT_LIST_FIELDS = `
  sys { id }
  title
  slug
  excerpt
  coverImage { url title }
  services
  year
  client
  featured
`;

// —— Featured projects (for home) ——
export const GET_FEATURED_PROJECTS = `
  query GetFeaturedProjects {
    projectCollection(where: { featured: true }, order: year_DESC, limit: 6) {
      items {
        ${PROJECT_LIST_FIELDS}
      }
    }
  }
`;

// —— All projects (for index) ——
export const GET_ALL_PROJECTS = `
  query GetAllProjects {
    projectCollection(order: year_DESC) {
      items {
        ${PROJECT_LIST_FIELDS}
      }
    }
  }
`;

// —— Single project by slug ——
export const GET_PROJECT_BY_SLUG = `
  query GetProjectBySlug($slug: String!) {
    projectCollection(where: { slug: $slug }, limit: 1) {
      items {
        ${PROJECT_FIELDS}
        gallery { url title }
      }
    }
  }
`;

// —— Text blocks by location key (e.g. "home.services", "about.intro") ——
export const GET_TEXT_BLOCKS_BY_LOCATION = `
  query GetTextBlocksByLocation($locationKey: String!) {
    pageTextBlockCollection(where: { locationKey: $locationKey }) {
      items {
        sys { id }
        internalName
        heading
        body
        locationKey
      }
    }
  }
`;

// —— Multiple location keys in one request (if supported; else we call per key)
// Contentful supports "in" filter: locationKey_in: ["home.services", "about.intro"]
export const GET_TEXT_BLOCKS_BY_LOCATION_KEYS = `
  query GetTextBlocksByLocationKeys($locationKeys: [String!]) {
    pageTextBlockCollection(where: { locationKey_in: $locationKeys }) {
      items {
        sys { id }
        internalName
        heading
        body
        locationKey
      }
    }
  }
`;
