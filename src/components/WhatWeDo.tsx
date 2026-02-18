"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Lightbox } from "./Lightbox";

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
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // Two copies for seamless infinite loop (no duplicate of last item)
  const imagesLoop = images.length > 0 ? [...images, ...images] : [];
  const singleSetWidth = useRef<number>(0);

  const setVideoRef = (index: number, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current.set(index, element);
    } else {
      videoRefs.current.delete(index);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = galleryRef.current;
    if (!el) return;
    setIsDragging(true);
    const rect = el.getBoundingClientRect();
    setStartX(e.pageX - rect.left);
    setScrollLeft(el.scrollLeft);
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = galleryRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const el = galleryRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    const el = galleryRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
  };

  // Calculate exact width of one set (n items + (n-1) gaps between them)
  useEffect(() => {
    const el = galleryRef.current;
    if (!el || images.length === 0) return;
    
    const firstReel = el.querySelector<HTMLElement>("[data-reel]");
    if (!firstReel) return;
    const inner = el.firstElementChild as HTMLElement;
    if (!inner) return;
    const computedStyle = window.getComputedStyle(inner);
    const gap = parseFloat(computedStyle.gap) || 8;
    const itemWidth = firstReel.getBoundingClientRect().width;
    singleSetWidth.current = images.length * itemWidth + (images.length - 1) * gap;
    
    el.scrollLeft = 0;
  }, [images.length]);

  // Infinite scroll loop handler (2 copies): wrap to first at right end, last at left end
  useEffect(() => {
    const el = galleryRef.current;
    if (!el || images.length === 0) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const scrollLeft = el.scrollLeft;
        const singleSet = singleSetWidth.current;
        const maxScroll = el.scrollWidth - el.clientWidth;
        
        if (singleSet === 0) return;
        
        // At the right end: jump to start so we show the first item (no double last)
        if (scrollLeft >= maxScroll - 1) {
          el.scrollLeft = 0;
        }
        // At the left end: jump to end so we show the last item
        else if (scrollLeft <= 1) {
          el.scrollLeft = maxScroll;
        }
      });
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [images.length]);

  const scroll = (dir: "left" | "right") => {
    const el = galleryRef.current;
    if (!el || images.length === 0) return;

    const firstReel = el.querySelector<HTMLElement>("[data-reel]");
    if (!firstReel) return;
    const inner = el.firstElementChild as HTMLElement;
    const computedStyle = inner ? window.getComputedStyle(inner) : window.getComputedStyle(el);
    const gap = parseFloat(computedStyle.gap) || 8;
    const itemWidth = firstReel.getBoundingClientRect().width;
    const step = dir === "left" ? -(itemWidth + gap) : itemWidth + gap;

    el.scrollBy({ left: step, behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full overflow-x-hidden bg-black py-16 md:py-24 lg:py-28"
      aria-labelledby="what-we-do-heading"
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

          {/* Reels: gallery centered; vertical title absolutely to the left on lg only */}
          <div className="relative mt-10 w-full">
            <div className="relative mx-auto w-full max-w-[288px] sm:max-w-[328px] md:max-w-[408px] lg:max-w-[996px]">
              {/* Vertical title: absolute, left of gallery, hidden below lg */}
              <h2
                id="what-we-do-heading"
                className="absolute right-full top-0 hidden min-h-[250px] items-center justify-end pr-4 font-heading font-normal text-cream origin-left -rotate-90 whitespace-nowrap text-5xl lg:flex"
                style={{ width: "100px" }}
              >
                <span className="text-[78px]">What</span>{" "}
                <span className="ml-4 text-4xl">WE</span>{" "}
                <span className="ml-4 text-4xl">DO</span>
              </h2>

              <div
                ref={galleryRef}
                className="flex w-full snap-x snap-mandatory gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-3 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {imagesLoop.map((img, i) => {
                  const isVideo = /\.(mp4|webm|mov|avi|mkv)$/i.test(img.src);
                  return (
                    <div
                      key={i}
                      data-reel
                      className="relative min-h-[280px] min-w-[140px] shrink-0 snap-start cursor-pointer sm:min-h-[320px] sm:min-w-[160px] md:min-h-[380px] md:min-w-[200px] lg:min-h-[450px] lg:min-w-[240px] transition-opacity duration-200 hover:opacity-90"
                      onClick={(e) => {
                        // Prevent lightbox from opening if user was dragging
                        if (isDragging) {
                          e.preventDefault();
                          return;
                        }
                        setLightboxIndex(i % images.length);
                        setLightboxOpen(true);
                      }}
                      onMouseEnter={() => {
                        if (isVideo) {
                          const video = videoRefs.current.get(i);
                          if (video) {
                            video.play().catch(() => {
                              // Ignore autoplay errors
                            });
                          }
                        }
                      }}
                      onMouseLeave={() => {
                        if (isVideo) {
                          const video = videoRefs.current.get(i);
                          if (video) {
                            video.pause();
                          }
                        }
                      }}
                    >
                      {isVideo ? (
                        <video
                          ref={(el) => setVideoRef(i, el)}
                          src={img.src}
                          className="h-full w-full object-cover"
                          muted
                          playsInline
                          loop
                          preload="metadata"
                          aria-label={img.alt}
                        />
                      ) : (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
                          unoptimized
                        />
                      )}
                    </div>
                  );
                })}
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
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={images.map((img) => ({
          src: img.src,
          alt: img.alt,
        }))}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </section>
  );
}
