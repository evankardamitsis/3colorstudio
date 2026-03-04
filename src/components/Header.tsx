"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import type { ProjectCategory } from "@/types/app";

const LOGO_SRC = "/3colorstudiologowhitetrimmed.svg";
const BURGER_ICON_SRC = "/burger_icon.svg";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 16l16 16M32 16L16 32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface HeaderProps {
  /** Project categories from Contentful (for Projects submenu links). */
  projectCategories?: ProjectCategory[];
}

export function Header({ projectCategories = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibilityHidden, setVisibilityHidden] = useState(true);

  const projectSublinks = projectCategories.map((c) => ({
    label: c.title.toUpperCase(),
    href: `/projects/category/${c.slug}`,
  }));

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const t = setTimeout(() => setVisibilityHidden(true), 400);
      return () => clearTimeout(t);
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-101 flex w-full items-center justify-between px-4 sm:px-[10%] py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
            aria-label={`${siteConfig.name} — Home`}
          >
            <Image
              src={LOGO_SRC}
              alt=""
              width={140}
              height={64}
              className="h-8 w-auto sm:h-12"
            />
          </Link>
          <p className="font-body text-[10px] sm:text-[12px] font-medium uppercase tracking-wider text-cream shrink-0 md:ml-24">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={() => {
              if (isMenuOpen) {
                setIsMenuOpen(false);
              } else {
                setVisibilityHidden(false);
                setIsMenuOpen(true);
              }
            }}
            className="group flex items-center gap-2 sm:gap-3 font-body text-xs sm:text-sm font-medium uppercase tracking-wider text-cream transition-all duration-150 hover:text-[#E72F4E] focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative h-9 w-9 sm:h-12 sm:w-12 shrink-0">
              {isMenuOpen ? (
                <CloseIcon className="h-full w-full text-cream transition-opacity duration-200 group-hover:opacity-80" />
              ) : (
                <Image
                  src={BURGER_ICON_SRC}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full transition-opacity duration-200 group-hover:opacity-80"
                  aria-hidden
                />
              )}
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay — cross dissolve */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={visibilityHidden}
        className="fixed inset-0 z-100 flex min-h-dvh flex-col bg-[#E72F4E] text-white transition-opacity duration-400 ease-out"
        style={{
          visibility: visibilityHidden ? "hidden" : "visible",
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
      >
        {/* Center: Main nav (vertically centered on full viewport) */}
        <div className="flex min-h-0 flex-1 flex-col justify-center px-[10%]">
          <nav className="flex flex-col gap-4 md:gap-6 lg:gap-8" aria-label="Main navigation">
            {/* Projects + sub */}
            <div>
              <div className="flex items-center gap-3">
                <Link
                  href="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block font-heading text-[56px] text-white transition-all duration-150 ease-out hover:opacity-90 hover:underline hover:underline-offset-2 hover:decoration-1"
                >
                  Projects
                </Link>
                <span className="h-px w-8 bg-white shrink-0" aria-hidden />
              </div>
              <ul className="mt-3 flex flex-col gap-2 pl-2 md:mt-4">
                {projectSublinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-block font-body text-[24px] font-medium uppercase tracking-wider text-white transition-all duration-150 ease-out hover:opacity-90 hover:underline hover:underline-offset-2 hover:decoration-1"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/#what-we-do"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block font-heading text-[56px] text-white transition-all duration-150 ease-out hover:opacity-90 hover:underline hover:underline-offset-2 hover:decoration-1"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block font-heading text-[56px] text-white transition-all duration-150 ease-out hover:opacity-90 hover:underline hover:underline-offset-2 hover:decoration-1"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom left: Logo + (Follow… + social below) */}
        <div className="absolute bottom-0 left-0 right-0 flex shrink-0 flex-wrap items-end gap-4 px-[10%] py-4 md:py-8 lg:py-10">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="inline-block w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#E72F4E] rounded"
            aria-label={`${siteConfig.name} — Home`}
          >
            <Image
              src={LOGO_SRC}
              alt=""
              width={140}
              height={64}
              className="h-10 w-auto md:h-12"
            />
          </Link>
          <div className="flex flex-col gap-2">
            <p className="font-body text-[12px] font-medium uppercase tracking-wider text-white">
              Follow 3.colorstudio
            </p>
            <div className="flex items-center gap-4">
              {siteConfig.links.instagram && siteConfig.links.instagram !== "#" && (
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#E72F4E] rounded"
                  aria-label="Instagram"
                >
                  <Image src="/instagram.svg" alt="" width={24} height={24} className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
