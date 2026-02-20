"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import type { ProjectCategory } from "@/types/app";
import {
  FadeInStagger,
  FadeInStaggerItem,
  FadeInScale,
  FadeInUp,
} from "@/components/animations";

const PLACEHOLDER_IMAGE = "https://placehold.co/800x600/1a1a1a/fff?text=Category";

/** Internal shape for the carousel (derived from ProjectCategory). */
interface CategoryCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ProjectCategoriesProps {
  /** Categories from Contentful (getProjectCategories). */
  categories: ProjectCategory[];
}

function toCategoryCard(c: ProjectCategory): CategoryCard {
  return {
    id: c.slug,
    title: c.title,
    description: c.subtitle,
    image: c.backgroundImage ?? PLACEHOLDER_IMAGE,
  };
}

export function ProjectCategories({ categories }: ProjectCategoriesProps) {
  const categoryCards = useMemo(() => categories.map(toCategoryCard), [categories]);
  const [activeCategory, setActiveCategory] = useState<CategoryCard | null>(() => categoryCards[0] ?? null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const displayCategory = activeCategory ?? categoryCards[0] ?? null;

  useEffect(() => {
    if (categoryCards.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % categoryCards.length;
        setActiveCategory(categoryCards[next]);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [categoryCards]);

  const scrollToIndex = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel || index < 0 || index >= categoryCards.length) return;
    const card = carousel.children[index] as HTMLElement;
    if (card) {
      const cardLeft = card.offsetLeft;
      carousel.scrollTo({ left: cardLeft, behavior: "smooth" });
      setCurrentIndex(index);
      setActiveCategory(categoryCards[index]);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || categoryCards.length === 0) return;

    const handleScroll = () => {
      const cards = Array.from(carousel.children) as HTMLElement[];
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 24;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));

      if (newIndex >= 0 && newIndex < categoryCards.length && newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        setActiveCategory(categoryCards[newIndex]);
      }
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [currentIndex, categoryCards]);

  if (categoryCards.length === 0) return null;

  return (
    <section className="project-categories-striped w-full overflow-x-hidden border-2 border-black py-[3%] md:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-3 lg:px-[10%]">
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-0 lg:items-stretch">
          <FadeInStagger className="flex flex-col gap-0" staggerDelay={0.1}>
            {categoryCards.map((category) => (
              <FadeInStaggerItem key={category.id}>
                <Link
                  key={category.id}
                  href={`/projects/category/${category.id}`}
                  onMouseEnter={() => setActiveCategory(category)}
                  className="group relative block cursor-pointer rounded-lg border border-black bg-[#E04855] p-6 transition-all duration-300 hover:bg-[#c93d4a] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <h3 className="mb-3 font-heading text-[36px] font-bold text-black">
                    {category.title}
                  </h3>
                  <p className="mb-4 text-[18px] uppercase leading-relaxed text-black/90">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-end gap-2 text-black">
                    <span className="text-sm font-medium uppercase tracking-wider">
                      Explore
                    </span>
                    <Image
                      src="/Union.svg"
                      alt=""
                      width={35}
                      height={35}
                      className="shrink-0"
                    />
                  </div>
                </Link>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>

          <FadeInScale delay={0.15} className="relative min-h-0 overflow-hidden rounded-lg border border-black lg:h-full">
            {displayCategory && (
              <Image
                src={displayCategory.image}
                alt={displayCategory.title}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 0px, 50vw"
                unoptimized={displayCategory.image.startsWith("https://placehold.co")}
              />
            )}
          </FadeInScale>
        </div>

        <FadeInUp className="lg:hidden" delay={0.1}>
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory flex-row gap-4 overflow-x-auto overflow-y-hidden px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {categoryCards.map((category) => (
              <Link
                key={category.id}
                href={`/projects/category/${category.id}`}
                className="flex min-h-[520px] w-[calc(100vw-2rem)] max-w-[400px] shrink-0 snap-start flex-col rounded-lg border border-black bg-[#E04855]"
              >
                {/* Image first on mobile */}
                <div className="relative min-h-0 min-w-full flex-1 basis-0">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="rounded-t-lg object-cover"
                    sizes="100vw"
                    unoptimized={category.image.startsWith("https://placehold.co")}
                  />
                </div>
                <div className="flex shrink-0 flex-col px-4 py-8 sm:px-10 sm:py-10">
                  <h3 className="mb-3 font-heading text-[24px] sm:text-[36px] font-bold text-black">
                    {category.title}
                  </h3>
                  <p className="mb-4 text-[14px] sm:text-[18px] leading-relaxed text-black/90 uppercase">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-end gap-2 text-black">
                    <span className="text-sm font-medium uppercase tracking-wider">
                      Explore
                    </span>
                    <Image
                      src="/Union.svg"
                      alt=""
                      width={35}
                      height={35}
                      className="shrink-0"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {categoryCards.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "w-8 bg-black"
                  : "w-2 bg-black/50"
                  }`}
                aria-label={`Go to category ${index + 1}`}
              />
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
