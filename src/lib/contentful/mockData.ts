/**
 * Fallback content when Contentful is not configured or returns no data.
 */

import type { Project, PageTextBlock } from "@/types/app";

const baseUrl = "https://placehold.co/1200x900/1a1a1a/666?text=Project";

export const mockProjects: Project[] = [
  {
    id: "mock-1",
    title: "Brand Identity — Nord",
    slug: "brand-identity-nord",
    excerpt:
      "A complete visual identity for a Nordic lifestyle brand, from logomark to packaging and digital touchpoints.",
    coverImage: { url: `${baseUrl}/project-1.jpg`, title: "Nord brand" },
    gallery: [
      { url: baseUrl, title: "Cover" },
      { url: "https://placehold.co/1200x900/2a2a2a/777?text=Detail", title: "Detail" },
    ],
    services: ["Brand Identity", "Art Direction"],
    year: 2024,
    client: "Nord",
    body: {
      type: "plain",
      text: "Nord is a lifestyle brand rooted in Scandinavian simplicity. We developed the full visual identity, including the wordmark, color system, and application across print and digital.",
    },
    featured: true,
  },
  {
    id: "mock-2",
    title: "Digital Experience — Flux",
    slug: "digital-experience-flux",
    excerpt:
      "Website and app UI design for a fintech startup, focused on clarity and trust.",
    coverImage: { url: `${baseUrl}/project-2.jpg`, title: "Flux app" },
    gallery: [{ url: `${baseUrl}/project-2.jpg`, title: "Cover" }],
    services: ["Digital Design", "UI/UX"],
    year: 2024,
    client: "Flux",
    body: {
      type: "plain",
      text: "Flux needed a clear, trustworthy digital presence. We designed their marketing site and core app flows with a focus on accessibility and conversion.",
    },
    featured: true,
  },
  {
    id: "mock-3",
    title: "Editorial — Mono Magazine",
    slug: "editorial-mono-magazine",
    excerpt:
      "Art direction and layout design for the first three issues of Mono, a print magazine on design and culture.",
    coverImage: { url: `${baseUrl}/project-3.jpg`, title: "Mono Magazine" },
    gallery: [],
    services: ["Art Direction", "Editorial Design"],
    year: 2023,
    client: "Mono",
    body: null,
    featured: false,
  },
];

export const mockTextBlocks: PageTextBlock[] = [
  {
    id: "mock-tb-1",
    internalName: "Home hero",
    heading: "We craft brands and experiences that stand out.",
    body: "3colorstudio is a design studio focused on identity, digital, and editorial work. We partner with ambitious clients to create work that is bold, clear, and lasting.",
    locationKey: "home.hero",
  },
  {
    id: "mock-tb-2",
    internalName: "Home services",
    heading: "What we do",
    body: "Brand identity and strategy, digital product design, art direction, and editorial design. From concept to launch, we bring clarity and craft to every step.",
    locationKey: "home.services",
  },
  {
    id: "mock-tb-3",
    internalName: "Home CTA",
    heading: "Start a project",
    body: "Have an idea or a brief? We’d love to hear from you. Get in touch for a conversation.",
    locationKey: "home.cta",
  },
  {
    id: "mock-tb-4",
    internalName: "About intro",
    heading: "Studio",
    body: "We’re a small studio with a big focus on craft and collaboration. Based between two cities, we work with clients worldwide.",
    locationKey: "about.intro",
  },
];
