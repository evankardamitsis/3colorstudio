"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const LOGO_SRC = "/3colorstudiologowhitetrimmed.svg";
const BURGER_ICON_SRC = "/burger_icon.svg";

const PROJECT_SUBLINKS = [
  { label: "LIFESTYLE & CONTENT", href: "/projects#lifestyle" },
  { label: "CULINARY & BARS", href: "/projects#culinary" },
  { label: "BRAND VIDEO", href: "/projects#brand-video" },
  { label: "EVENTS", href: "/projects#events" },
] as const;

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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibilityHidden, setVisibilityHidden] = useState(true);

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
      <header className="fixed top-6 left-0 right-0 z-50 flex w-full items-center justify-between px-4 sm:px-[10%] py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
            aria-label={`${siteConfig.name} — Home`}
          >
            <Image
              src={LOGO_SRC}
              alt=""
              width={108}
              height={49}
              className="h-8 w-auto sm:h-9"
            />
          </Link>
          <p className="font-body text-[10px] sm:text-[12px] font-medium uppercase tracking-wider text-cream shrink-0 md:ml-24">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="flex shrink-0 items-center mr-6 sm:mr-0">
          <button
            type="button"
            onClick={() => {
              setVisibilityHidden(false);
              setIsMenuOpen(true);
            }}
            className="group flex items-center gap-2 font-body text-xs font-medium uppercase tracking-wider text-cream transition-all duration-150 hover:text-[#E72F4E] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <span className="transition-all duration-150 ease-out group-hover:translate-x-0.5">Menu</span>
            <div className="h-9 w-9 shrink-0 transition-all duration-150 ease-out group-hover:scale-110 group-active:scale-95">
              <Image
                src={BURGER_ICON_SRC}
                alt=""
                width={48}
                height={48}
                className="h-full w-full transition-all duration-150 group-hover:filter-[brightness(0)_saturate(100%)_invert(27%)_sepia(95%)_saturate(1352%)_hue-rotate(330deg)_brightness(95%)_contrast(90%)]"
                aria-hidden
              />
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={visibilityHidden}
        className="fixed inset-0 z-100 flex flex-col bg-[#E72F4E] text-white transition-[transform] duration-400 ease-out"
        style={{
          visibility: visibilityHidden ? "hidden" : "visible",
          transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
      >
        {/* Top right: Close */}
        <div className="flex shrink-0 items-center justify-end px-[10%] py-6 md:py-8">
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="group flex items-center gap-2 font-body text-[12px] font-medium uppercase tracking-wider text-white transition-all duration-150 hover:opacity-100 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#E72F4E] rounded"
            aria-label="Close menu"
          >
            <span className="transition-transform duration-150 ease-out group-hover:-translate-x-0.5">Close</span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-150 ease-out group-hover:scale-110 group-hover:rotate-90 group-active:scale-95">
              <CloseIcon className="h-full w-full" />
            </span>
          </button>
        </div>

        {/* Center: Main nav (left-aligned) */}
        <div className="flex flex-col justify-start px-[10%] md:flex-1">
          <nav className="flex flex-col gap-4 md:gap-6 lg:gap-8" aria-label="Main navigation">
            {/* Projects + sub */}
            <div>
              <div className="flex items-center gap-3">
                <Link
                  href="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block font-heading text-[56px] text-white transition-all duration-150 ease-out hover:translate-x-1 hover:opacity-90 hover:underline hover:underline-offset-2 hover:decoration-1"
                >
                  Projects
                </Link>
                <span className="h-px w-8 bg-white shrink-0" aria-hidden />
              </div>
              <ul className="mt-3 flex flex-col gap-2 pl-2 md:mt-4">
                {PROJECT_SUBLINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-block font-body text-[24px] font-medium uppercase tracking-wider text-white transition-all duration-150 ease-out hover:translate-x-1 hover:opacity-90 hover:underline hover:underline-offset-2 hover:decoration-1"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block font-heading text-[56px] text-white transition-all duration-150 ease-out hover:translate-x-1 hover:opacity-90 hover:underline hover:underline-offset-2 hover:decoration-1"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block font-heading text-[56px] text-white transition-all duration-150 ease-out hover:translate-x-1 hover:opacity-90 hover:underline hover:underline-offset-2 hover:decoration-1"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom left: Logo + (Follow… + social below) */}
        <div className="flex shrink-0 flex-wrap items-end gap-4 px-[10%] mt-32 py-4 md:mt-0 md:py-8 lg:py-10">
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
              {siteConfig.links.facebook && siteConfig.links.facebook !== "#" && (
                <a
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#E72F4E] rounded"
                  aria-label="Facebook"
                >
                  <Image src="/facebook.svg" alt="" width={24} height={24} className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
