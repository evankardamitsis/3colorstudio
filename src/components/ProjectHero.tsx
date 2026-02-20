"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { StaggerOnMount, StaggerOnMountItem, FadeInOnMount } from "@/components/animations";

interface ProjectHeroProps {
  categoryTitle: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaText?: string;
  ctaLink?: string;
}

const HERO_EMAIL = "hello@3colorstudio.com";

export function ProjectHero({
  categoryTitle,
  subtitle = "A FILM PRODUCTION AGENCY DEDICATED TO HOTEL BRANDS",
  backgroundImage,
  backgroundVideo,
  ctaText = "SEE THE PROJECTS",
  ctaLink = "#",
}: ProjectHeroProps) {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden"
      aria-label={`${categoryTitle} projects`}
    >
      {/* Background image or video */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {backgroundVideo ? (
          <video
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-center"
            aria-hidden
          />
        ) : (
          backgroundImage && (
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          )
        )}
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-1 bg-black/40" aria-hidden />

      {/* Left: vertical email text */}
      <div className="hero-side-info-left fixed bottom-24 left-[10%] z-10">
        <a
          href={`mailto:${HERO_EMAIL}`}
          className="block origin-left -rotate-90 whitespace-nowrap font-body text-[10px] font-medium uppercase tracking-widest text-cream/90 transition-colors duration-150 hover:text-[#E72F4E]"
        >
          Email us at {HERO_EMAIL}
        </a>
      </div>

      {/* Right: vertical follow text + social icons */}
      <div className="hero-side-info-right group fixed bottom-24 right-[10%] z-20 flex-col items-end gap-2">
        <span className="block origin-right rotate-90 whitespace-nowrap font-body text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-colors duration-150 hover:text-[#E72F4E] group-hover:text-[#E72F4E]">
          FOLLOW 3.COLORSTUDIO
        </span>
        <div className="flex flex-col items-end gap-2 mr-[-8px]">
          {siteConfig.links.instagram && siteConfig.links.instagram !== "#" && (
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer transition-all duration-150 hover:filter-[brightness(0)_saturate(100%)_invert(27%)_sepia(95%)_saturate(1352%)_hue-rotate(330deg)_brightness(95%)_contrast(90%)]"
              aria-label="Instagram"
            >
              <Image
                src="/instagram.svg"
                alt=""
                width={24}
                height={24}
                className="h-4 w-4 block"
                aria-hidden
              />
            </a>
          )}
          {siteConfig.links.facebook && siteConfig.links.facebook !== "#" && (
            <a
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer transition-all duration-150 hover:filter-[brightness(0)_saturate(100%)_invert(27%)_sepia(95%)_saturate(1352%)_hue-rotate(330deg)_brightness(95%)_contrast(90%)]"
              aria-label="Facebook"
            >
              <Image
                src="/facebook.svg"
                alt=""
                width={24}
                height={24}
                className="h-4 w-4 block"
                aria-hidden
              />
            </a>
          )}
        </div>
      </div>

      {/* Center column: main content */}
      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden px-4 sm:px-[10%] pt-0">
        {/* Middle: category title + subtitle */}
        <div className="flex flex-1 flex-col items-center justify-center min-w-0">
          <StaggerOnMount className="w-full max-w-4xl min-w-0 px-1 text-center" staggerDelay={0.12}>
            <StaggerOnMountItem>
            <h1 className="font-heading text-5xl leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              {categoryTitle}
            </h1>
            </StaggerOnMountItem>
            <StaggerOnMountItem>
            <p className="mt-6 font-body text-xs font-medium uppercase tracking-[0.2em] text-white sm:text-sm">
              {subtitle}
            </p>
            </StaggerOnMountItem>
          </StaggerOnMount>
        </div>

        {/* Bottom: CTA */}
        <FadeInOnMount delay={0.4} className="flex flex-col items-center pb-12">
          <Link
            href={ctaLink}
            className="group flex flex-col items-center gap-3 transition-all duration-300 hover:opacity-90 hover:translate-y-[-2px] active:translate-y-0"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white shrink-0" aria-hidden />
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-white transition-colors duration-150 group-hover:text-[#E72F4E]">
                {ctaText}
              </span>
              <span className="h-px w-8 bg-white shrink-0" aria-hidden />
            </div>
          </Link>
        </FadeInOnMount>
      </div>
    </section>
  );
}
