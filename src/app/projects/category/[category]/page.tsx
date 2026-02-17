import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectsEndlessScroll } from "@/components/ProjectsEndlessScroll";
import { ContactSection } from "@/components/ContactSection";
import { siteConfig } from "@/config/site";

// Mock category data - will be replaced with Contentful later
const CATEGORIES = {
  lifestyle: {
    title: "Lifestyle And Content",
    subtitle: "A FILM PRODUCTION AGENCY DEDICATED TO HOTEL BRANDS",
    backgroundImage: "/project_demo.png", // Using demo image for now
    backgroundVideo: undefined,
  },
  culinary: {
    title: "Culinary And Bars",
    subtitle: "A FILM PRODUCTION AGENCY DEDICATED TO HOTEL BRANDS",
    backgroundImage: "/project_demo.png",
    backgroundVideo: undefined,
    featuredName: "Ioannis Parikos", // Example from the demo image
  },
  brand: {
    title: "Brand Video",
    subtitle: "A FILM PRODUCTION AGENCY DEDICATED TO HOTEL BRANDS",
    backgroundImage: "/project_demo.png",
    backgroundVideo: undefined,
  },
  events: {
    title: "Events",
    subtitle: "A FILM PRODUCTION AGENCY DEDICATED TO HOTEL BRANDS",
    backgroundImage: "/project_demo.png",
    backgroundVideo: undefined,
  },
} as const;

type CategoryId = keyof typeof CATEGORIES;

// Mock project data - will be replaced with Contentful later
interface MockProject {
  id: string;
  title: string;
  description: string;
  featuredImage?: string;
  featuredVideo?: string;
  reels: Array<{ src: string; alt: string }>;
}

