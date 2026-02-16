import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const LOGO_SRC = "/3colorstudiologowhitetrimmed.svg";
const CONTACT_EMAIL = "hello@3colorstudio.com";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black py-12 md:py-16">
      <div className="w-full px-[10%]">
        <div className="flex flex-wrap justify-between items-center gap-8 lg:gap-12 text-white">
          {/* Left: Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
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

          {/* Center-left: Email — centered in left half of remaining space */}
          <div className="flex-1 min-w-[200px] text-center lg:text-left">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-body text-[12px] font-medium uppercase tracking-wider text-cream hover:opacity-80 transition-opacity"
            >
              {CONTACT_EMAIL.toUpperCase()}
            </a>
          </div>

          {/* Center-right: Legal links — substantial spacing */}
          <div className="flex shrink-0 gap-8 lg:gap-12">
            <Link
              href="/terms"
              className="font-body text-[12px] font-medium uppercase tracking-wider text-cream hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="font-body text-[12px] font-medium uppercase tracking-wider text-cream hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Right: Copyright and developer credit */}
          <div className="w-full shrink-0 text-right lg:w-auto lg:shrink">
            <p className="font-body text-[12px] font-medium uppercase tracking-wider text-cream whitespace-nowrap">
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
