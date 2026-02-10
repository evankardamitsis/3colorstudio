import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Link
              href="/"
              className="font-heading text-lg font-normal text-neutral-900 dark:text-white"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {siteConfig.links.instagram !== "#" && (
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Instagram
              </a>
            )}
            {siteConfig.links.behance !== "#" && (
              <a
                href={siteConfig.links.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Behance
              </a>
            )}
            {siteConfig.links.linkedin !== "#" && (
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
