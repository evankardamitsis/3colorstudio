import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur supports-backdrop-filter:bg-white/80 dark:supports-backdrop-filter:bg-neutral-950/80">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-18 items-center justify-between">
          <Link
            href="/"
            className="font-heading text-xl font-normal tracking-tight text-neutral-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            {siteConfig.name}
          </Link>
          <nav className="flex items-center gap-6 md:gap-8" aria-label="Main">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
