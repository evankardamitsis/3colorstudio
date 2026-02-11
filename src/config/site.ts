/**
 * Site-wide constants for 3colorstudio
 */

export const siteConfig = {
  name: "3colorstudio",
  tagline: "FILM PRODUCTION AGENCY.",
  description:
    "A creative studio crafting bold visual experiences and thoughtful design.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://3colorstudio.com",
  links: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM ??
      "https://www.instagram.com/3.colorstudio/?hl=en",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? "#",
    behance: process.env.NEXT_PUBLIC_BEHANCE ?? "#",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "#",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ] as const,
} as const;
