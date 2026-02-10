import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getAllProjects } from "@/lib/contentful/data";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected work by ${siteConfig.name} — brand identity, digital design, and editorial.`,
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Section className="pt-20 md:pt-28">
      <div className="mb-12 md:mb-16">
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
          Projects
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
          A selection of our recent work across identity, digital, and
          editorial.
        </p>
      </div>
      <ProjectGrid projects={projects} columns={3} />
    </Section>
  );
}
