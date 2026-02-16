import { Hero } from "@/components/Hero";
import { WhatWeDo } from "@/components/WhatWeDo";
import { ProjectsHomeMarquee } from "@/components/ProjectsHomeMarquee";
import { ProjectCategories } from "@/components/ProjectCategories";
import { ContactSection } from "@/components/ContactSection";
import { HotelBrands } from "@/components/HotelBrands";


export const revalidate = 60;

export default async function HomePage() {

  return (
    <>
      <Hero />

      <WhatWeDo />

      <ProjectsHomeMarquee />

      <ProjectCategories />

      <ContactSection />

      <HotelBrands />
    </>
  );
}
