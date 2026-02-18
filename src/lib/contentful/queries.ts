/**
 * Contentful GraphQL queries.
 *
 * Required content types in Contentful:
 *
 * —— projectCategory ——
 * slug (Short text, required), title, subtitle, backgroundImage (Media), backgroundVideo (Media, optional)
 *
 * —— project ——
 * projectTitle (Short text), slug (Short text), projectDescription (Short text)
 * coverImage (Media), featuredImage (Media), featuredVideo (Media), gallery (Media, many)
 * category (Reference to projectCategory) → select from projectCategory entries
 *
 * —— homepage ——
 * heroImage (Media), heroVideo (Media), homepageReels (Media, many)
 *
 * —— pageTextBlock ——
 * internalName, heading, body, locationKey
 */

const PROJECT_FIELDS = `
  sys { id }
  projectTitle
  slug
  projectDescription
  coverImage { url title }
  featuredImage { url title }
  featuredVideo { url }
  gallery { url title }
  category { slug }
`;

const PROJECT_LIST_FIELDS = `
  sys { id }
  projectTitle
  slug
  projectDescription
  coverImage { url title }
  featuredImage { url title }
  featuredVideo { url }
  gallery { url title }
  category { slug }
`;

const PROJECT_CATEGORY_FIELDS = `
  sys { id }
  slug
  title
  subtitle
  backgroundImage { url }
  backgroundVideo { url }
`;

// —— Featured projects (for home) ——
export const GET_FEATURED_PROJECTS = `
  query GetFeaturedProjects {
    projectCollection(order: sys_firstPublishedAt_DESC, limit: 6) {
      items {
        ${PROJECT_LIST_FIELDS}
      }
    }
  }
`;

// —— All projects (for index) ——
export const GET_ALL_PROJECTS = `
  query GetAllProjects {
    projectCollection(order: sys_firstPublishedAt_DESC) {
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
      }
    }
  }
`;

// —— Project categories (for category page hero) ——
export const GET_PROJECT_CATEGORIES = `
  query GetProjectCategories {
    projectCategoryCollection(order: slug_ASC) {
      items {
        ${PROJECT_CATEGORY_FIELDS}
      }
    }
  }
`;

// —— Single project category by slug ——
export const GET_PROJECT_CATEGORY_BY_SLUG = `
  query GetProjectCategoryBySlug($slug: String!) {
    projectCategoryCollection(where: { slug: $slug }, limit: 1) {
      items {
        ${PROJECT_CATEGORY_FIELDS}
      }
    }
  }
`;

// —— Projects by category slug (for category page list) ——
// Contentful GraphQL cannot filter projectCollection by category.slug; use linkedFrom on the category instead.
// linkedFrom exposes entryCollection (not projectCollection); use ... on Project to get project fields.
export const GET_PROJECTS_BY_CATEGORY = `
  query GetProjectsByCategory($categorySlug: String!) {
    projectCategoryCollection(where: { slug: $categorySlug }, limit: 1) {
      items {
        linkedFrom {
          entryCollection(limit: 100) {
            items {
              ... on Project {
                sys { id }
                projectTitle
                projectDescription
                coverImage { url title }
                featuredImage { url title }
                featuredVideo { url }
                galleryCollection(limit: 50) {
                  items {
                    url
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// —— Homepage (singleton: first entry) ——
export const GET_HOMEPAGE = `
  query GetHomepage {
    homepageCollection(limit: 1) {
      items {
        sys { id }
        heroImage { url }
        heroVideo { url }
        homepageReels { url title }
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
