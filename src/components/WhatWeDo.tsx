"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Lightbox } from "./Lightbox";
import { FadeInUp, FadeIn } from "@/components/animations";

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

  // Detect centered item on mobile for scaling
  useEffect(() => {
    if (images.length === 0) return;
    const el = galleryRef.current;
    if (!el) return;

    const isMobile = () => window.innerWidth < 768;

    const updateCenteredItem = () => {
      if (!isMobile()) {
        setCenteredIndex(0);
        return;
      }
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

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateCenteredItem();
        rafId = null;
      });
    };
    const handleResize = () => updateCenteredItem();

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    updateCenteredItem();

    // Initial scroll on mobile: first item at left edge
    const setInitialScroll = () => {
      if (!isMobile()) return;
      const viewportWidth = window.innerWidth;
      const itemHalfWidth = 90; // 180px / 2
      const paddingLeft = viewportWidth / 2 - itemHalfWidth;
      el.scrollLeft = paddingLeft;
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setInitialScroll();
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [images.length]);

  // Autoplay centered video on mobile
  useEffect(() => {
    if (images.length === 0) return;
    const isMobile = () => window.innerWidth < 768;
    if (!isMobile()) return;

    const centeredReel = images[centeredIndex];
    const isVideo = centeredReel && /\.(mp4|webm|mov|avi|mkv)$/i.test(centeredReel.src);

    videoRefs.current.forEach((video, index) => {
      if (index === centeredIndex && isVideo) {
        video.play().catch(() => {
          // Ignore autoplay errors (e.g. user gesture required)
        });
      } else {
        video.pause();
      }
    });
  }, [centeredIndex, images]);

  const scroll = (dir: "left" | "right") => {
    const el = galleryRef.current;
    if (!el || images.length === 0) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const nextIndex = dir === "right"
        ? Math.min(centeredIndex + 1, images.length - 1)
        : Math.max(centeredIndex - 1, 0);
      const targetReel = reelRefs.current.get(nextIndex);
      if (!targetReel) return;
      const containerRect = el.getBoundingClientRect();
      const reelRect = targetReel.getBoundingClientRect();
      const targetScroll = el.scrollLeft + (reelRect.left - containerRect.left) - (containerRect.width / 2) + (reelRect.width / 2);
      el.scrollTo({ left: targetScroll, behavior: "smooth" });
    } else {
      const firstReel = el.querySelector<HTMLElement>("[data-reel]");
      if (!firstReel) return;
      const inner = el.firstElementChild as HTMLElement;
      const computedStyle = inner ? window.getComputedStyle(inner) : window.getComputedStyle(el);
      const gap = parseFloat(computedStyle.gap) || 8;
      const itemWidth = firstReel.getBoundingClientRect().width;
      const step = dir === "left" ? -(itemWidth + gap) : itemWidth + gap;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const target = Math.max(0, Math.min(maxScroll, el.scrollLeft + step));
      el.scrollTo({ left: target, behavior: "smooth" });
    }
  };

  return (
    <section
      id="what-we-do"
      className="relative w-full overflow-x-visible md:overflow-x-hidden bg-black py-16 md:py-24 lg:py-28"
      aria-labelledby="what-we-do-heading"
    >
      <div className="mx-auto w-full max-w-[1600px] px-[10%]">
        <div className="flex flex-col items-center">
          {/* Descriptive text */}
          <FadeInUp>
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
          </FadeInUp>

          {/* Reels: on mobile overflow evenly from both sides; vertical title on lg only */}
          <div className="relative mt-10 w-full overflow-visible">
            <div className="relative mx-auto w-full max-w-[288px] sm:max-w-[328px] md:max-w-[408px] lg:max-w-[996px] overflow-visible">
              {/* Vertical title: absolute, left of gallery, hidden below lg */}
              <FadeIn delay={0.15}>
                <h2
                  id="what-we-do-heading"
                  className="absolute right-full top-0 hidden min-h-[250px] items-center justify-end pr-4 font-heading font-normal text-cream origin-left -rotate-90 whitespace-nowrap text-5xl lg:flex"
                  style={{ width: "100px" }}
                >
                  <span className="text-[78px]">What</span>{" "}
                  <span className="ml-4 text-4xl font-body">WE</span>{" "}
                  <span className="ml-4 text-4xl font-body">DO</span>
                </h2>
              </FadeIn>

              {/* Mobile: full viewport width, centered, overflow evenly from both sides; desktop: constrained */}
              <div className="relative z-0 w-screen max-w-[100vw] left-1/2 -ml-[50vw] md:left-0 md:ml-0 md:w-full md:max-w-none">
                <div
                  ref={galleryRef}
                  className="flex w-full snap-x snap-mandatory gap-4 md:gap-2 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-3 cursor-grab active:cursor-grabbing touch-pan-x overscroll-x-contain"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex w-max min-w-full gap-4 md:gap-2 lg:gap-3 pl-[calc(50vw-90px)] sm:pl-[calc(50vw-100px)] md:pl-0 pr-[50vw] md:pr-0">
                    {images.map((img, i) => {
                      const isVideo = /\.(mp4|webm|mov|avi|mkv)$/i.test(img.src);
                      const isCentered = centeredIndex === i;
                      return (
                        <div
                          key={i}
                          ref={(el) => setReelRef(i, el)}
                          data-reel
                          className={`relative shrink-0 cursor-pointer transition-all duration-500 ease-out snap-center md:snap-start
                            h-[400px] w-[180px]
                            sm:h-[420px] sm:w-[200px]
                            md:h-[380px] md:min-w-[200px]
                            lg:h-[450px] lg:min-w-[240px]
                            ${isCentered ? "scale-[1.15] z-10 md:scale-100" : "scale-100 z-0 opacity-75 md:opacity-100"}
                            md:transition-opacity md:duration-200 hover:opacity-90`}
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
                              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 200px, 240px"
                              unoptimized
                            />
                          )}
                        </div>
                      );
                    })}
                    {/* Spacer so last reel can scroll into view on mobile */}
                    <div className="shrink-0 w-[calc(50vw-90px)] sm:w-[calc(50vw-100px)] md:hidden" aria-hidden />
                  </div>
                </div>
              </div>

              {/* Nav arrows: below reels, right-aligned */}
              <div className="mt-4 flex w-full justify-end sm:mt-5 md:mt-6">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => scroll("left")}
                    className="group cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white text-white transition-all duration-300 hover:border-[#E72F4E] hover:text-[#E72F4E] hover:scale-110 active:scale-95 sm:h-10 sm:w-10"
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
                    className="group cursor-pointer flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white text-white transition-all duration-300 hover:border-[#E72F4E] hover:text-[#E72F4E] hover:scale-110 active:scale-95 sm:h-10 sm:w-10"
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
