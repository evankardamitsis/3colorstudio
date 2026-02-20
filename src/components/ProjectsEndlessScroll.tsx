"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectDisplay } from "./ProjectDisplay";
import { FadeInUp } from "./animations";

interface Project {
  id: string;
  title: string;
  description: string;
  featuredImage?: string;
  featuredVideo?: string;
  reels: Array<{ src: string; alt: string }>;
}

interface ProjectsEndlessScrollProps {
  allProjects: Project[];
  itemsPerPage?: number;
}

export function ProjectsEndlessScroll({
  allProjects,
  itemsPerPage = 1,
}: ProjectsEndlessScrollProps) {
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>(
    allProjects.slice(0, itemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(allProjects.length / itemsPerPage);
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          // Simulate API delay
          setTimeout(() => {
            const nextPage = currentPage + 1;
            const startIndex = nextPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const newProjects = allProjects.slice(startIndex, endIndex);

            if (newProjects.length > 0) {
              setDisplayedProjects((prev) => [...prev, ...newProjects]);
              setCurrentPage(nextPage);
            }
            setLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [currentPage, hasMore, loading, allProjects, itemsPerPage]);

  return (
    <>
      {displayedProjects.map((project, index) => (
        <FadeInUp key={project.id} delay={index === 0 ? 0 : 0.05}>
        <div>
          <ProjectDisplay
            title={project.title}
            description={project.description}
            featuredImage={project.featuredImage}
            featuredVideo={project.featuredVideo}
            reels={project.reels}
          />
          {index < displayedProjects.length - 1 && (
            <div className="w-full border-t border-[#3D3D3D]" />
          )}
        </div>
        </FadeInUp>
      ))}
      {hasMore && (
        <div ref={observerTarget} className="h-20 w-full" aria-hidden>
          {loading && (
            <p className="text-center text-white/60 font-body py-8">
              Loading more projects...
            </p>
          )}
        </div>
      )}
    </>
  );
}
