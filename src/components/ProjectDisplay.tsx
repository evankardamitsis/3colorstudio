"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Lightbox } from "./Lightbox";

interface ProjectDisplayProps {
  title: string;
  description: string;
  featuredImage?: string;
  featuredVideo?: string;
  reels: Array<{ src: string; alt: string }>;
}

export function ProjectDisplay({
  title,
  description,
  featuredImage,
  featuredVideo,
  reels,
}: ProjectDisplayProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const scroll = (dir: "left" | "right") => {
    const el = galleryRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const atStart = el.scrollLeft <= 1;
    const atEnd = el.scrollLeft >= maxScroll - 1;

    if (dir === "right" && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir === "left" && atStart) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      const firstReel = el.querySelector<HTMLElement>("[data-reel]");
      if (!firstReel) return;
      const computedStyle = window.getComputedStyle(el);
      const gap = parseFloat(computedStyle.gap) || 8;
      const reelWidth = firstReel.getBoundingClientRect().width + gap;
      const step = dir === "left" ? -reelWidth : reelWidth;
      el.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-black py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-[10%]">
        {/* Project title */}
        <h2 className="mb-6 text-center font-heading text-[32px] font-normal text-white">
          {title}
        </h2>

        {/* Project description */}
        <p className="mx-auto mb-12 max-w-4xl text-center font-body text-[14px] uppercase leading-relaxed text-white">
          {description}
        </p>

        {/* Featured image or video */}
        {(featuredImage || featuredVideo) && (
          <div className="relative mb-12 aspect-4/3 w-full overflow-hidden rounded-lg">
            {featuredVideo ? (
              <video
                src={featuredVideo}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
                aria-hidden
              />
            ) : (
              featuredImage && (
                <Image
                  src={featuredImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 80rem"
                  priority
                />
              )
            )}
          </div>
        )}

        {/* Project reels */}
        {reels.length > 0 && (
          <div className="relative w-full">
            <div
              ref={galleryRef}
              className="flex w-full snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-3"
            >
              {reels.map((reel, i) => (
                <div
                  key={i}
                  data-reel
                  className="relative min-h-[280px] min-w-[140px] shrink-0 snap-start cursor-pointer sm:min-h-[320px] sm:min-w-[160px] md:min-h-[380px] md:min-w-[200px] lg:min-h-[450px] lg:w-[calc((100%-4*12px)/5)] transition-opacity duration-200 hover:opacity-90"
                  onClick={() => {
                    setLightboxIndex(i);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={reel.src}
                    alt={reel.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 200px, calc((100vw - 20%) / 5)"
                    unoptimized={reel.src.startsWith("https://placehold.co")}
                  />
                </div>
              ))}
            </div>

            {/* Nav arrows: below reels, right-aligned */}
            <div className="mt-4 flex w-full justify-end sm:mt-5 md:mt-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  className="group cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white text-white transition-all duration-150 hover:border-[#E72F4E] hover:text-[#E72F4E] sm:h-10 sm:w-10"
                  aria-label="Previous reel"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  className="group cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white text-white transition-all duration-150 hover:border-[#E72F4E] hover:text-[#E72F4E] sm:h-10 sm:w-10"
                  aria-label="Next reel"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={reels.map((reel) => ({
          src: reel.src,
          alt: reel.alt,
        }))}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </section>
  );
}
