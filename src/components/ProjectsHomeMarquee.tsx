"use client";

import Image from "next/image";

export function ProjectsHomeMarquee() {
  const marqueeText = "OUR PROJECTS OUR PROJECTS OUR PROJECTS";

  return (
    <section className="relative w-full h-[1080px] min-h-[700px] overflow-hidden lg:h-[1200px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/projects_marquee_placeholder.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex h-full items-end pb-20 md:pb-32">
        <div className="w-full overflow-x-hidden overflow-y-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee">
            <span
              className="marquee-text inline-block px-8 py-12"
            >
              {marqueeText}
            </span>
            <span
              className="marquee-text inline-block px-8 py-12"
            >
              {marqueeText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
