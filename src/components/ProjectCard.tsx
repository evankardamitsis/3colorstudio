import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/app";

interface ProjectCardProps {
  project: Project;
  /** Optional priority for LCP image (use for above-the-fold cards) */
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  const coverUrl = project.coverImage?.url;
  const title = project.title;
  const excerpt = project.excerpt;
  const year = project.year != null ? String(project.year) : null;
  const services = project.services.slice(0, 2).join(" · ");

  return (
    <article className="group">
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 rounded-lg overflow-hidden">
        <div className="aspect-4/3 relative bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={project.coverImage?.title ?? title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              unoptimized={coverUrl.startsWith("/")}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">
              No image
            </div>
          )}
        </div>
        <div className="pt-4">
          <h3 className="font-heading font-normal text-lg text-neutral-900 dark:text-neutral-100 group-hover:underline">
            {title}
          </h3>
          {(year || services) && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {[year, services].filter(Boolean).join(" · ")}
            </p>
          )}
          {excerpt && (
            <p className="text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2 text-sm">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
