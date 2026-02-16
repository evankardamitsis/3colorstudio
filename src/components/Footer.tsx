import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const LOGO_SRC = "/3colorstudiologowhitetrimmed.svg";
const CONTACT_EMAIL = "hello@3colorstudio.com";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black py-10 sm:py-12 md:py-16">
      <div className="w-full px-5 sm:px-[10%]">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:flex-wrap md:items-center md:gap-8 md:text-left lg:justify-between lg:gap-12 lg:text-left text-white">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded md:justify-start"
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
          </div>

          {/* Email */}
          <div className="w-full md:flex-1 md:min-w-[180px] md:text-left">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-body text-[12px] font-medium uppercase tracking-wider text-cream hover:opacity-80 transition-opacity break-all"
            >
              {CONTACT_EMAIL.toUpperCase()}
            </a>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:shrink-0 lg:gap-12">
            <Link
              href="/terms"
              className="font-body text-[12px] font-medium uppercase tracking-wider text-cream hover:opacity-80 transition-opacity"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="font-body text-[12px] font-medium uppercase tracking-wider text-cream hover:opacity-80 transition-opacity"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="w-full md:w-auto lg:shrink">
            <p className="font-body text-[12px] font-medium uppercase tracking-wider text-cream md:text-right">
              ©3COLORSTUDIO {currentYear} | DESIGNED & DEVELOPED BY{" "}
              <a
                href="https://www.belowthefold.gr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:opacity-80 transition-opacity"
              >
                BELOW THE FOLD
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
