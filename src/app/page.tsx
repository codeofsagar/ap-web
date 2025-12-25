"use client";


import Services from "@/components/sections/Services";
import TechnologiesList from "@/components/sections/TechnologiesList";
import Work from "@/components/sections/Work";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PackageSection from "@/components/sections/PackageSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import HomeContact from "@/components/sections/HomeContact";
import Star from "@/components/sections/Star";
import Guarantee from "@/components/sections/Guarantee";


export default function Home() {
  return (
    <main className=" ">
      <HeroSection/>
      
      <AboutSection/>
      <Star/>
      <PackageSection/>
      <Guarantee/>
      
      
      <Work />
      <Services />
      <TechnologiesList />
      <ReviewsSection/>
      <HomeContact/>
    </main>
  );
}
