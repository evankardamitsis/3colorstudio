"use client";

import { FadeIn } from "@/components/animations";

export function ProjectsHomeMarquee() {
  const marqueeText = "OUR PROJECTS OUR PROJECTS OUR PROJECTS";

  return (
    <FadeIn>
    <section className="relative w-full h-[1080px] min-h-[700px] overflow-hidden lg:h-[1200px]">
      <div className="absolute inset-0 z-0">
        <video
          src="/projects_home_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex h-full items-end pb-20 md:pb-32">
        <div className="w-full overflow-x-hidden overflow-y-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee">
            <span
              className="projects-marquee-text inline-block px-8"
            >
              {marqueeText}
            </span>
            <span
              className="projects-marquee-text inline-block px-8"
            >
              {marqueeText}
            </span>
          </div>
        </div>
      </div>
    </section>
    </FadeIn>
  );
}
