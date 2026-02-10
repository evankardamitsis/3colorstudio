import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/app";

interface ProjectGridProps {
  projects: Project[];
  /** Number of columns on large screens (default 3) */
  columns?: 2 | 3;
  /** Index of the first card to get priority image loading (e.g. 0 for first) */
  priorityIndex?: number;
}

export function ProjectGrid({
  projects,
  columns = 3,
  priorityIndex,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-neutral-500 dark:text-neutral-400 py-12 text-center">
        No projects yet.
      </p>
    );
  }

  const gridClass =
    columns === 2
      ? "grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12";

  return (
    <ul className={gridClass} role="list">
      {projects.map((project, i) => (
        <li key={project.id}>
          <ProjectCard
            project={project}
            priority={priorityIndex !== undefined && i === priorityIndex}
          />
        </li>
      ))}
    </ul>
  );
}
