"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const LOGO_SRC = "/3colorstudiologowhitetrimmed.svg";
const BURGER_ICON_SRC = "/burger_icon.svg";

function MenuButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-wider text-cream hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
      aria-label="Open menu"
      aria-expanded={false}
    >
      <span>Menu</span>
      <Image
        src={BURGER_ICON_SRC}
        alt=""
        width={48}
        height={48}
        className="h-9 w-9 shrink-0"
        aria-hidden
      />
    </button>
  );
}

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex w-full items-center justify-between px-[10%] py-4">
      {/* Left: logo + tagline */}
      <div className="flex min-w-0 flex-1 items-center">
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
        <p className="ml-16 font-body text-[12px] font-medium uppercase tracking-wider text-cream shrink-0 md:ml-24">
          {siteConfig.tagline}
        </p>
      </div>

      {/* Right: menu */}
      <div className="flex shrink-0 items-center">
        <MenuButton />
      </div>
    </header>
  );
}
