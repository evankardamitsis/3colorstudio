"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const HERO_BG_SRC = "/demo_hero_bg.png";
const HERO_EMAIL = "hello@3colorstudio.com";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_BG_SRC}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Optional subtle overlay for text readability */}
      <div
        className="absolute inset-0 z-1 bg-black/20"
        aria-hidden
      />

      {/* Left: vertical email text — fixed towards bottom, 10% padding like header */}
      <div className="fixed bottom-24 left-[10%] z-10">
        <a
          href={`mailto:${HERO_EMAIL}`}
          className="block origin-left -rotate-90 whitespace-nowrap font-body text-[10px] font-medium uppercase tracking-widest text-cream/90 hover:text-cream transition-colors"
        >
          Email us at {HERO_EMAIL}
        </a>
      </div>

      {/* Right: vertical follow text + social icons — fixed towards bottom, icons smaller and aligned with text */}
      <div className="fixed bottom-24 right-[10%] z-20 flex flex-col items-end gap-2">
        <span className="block origin-right rotate-90 whitespace-nowrap font-body text-[10px] font-medium uppercase tracking-[0.25em] text-white">
          FOLLOW 3.COLORSTUDIO
        </span>
        <div className="flex flex-col items-end gap-2 mr-[-8px]">
          {siteConfig.links.instagram && siteConfig.links.instagram !== "#" ? (
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer hover:opacity-80 transition-opacity"
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
          ) : (
            <span className="inline-block h-4 w-4">
              <Image
                src="/instagram.svg"
                alt=""
                width={24}
                height={24}
                className="h-4 w-4 block"
                aria-hidden
              />
            </span>
          )}
          {siteConfig.links.facebook && siteConfig.links.facebook !== "#" ? (
            <a
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer hover:opacity-80 transition-opacity"
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
          ) : (
            <span className="inline-block h-4 w-4">
              <Image
                src="/facebook.svg"
                alt=""
                width={24}
                height={24}
                className="h-4 w-4 block"
                aria-hidden
              />
            </span>
          )}
        </div>
      </div>

      {/* Center column: middle content + bottom CTA */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-[10%] pt-0">
        {/* Middle: headline + description (per reference: serif left + sans right, indent line 2) */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-4xl">
            {/* Main headline: centered block, line 2 has relative indent */}
            <h1 className="mx-auto w-fit font-heading text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="flex items-baseline gap-4">
                <span className="text-cream">Crafting</span>
                <span className="font-body text-2xl font-medium uppercase tracking-wider text-white sm:text-3xl md:text-4xl">
                  Stories
                </span>
              </span>
              <span className="flex items-baseline gap-4 pl-12 sm:pl-16 md:pl-24">
                <span className="text-cream">Capturing</span>
                <span className="font-body text-2xl font-medium uppercase tracking-wider text-white sm:text-3xl md:text-4xl">
                  Content
                </span>
              </span>
            </h1>

            {/* Sub-headline: centered, white, small caps */}
            <p className="mt-8 text-center font-body text-xs font-medium uppercase tracking-[0.2em] text-white sm:text-sm">
              A film production agency dedicated to hotel brands
            </p>
          </div>
        </div>

        {/* Bottom: Explore More + icon */}
        <div className="flex flex-col items-center pb-12">
          <Link
            href="/projects"
            className="flex flex-col items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <span className="font-body text-[12px] font-medium uppercase tracking-widest text-cream">
              Explore More
            </span>
            <Image
              src="/explore_icon.svg"
              alt=""
              width={35}
              height={35}
              className="h-[35px] w-[35px]"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