const MOCK_PROJECTS: Record<CategoryId, MockProject[]> = {
  lifestyle: [
    {
      id: "lifestyle-1",
      title: "Armyra by Papaionannou",
      description:
        "WE PRODUCE AND SHOOT COMPELLING NARRATIVES THAT BRING HOTEL BRANDS TO LIFE FILMING CAPTIVATING VISUALS WE SHOWCASE THE AUTHENTICITY OF A HOTEL EXPERIENCE, ELEVATE THE BRAND IDENTITY AND ENGAGE WITH THE GUESTS BY FUSING IMAGINATIVE INSPIRATION WITH A VISION FOR THE FUTURE, WE PRODUCE STRIKING AND ENDURING VISUAL TALES",
      featuredImage: "/project_img_demo.png",
      reels: [
        { src: "https://placehold.co/280x700/1a1a1a/fff?text=Reel+1", alt: "Reel 1" },
        { src: "https://placehold.co/280x700/2a2a2a/fff?text=Reel+2", alt: "Reel 2" },
        { src: "https://placehold.co/280x700/3a3a3a/fff?text=Reel+3", alt: "Reel 3" },
        { src: "https://placehold.co/280x700/4a4a4a/fff?text=Reel+4", alt: "Reel 4" },
        { src: "https://placehold.co/280x700/5a5a5a/fff?text=Reel+5", alt: "Reel 5" },
        { src: "https://placehold.co/280x700/6a6a6a/fff?text=Reel+6", alt: "Reel 6" },
        { src: "https://placehold.co/280x700/7a7a7a/fff?text=Reel+7", alt: "Reel 7" },
      ],
    },
    {
      id: "lifestyle-2",
      title: "Luxury Resort Lifestyle Content",
      description:
        "WE PRODUCE AND SHOOT COMPELLING NARRATIVES THAT BRING HOTEL BRANDS TO LIFE FILMING CAPTIVATING VISUALS WE SHOWCASE THE AUTHENTICITY OF A HOTEL EXPERIENCE, ELEVATE THE BRAND IDENTITY AND ENGAGE WITH THE GUESTS BY FUSING IMAGINATIVE INSPIRATION WITH A VISION FOR THE FUTURE, WE PRODUCE STRIKING AND ENDURING VISUAL TALES",
      featuredImage: "/project_img_demo.png",
      reels: [
        { src: "https://placehold.co/280x700/1a1a1a/fff?text=Reel+1", alt: "Reel 1" },
        { src: "https://placehold.co/280x700/2a2a2a/fff?text=Reel+2", alt: "Reel 2" },
        { src: "https://placehold.co/280x700/3a3a3a/fff?text=Reel+3", alt: "Reel 3" },
        { src: "https://placehold.co/280x700/4a4a4a/fff?text=Reel+4", alt: "Reel 4" },
        { src: "https://placehold.co/280x700/5a5a5a/fff?text=Reel+5", alt: "Reel 5" },
      ],
    },
  ],
  culinary: [
    {
      id: "culinary-1",
      title: "Chef Ioannis Parikos — Culinary Excellence",
      description:
        "WE PRODUCE AND SHOOT COMPELLING NARRATIVES THAT BRING HOTEL BRANDS TO LIFE FILMING CAPTIVATING VISUALS WE SHOWCASE THE AUTHENTICITY OF A HOTEL EXPERIENCE, ELEVATE THE BRAND IDENTITY AND ENGAGE WITH THE GUESTS BY FUSING IMAGINATIVE INSPIRATION WITH A VISION FOR THE FUTURE, WE PRODUCE STRIKING AND ENDURING VISUAL TALES",
      featuredImage: "/project_img_demo.png",
      reels: [
        { src: "https://placehold.co/280x700/1a1a1a/fff?text=Reel+1", alt: "Reel 1" },
        { src: "https://placehold.co/280x700/2a2a2a/fff?text=Reel+2", alt: "Reel 2" },
        { src: "https://placehold.co/280x700/3a3a3a/fff?text=Reel+3", alt: "Reel 3" },
        { src: "https://placehold.co/280x700/4a4a4a/fff?text=Reel+4", alt: "Reel 4" },
        { src: "https://placehold.co/280x700/5a5a5a/fff?text=Reel+5", alt: "Reel 5" },
      ],
    },
  ],
  brand: [
    {
      id: "brand-1",
      title: "Hotel Brand Identity Film",
      description:
        "WE PRODUCE AND SHOOT COMPELLING NARRATIVES THAT BRING HOTEL BRANDS TO LIFE FILMING CAPTIVATING VISUALS WE SHOWCASE THE AUTHENTICITY OF A HOTEL EXPERIENCE, ELEVATE THE BRAND IDENTITY AND ENGAGE WITH THE GUESTS BY FUSING IMAGINATIVE INSPIRATION WITH A VISION FOR THE FUTURE, WE PRODUCE STRIKING AND ENDURING VISUAL TALES",
      featuredImage: "/project_img_demo.png",
      reels: [
        { src: "https://placehold.co/280x700/1a1a1a/fff?text=Reel+1", alt: "Reel 1" },
        { src: "https://placehold.co/280x700/2a2a2a/fff?text=Reel+2", alt: "Reel 2" },
        { src: "https://placehold.co/280x700/3a3a3a/fff?text=Reel+3", alt: "Reel 3" },
        { src: "https://placehold.co/280x700/4a4a4a/fff?text=Reel+4", alt: "Reel 4" },
        { src: "https://placehold.co/280x700/5a5a5a/fff?text=Reel+5", alt: "Reel 5" },
      ],
    },
  ],
  events: [
    {
      id: "events-1",
      title: "Luxury Wedding Event Coverage",
      description:
        "WE PRODUCE AND SHOOT COMPELLING NARRATIVES THAT BRING HOTEL BRANDS TO LIFE FILMING CAPTIVATING VISUALS WE SHOWCASE THE AUTHENTICITY OF A HOTEL EXPERIENCE, ELEVATE THE BRAND IDENTITY AND ENGAGE WITH THE GUESTS BY FUSING IMAGINATIVE INSPIRATION WITH A VISION FOR THE FUTURE, WE PRODUCE STRIKING AND ENDURING VISUAL TALES",
      featuredImage: "/project_img_demo.png",
      reels: [
        { src: "https://placehold.co/280x700/1a1a1a/fff?text=Reel+1", alt: "Reel 1" },
        { src: "https://placehold.co/280x700/2a2a2a/fff?text=Reel+2", alt: "Reel 2" },
        { src: "https://placehold.co/280x700/3a3a3a/fff?text=Reel+3", alt: "Reel 3" },
        { src: "https://placehold.co/280x700/4a4a4a/fff?text=Reel+4", alt: "Reel 4" },
        { src: "https://placehold.co/280x700/5a5a5a/fff?text=Reel+5", alt: "Reel 5" },
      ],
    },
  ],
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = CATEGORIES[category as CategoryId];

  if (!categoryData) {
    return { title: "Category" };
  }

  return {
    title: `${categoryData.title} | ${siteConfig.name}`,
    description: categoryData.subtitle,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = CATEGORIES[category as CategoryId];
  const allProjects = MOCK_PROJECTS[category as CategoryId] || [];

  if (!categoryData) {
    notFound();
  }

  return (
    <>
      <ProjectHero
        categoryTitle={categoryData.title}
        subtitle={categoryData.subtitle}
        featuredName={"featuredName" in categoryData ? categoryData.featuredName : undefined}
        backgroundImage={categoryData.backgroundImage}
        backgroundVideo={categoryData.backgroundVideo}
        ctaText="SEE THE PROJECTS"
        ctaLink={`#projects`}
      />
      <div id="projects">
        <ProjectsEndlessScroll allProjects={allProjects} itemsPerPage={2} />
      </div>
      <ContactSection hideVideo={true} />
    </>
  );
}
