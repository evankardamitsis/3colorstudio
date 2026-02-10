import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import { getProjectBySlug, getAllProjects } from "@/lib/contentful/data";
import { siteConfig } from "@/config/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };

  const title = project.title;
  const description = project.excerpt;
  const image = project.coverImage?.url;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: description ?? undefined,
      images: image ? [{ url: image, alt: project.coverImage?.title ?? title }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const coverUrl = project.coverImage?.url;
  const isExternalImage = coverUrl?.startsWith("http") ?? false;

  return (
    <>
      <Section className="pt-20 md:pt-28">
        <Link
          href="/projects"
          className="inline-flex text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white mb-8"
        >
          ← Back to projects
        </Link>

        <header className="mb-10 md:mb-14">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
            {project.client && <span>Client: {project.client}</span>}
            {project.year != null && <span>Year: {project.year}</span>}
            {project.services.length > 0 && (
              <span>{project.services.join(" · ")}</span>
            )}
          </div>
        </header>

        {coverUrl && (
          <div className="aspect-16/10 relative rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-12">
            <Image
              src={coverUrl}
              alt={project.coverImage?.title ?? project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              unoptimized={!isExternalImage}
            />
          </div>
        )}

        {project.body && (
          <div className="max-w-3xl">
            <RichTextRenderer content={project.body} />
          </div>
        )}
      </Section>

      {project.gallery.length > 0 && (
        <Section className="border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="sr-only">Gallery</h2>
          <ul className="space-y-8">
            {project.gallery.map((img, i) => (
              <li key={i} className="relative aspect-16/10 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={img.url}
                  alt={img.title ?? `Image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  unoptimized={!img.url.startsWith("http")}
                />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
