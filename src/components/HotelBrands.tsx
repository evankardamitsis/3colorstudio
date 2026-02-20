"use client";

import Image from "next/image";
import { FadeInUp } from "@/components/animations";

const HOTEL_LOGOS = [
  { src: "/conrad_logo.svg", alt: "Conrad" },
  { src: "/Logo_Costa%20Navarino-colored%203.svg", alt: "Costa Navarino" },
];

const MARQUEE_TEXT = "HOTEL BRANDS HOTEL BRANDS HOTEL BRANDS";

export function HotelBrands() {
  // Duplicate logos multiple times to ensure seamless scrolling across full screen width
  const logoSet = [
    ...HOTEL_LOGOS,
    ...HOTEL_LOGOS,
    ...HOTEL_LOGOS,
    ...HOTEL_LOGOS,
    ...HOTEL_LOGOS,
    ...HOTEL_LOGOS,
  ];

  return (
    <FadeInUp>
    <section className="w-full overflow-x-hidden bg-black pt-2 pb-16 md:py-20" aria-label="Hotel brands">
      {/* Marquee 1: hotel logos — same speed as text marquee, scrolls across full screen */}
      <div className="relative overflow-x-hidden overflow-y-hidden whitespace-nowrap pt-12">
        {/* Border-top: 1px white, 17% opacity */}
        <div className="absolute left-0 right-0 top-0 border-t border-white/17" />
        <div className="inline-flex animate-marquee items-center gap-12 px-4 md:gap-16">
          {logoSet.map((logo, i) => (
            <div
              key={i}
              className="relative h-10 w-28 shrink-0 md:h-12 md:w-36"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 112px, 144px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee 2: HOTEL BRANDS text (cream) — full width, visible */}
      <div className="mt-10 min-h-16 overflow-x-hidden overflow-y-hidden whitespace-nowrap md:mt-14 md:min-h-24 lg:min-h-32">
        <div className="inline-flex animate-marquee items-center py-4">
          <span className="hotel-brands-marquee-text inline-block px-6 text-cream">
            {MARQUEE_TEXT}
          </span>
          <span className="hotel-brands-marquee-text inline-block px-6 text-cream">
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>
    </section>
    </FadeInUp>
  );
}
