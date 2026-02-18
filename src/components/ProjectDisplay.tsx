"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
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
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // Two copies for seamless infinite loop (no duplicate of last item)
  const reelsLoop = reels.length > 0 ? [...reels, ...reels] : [];
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
    if (!el || reels.length === 0) return;
    
    const firstReel = el.querySelector<HTMLElement>("[data-reel]");
    if (!firstReel) return;
    const inner = el.firstElementChild as HTMLElement;
    if (!inner) return;
    const computedStyle = window.getComputedStyle(inner);
    const gap = parseFloat(computedStyle.gap) || 8;
    const itemWidth = firstReel.getBoundingClientRect().width;
    singleSetWidth.current = reels.length * itemWidth + (reels.length - 1) * gap;
    
    el.scrollLeft = 0;
  }, [reels.length]);

  // Infinite scroll loop handler (2 copies): wrap to first reel at right end, last reel at left end
  useEffect(() => {
    const el = galleryRef.current;
    if (!el || reels.length === 0) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const scrollLeft = el.scrollLeft;
        const singleSet = singleSetWidth.current;
        const maxScroll = el.scrollWidth - el.clientWidth;
        
        if (singleSet === 0) return;
        
        // At the right end: jump to start so we show the first reel (no double last)
        if (scrollLeft >= maxScroll - 1) {
          el.scrollLeft = 0;
        }
        // At the left end: jump to end so we show the last reel
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
  }, [reels.length]);

  const scroll = (dir: "left" | "right") => {
    const el = galleryRef.current;
    if (!el || reels.length === 0) return;

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
    <section className="w-full bg-black py-16 md:py-24 lg:py-32 overflow-x-hidden">
      <div className="mx-auto w-full px-4 sm:px-[10%]">
        {/* Project title */}
        <h2 className="mb-6 text-center font-heading text-[32px] font-normal text-white">
          {title}
        </h2>

        {/* Project description */}
        <p className="mx-auto mb-12 max-w-5xl text-center font-body text-[14px] uppercase leading-relaxed text-white">
          {description}
        </p>

        {/* Featured image or video */}
        {(featuredImage || featuredVideo) && (
          <div className="relative mb-12 aspect-21/9 w-full overflow-hidden rounded-lg">
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

        {/* Project reels - full-bleed to the right edge of screen */}
        {reels.length > 0 && (
          <>
            <div className="relative z-0 w-screen left-1/2 -translate-x-1/2">
              <div
                ref={galleryRef}
                className="pl-4 sm:pl-[10%] pr-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex w-max min-w-full snap-x snap-mandatory gap-2 lg:gap-3">
                  {reelsLoop.map((reel, i) => {
                    const isVideo = /\.(mp4|webm|mov|avi|mkv)$/i.test(reel.src);
                    return (
                      <div
                        key={i}
                        data-reel
                        className="relative min-h-[360px] min-w-[200px] shrink-0 snap-start cursor-pointer sm:min-h-[420px] sm:min-w-[240px] md:min-h-[500px] md:min-w-[280px] lg:min-h-[560px] lg:w-[340px] transition-opacity duration-200 hover:opacity-90"
                        onClick={(e) => {
                          // Prevent lightbox from opening if user was dragging
                          if (isDragging) {
                            e.preventDefault();
                            return;
                          }
                          setLightboxIndex(i % reels.length);
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
                            src={reel.src}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            loop
                            preload="metadata"
                            aria-label={reel.alt}
                          />
                        ) : (
                          <Image
                            src={reel.src}
                            alt={reel.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 280px, 340px"
                            unoptimized={reel.src.startsWith("https://placehold.co")}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Nav arrows: below reels, right-aligned to content (z-30 above hero side info z-20) */}
            <div className="relative z-30 mt-4 flex w-full justify-end sm:mt-5 md:mt-6">
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
          </>
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
