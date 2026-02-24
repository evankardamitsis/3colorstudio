import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectsEndlessScroll } from "@/components/ProjectsEndlessScroll";
import { ContactSection } from "@/components/ContactSection";
import { siteConfig } from "@/config/site";
import {
  getProjectCategories,
  getProjectCategoryBySlug,
  getProjectsByCategory,
} from "@/lib/contentful/data";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getProjectCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = await getProjectCategoryBySlug(category);

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
  const categoryData = await getProjectCategoryBySlug(category);
  const allProjects = await getProjectsByCategory(category);

  if (!categoryData) {
    notFound();
  }

  return (
    <div>
      <ProjectHero
        categoryTitle={categoryData.title}
        subtitle={categoryData.subtitle}
        backgroundImage={categoryData.backgroundImage ?? undefined}
        backgroundVideo={categoryData.backgroundVideo ?? undefined}
        ctaText="SEE THE PROJECTS"
        ctaLink="#projects"
      />
      <div id="projects">
        <ProjectsEndlessScroll allProjects={allProjects} itemsPerPage={2} />
      </div>
      <ContactSection hideVideo={true} />
    </div>
  );
}
