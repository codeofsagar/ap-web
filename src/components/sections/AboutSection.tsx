"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

function AboutSection() {
  // FIX: Changed HTMLSectionElement to HTMLElement to fix the TS error
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const accentStyle: React.CSSProperties = {
    color: "#B9935B",
    fontFamily: "Druk Wide Cy Web Bold Regular",
    textTransform: "uppercase",
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });

    // 1. Reveal Title Words
    tl.from(".word-anim", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    });

    // 2. Reveal Image & Text Content
    tl.from(
      [contentRef.current, imageRef.current],
      {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // 3. Stats Separation Line & Numbers
    tl.from(".stat-item", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
    }, "-=0.5");

    // Parallax Icons
    gsap.to(".floating-icon", {
      y: "30px",
      rotation: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        from: "random",
      } as gsap.StaggerVars,
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden text-white"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HERO TEXT SECTION --- */}
        <div ref={titleRef} className="flex flex-col gap-2 mb-16 lg:mb-24">
          {/* Line 1 */}
          <div className="overflow-hidden">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1]">
              <span className="word-anim inline-block mr-4">You have the</span>
              <span className="word-anim inline-block" style={accentStyle}>
                BEST ADS
              </span>
            </h2>
          </div>
          
          {/* Line 2 */}
          <div className="overflow-hidden">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1]">
              <span className="word-anim inline-block mr-4">in the world,</span>
              <span className="word-anim inline-block opacity-70 italic font-serif mr-4">but...</span>
            </h2>
          </div>

          {/* Line 3 - BIG IMPACT */}
          <div className="overflow-hidden mt-2">
            <h2 className="text-4xl md:text-6xl lg:text-8xl leading-[1]">
              <span className="word-anim inline-block mr-4">Your landing page</span>
              <span className="word-anim inline-block border-b-4 border-[#B9935B]" style={accentStyle}>
                SUCKS?
              </span>
            </h2>
          </div>
        </div>

        {/* --- GRID CONTENT SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Column 1: Text Content (Span 5) */}
          <div ref={contentRef} className="lg:col-span-5 flex flex-col justify-between h-full gap-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              You are throwing <span style={accentStyle} className="text-sm md:text-base mx-1">MONEY</span> 
              into the <span style={accentStyle} className="text-sm md:text-base mx-1">FIRE</span>.
              <br /><br />
              Our landing pages don&apos;t just look pretty—they convert visitors into customers. 
              Fast loading, clean design, and strategic psychology turn clicks into cash.
            </p>

            <div className="pt-4">
               <Link
                href="#conversion"
                className="group relative inline-flex items-center gap-3 text-[#B9935B] text-sm tracking-[0.2em] uppercase font-bold"
              >
                <span className="w-12 h-[1px] bg-[#B9935B] transition-all group-hover:w-20"></span>
                Ignite Conversions
              </Link>
            </div>
          </div>

          {/* Column 2: Image (Span 7) */}
          <div ref={imageRef} className="lg:col-span-7 relative">
            <div className="relative w-full aspect-[16/9] lg:aspect-[16/8] rounded-none border border-[#B9935B]/30 overflow-hidden">
               {/* Overlay Gradient for text readability */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
               <Image
                src="/images/ss.png"
                alt="Conversion rate skyrocketing"
                fill
                className="object-cover transition-transform duration-[2s] hover:scale-105"
              />
            </div>
            {/* Decorative box behind image */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#B9935B]/20 -z-10 hidden lg:block" />
          </div>
        </div>

        {/* --- STATS FOOTER --- */}
        <div ref={statsRef} className="mt-24 pt-12 border-t border-[#B9935B]/40 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="stat-item">
            <div className="text-5xl md:text-7xl mb-2" style={accentStyle}>90%</div>
            <p className="text-gray-400 text-sm tracking-wide uppercase">
              of visitors bounce in <br />the first 3 seconds
            </p>
          </div>

          <div className="stat-item md:text-right">
             <div className="text-5xl md:text-7xl mb-2" style={accentStyle}>3.2X</div>
            <p className="text-gray-400 text-sm tracking-wide uppercase">
              better conversion than <br />industry averages
            </p>
          </div>

        </div>
      </div>

      {/* --- FLOATING ICONS (DECORATION) --- */}
      <div className="floating-icon absolute top-20 right-[5%] opacity-20 pointer-events-none w-24 h-24">
        <Image src="/images/urchinIcon.png" alt="Icon" fill className="object-contain" />
      </div>
      <div className="floating-icon absolute bottom-40 left-[5%] opacity-20 pointer-events-none w-32 h-32">
         <Image src="/images/flowerSwiss.png" alt="Icon" fill className="object-contain" />
      </div>

    </section>
  );
}

export default AboutSection;