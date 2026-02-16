"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
}

const CATEGORIES: Category[] = [
  {
    id: "lifestyle",
    title: "Lifestyle And Content",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://placehold.co/800x600/1a1a1a/fff?text=Lifestyle",
  },
  {
    id: "culinary",
    title: "Culinary And Bars",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/card.png",
  },
  {
    id: "brand",
    title: "Brand Video",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://placehold.co/800x600/1a1a1a/fff?text=Brand+Video",
  },
  {
    id: "events",
    title: "Events",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://placehold.co/800x600/1a1a1a/fff?text=Events",
  },
];

export function ProjectCategories() {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % CATEGORIES.length;
        setActiveCategory(CATEGORIES[next]);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentIndex(index);
      setActiveCategory(CATEGORIES[index]);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const cards = Array.from(carousel.children) as HTMLElement[];
      const scrollTop = carousel.scrollTop;
      const cardHeight = cards[0]?.offsetHeight || 0;
      const gap = 24;
      const newIndex = Math.round(scrollTop / (cardHeight + gap));

      if (newIndex >= 0 && newIndex < CATEGORIES.length && newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        setActiveCategory(CATEGORIES[newIndex]);
      }
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  return (
    <section className="project-categories-striped w-full border-2 border-black py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-[10%]">
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-stretch">
          <div className="flex flex-col gap-4">
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                onMouseEnter={() => setActiveCategory(category)}
                className="group relative cursor-pointer rounded-lg border border-black bg-[#E04855] p-6 transition-all hover:bg-[#c93d4a]"
              >
                <h3 className="mb-3 font-heading text-2xl font-bold text-black">
                  {category.title}
                </h3>
                <p className="mb-4 text-sm uppercase leading-relaxed text-black/90">
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
            ))}
          </div>

          <div className="relative min-h-0 overflow-hidden rounded-lg border border-black lg:h-full">
            <Image
              src={activeCategory.image}
              alt={activeCategory.title}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 1024px) 0px, 50vw"
              unoptimized={activeCategory.image.startsWith("https://placehold.co")}
            />
          </div>
        </div>

        <div className="lg:hidden">
          <div
            ref={carouselRef}
            className="flex snap-y snap-mandatory flex-col gap-6 overflow-y-auto"
            style={{ maxHeight: "80vh" }}
          >
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="flex min-h-[600px] snap-start flex-col rounded-lg border border-black bg-[#E04855]"
              >
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 font-heading text-2xl font-bold text-black">
                    {category.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-black/90 uppercase">
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
                <div className="relative h-[400px] w-full">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="rounded-b-lg object-cover"
                    sizes="100vw"
                    unoptimized={category.image.startsWith("https://placehold.co")}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {CATEGORIES.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all ${index === currentIndex
                  ? "w-8 bg-black"
                  : "w-2 bg-black/50"
                  }`}
                aria-label={`Go to category ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
