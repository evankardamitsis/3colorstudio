"use client";

import Image from "next/image";
import { useRef } from "react";

const DEFAULT_GALLERY = [
  { src: "https://placehold.co/280x700/1a1a1a/333?text=1", alt: "Hotel and pool" },
  { src: "https://placehold.co/280x700/1a1a1a/333?text=2", alt: "Dining" },
  { src: "https://placehold.co/280x700/1a1a1a/333?text=3", alt: "Experience" },
  { src: "https://placehold.co/280x700/1a1a1a/333?text=4", alt: "Resort" },
  { src: "https://placehold.co/280x700/1a1a1a/333?text=5", alt: "Lifestyle" },
  { src: "https://placehold.co/280x700/1a1a1a/333?text=6", alt: "Brand" },
];

export interface WhatWeDoProps {
  /** Optional gallery images (src, alt). Defaults to placeholders. */
  images?: Array<{ src: string; alt: string }>;
}

export function WhatWeDo({ images = DEFAULT_GALLERY }: WhatWeDoProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

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
      const gap = parseFloat(computedStyle.gap) || 8; // Default to 8px if gap not found
      const reelWidth = firstReel.getBoundingClientRect().width + gap;
      const step = dir === "left" ? -reelWidth : reelWidth;
      el.scrollBy({ left: step, behavior: "smooth" });
    }
    // No need to update scroll state since we removed disabled states
  };

  return (
    <section
      className="relative w-full bg-black py-16 md:py-24 lg:py-28"
      aria-label="What we do"
    >
      <div className="mx-auto w-full max-w-[1600px] px-[10%]">
        <div className="flex flex-col items-center">
          {/* Descriptive text */}
          <p className="max-w-4xl text-center font-body text-sm uppercase leading-relaxed text-white md:text-base">
            We produce and shoot{" "}
            <em className="font-body font-medium not-italic text-white">
              compelling narratives
            </em>{" "}
            that bring hotel brands to life. Filming captivating visuals we
            showcase the authenticity of a hotel experience, elevate the brand
            identity and engage with the guests. By fusing{" "}
            <em className="font-body font-medium not-italic text-white">
              imaginative inspiration
            </em>{" "}
            with a vision for the future, we produce striking and enduring
            visual tales.
          </p>

          {/* Reels: full width to match arrow position, constrained to 4 reels on large screens */}
          <div className="relative mt-10 w-full">
            <div
              ref={galleryRef}
              className="flex w-full snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-auto lg:max-w-[996px] lg:gap-3"
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  data-reel
                  className="relative min-h-[280px] min-w-[140px] shrink-0 snap-start sm:min-h-[320px] sm:min-w-[160px] md:min-h-[380px] md:min-w-[200px] lg:min-h-[450px] lg:min-w-[240px]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Nav arrows: below reels, right-aligned, matching gallery width on large screens */}
            <div className="mt-4 flex w-full justify-end sm:mt-5 md:mt-6 lg:mx-auto lg:max-w-[996px]">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  className="cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white text-white transition-opacity hover:opacity-90 sm:h-10 sm:w-10"
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
                  className="cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white text-white transition-opacity hover:opacity-90 sm:h-10 sm:w-10"
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
        </div>
      </div>
    </section>
  );
}
