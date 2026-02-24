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
  const reelRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [centeredIndex, setCenteredIndex] = useState(0);

  const setVideoRef = (index: number, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current.set(index, element);
    } else {
      videoRefs.current.delete(index);
    }
  };

  const setReelRef = (index: number, element: HTMLDivElement | null) => {
    if (element) {
      reelRefs.current.set(index, element);
    } else {
      reelRefs.current.delete(index);
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
    const maxScroll = el.scrollWidth - el.clientWidth;
    const newScrollLeft = Math.max(0, Math.min(maxScroll, scrollLeft - walk));
    el.scrollLeft = newScrollLeft;
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

  // Detect centered item on mobile for scaling animation
  useEffect(() => {
    if (reels.length === 0) return;
    const el = galleryRef.current;
    if (!el) return;

    const updateCenteredItem = () => {
      const container = el;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      reelRefs.current.forEach((reelEl, index) => {
        const reelRect = reelEl.getBoundingClientRect();
        const reelCenter = reelRect.left + reelRect.width / 2;
        const distance = Math.abs(containerCenter - reelCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCenteredIndex(closestIndex);
    };

    // Update on scroll with throttling
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateCenteredItem();
        rafId = null;
      });
    };

    // Update on resize
    const handleResize = () => {
      updateCenteredItem();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    // Set initial scroll position to show first item at left edge (accounting for padding)
    const setInitialScroll = () => {
      // Calculate padding based on screen size (same as CSS padding: calc(50vw - half_item_width))
      let itemHalfWidth = 100; // default mobile: 200px / 2
      if (window.innerWidth >= 1280) itemHalfWidth = 170; // xl: 340px / 2
      else if (window.innerWidth >= 1024) itemHalfWidth = 140; // lg: 280px / 2
      else if (window.innerWidth >= 768) itemHalfWidth = 120; // md: 240px / 2
      else if (window.innerWidth >= 640) itemHalfWidth = 110; // sm: 220px / 2
      
      const viewportWidth = window.innerWidth;
      const paddingLeft = (viewportWidth / 2) - itemHalfWidth;
      el.scrollLeft = paddingLeft;
    };
    
    // Wait for layout, then set initial scroll
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setInitialScroll();
        updateCenteredItem();
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [reels.length]);

  // Autoplay videos on mobile when they come into view
  useEffect(() => {
    if (reels.length === 0) return;

    // Wait for videos to be mounted
    const checkVideos = () => {
      const videos = Array.from(videoRefs.current.values());
      if (videos.length === 0) {
        // Retry after a short delay if videos aren't ready
        setTimeout(checkVideos, 100);
        return;
      }

      // Check if mobile (screen width < 768px)
      const isMobile = () => window.innerWidth < 768;

      const observers: IntersectionObserver[] = [];

      videos.forEach((video) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && isMobile()) {
                // Play video when visible on mobile
                video.play().catch(() => {
                  // Ignore autoplay errors (browser may block)
                });
              } else if (!entry.isIntersecting && isMobile()) {
                // Pause video when not visible on mobile
                video.pause();
              }
            });
          },
          {
            threshold: 0.5, // Play when 50% visible
          }
        );

        observer.observe(video);
        observers.push(observer);
      });

      return () => {
        observers.forEach((observer) => observer.disconnect());
      };
    };

    const cleanup = checkVideos();
    return cleanup;
  }, [reels.length]);

  const scroll = (dir: "left" | "right") => {
    const el = galleryRef.current;
    if (!el || reels.length === 0) return;

    // Scroll to center the next/previous item (all screen sizes)
    const nextIndex = dir === "right"
      ? Math.min(centeredIndex + 1, reels.length - 1)
      : Math.max(centeredIndex - 1, 0);

    const targetReel = reelRefs.current.get(nextIndex);
    if (!targetReel) return;

    const containerRect = el.getBoundingClientRect();
    const reelRect = targetReel.getBoundingClientRect();
    const scrollLeft = el.scrollLeft;
    const targetScroll = scrollLeft + (reelRect.left - containerRect.left) - (containerRect.width / 2) + (reelRect.width / 2);

    el.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-black py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full px-4 sm:px-6 md:px-[10%]">
        {/* Project title */}
        <h2 className="mb-4 sm:mb-6 text-center font-heading text-2xl sm:text-[28px] md:text-[32px] font-normal text-white px-2">
          {title}
        </h2>

        {/* Project description */}
        <p className="mx-auto mb-8 sm:mb-10 md:mb-12 max-w-5xl text-center font-body text-xs sm:text-[13px] md:text-[14px] uppercase leading-relaxed text-white px-2">
          {description}
        </p>

        {/* Featured image or video */}
        {(featuredImage || featuredVideo) && (
          <div className="relative mb-8 sm:mb-10 md:mb-12 w-full overflow-hidden rounded-lg aspect-video sm:aspect-21/9">
            {featuredVideo ? (
              <video
                src={`${featuredVideo}#t=0.001`}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80rem"
                  priority
                />
              )
            )}
          </div>
        )}

      </div>

      {/* Project reels - full viewport width, overflow from both sides on large screens */}
      {reels.length > 0 && (
        <>
          <div className="relative z-0 w-screen" style={{ marginLeft: "calc(-50vw + 50%)" }}>
              <div
                ref={galleryRef}
                className="overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing touch-pan-x overscroll-x-contain"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex w-max min-w-full snap-x snap-mandatory gap-4 sm:gap-4 md:gap-3 pl-[calc(50vw-100px)] sm:pl-[calc(50vw-110px)] md:pl-[calc(50vw-120px)] lg:pl-[calc(50vw-140px)] xl:pl-[calc(50vw-170px)] pr-[calc(50vw-100px)] sm:pr-[calc(50vw-110px)] md:pr-[calc(50vw-120px)] lg:pr-[calc(50vw-140px)] xl:pr-[calc(50vw-170px)]">
                  {reels.map((reel, i) => {
                    const isVideo = /\.(mp4|webm|mov|avi|mkv)$/i.test(reel.src);
                    const isCentered = centeredIndex === i;
                    return (
                      <div
                        key={i}
                        ref={(el) => setReelRef(i, el)}
                        data-reel
                        className={`relative shrink-0 cursor-pointer transition-all duration-500 ease-out snap-center
                          h-[400px] w-[200px]
                          sm:h-[420px] sm:w-[220px]
                          md:h-[420px] md:w-[240px]
                          lg:h-[500px] lg:w-[280px]
                          xl:h-[560px] xl:w-[340px]
                          ${isCentered ? 'scale-[1.15] z-10' : 'scale-100 z-0 opacity-80'}
                          hover:opacity-90`}
                        onClick={(e) => {
                          // Prevent lightbox from opening if user was dragging
                          if (isDragging) {
                            e.preventDefault();
                            return;
                          }
                          setLightboxIndex(i);
                          setLightboxOpen(true);
                        }}
                        onMouseEnter={() => {
                          // Only play on hover for desktop (md and up)
                          if (isVideo && window.innerWidth >= 768) {
                            const video = videoRefs.current.get(i);
                            if (video) {
                              video.play().catch(() => {
                                // Ignore autoplay errors
                              });
                            }
                          }
                        }}
                        onMouseLeave={() => {
                          // Only pause on hover leave for desktop (md and up)
                          if (isVideo && window.innerWidth >= 768) {
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
                            src={`${reel.src}#t=0.001`}
                            className="h-full w-full object-cover rounded-sm"
                            muted
                            playsInline
                            loop
                            preload="auto"
                            aria-label={reel.alt}
                          />
                        ) : (
                          <Image
                            src={reel.src}
                            alt={reel.alt}
                            fill
                            className="object-cover rounded-sm"
                            sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, (max-width: 1024px) 240px, (max-width: 1280px) 280px, 340px"
                            unoptimized={reel.src.startsWith("https://placehold.co")}
                          />
                        )}
                      </div>
                    );
                  })}
                  {/* Spacer so last reel can scroll into view on mobile */}
                  <div className="shrink-0 w-[calc(50vw-100px)] sm:w-[calc(50vw-110px)] md:hidden" aria-hidden />
                </div>
              </div>
            </div>

            {/* Nav arrows: below reels, right-aligned to match content padding */}
            <div className="relative z-30 mt-4 sm:mt-5 md:mt-6 flex w-full justify-end px-4 sm:px-6 md:px-[10%]">
              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  className="group cursor-pointer flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-white text-white transition-colors duration-300 hover:border-[#E72F4E] hover:text-[#E72F4E]"
                  aria-label="Previous reel"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-[14px] sm:h-[14px]"
                    aria-hidden
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  className="group cursor-pointer flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-white text-white transition-colors duration-300 hover:border-[#E72F4E] hover:text-[#E72F4E]"
                  aria-label="Next reel"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-[14px] sm:h-[14px]"
                    aria-hidden
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

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
