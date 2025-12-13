"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Check, ArrowRight } from 'lucide-react';

function PackageSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);

  // --- Font Configuration ---
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 }, // Big Headers / Impact
    mono: { fontFamily: "'IBM Plex Mono', monospace" }, // Specs / Labels / Tech
    body: { fontFamily: "'Inter', sans-serif" }, // Descriptions
  };

  const features = [
    { title: "Design", desc: "Custom high-converting layout (Mobile + Desktop)" },
    { title: "Copywriting", desc: "Psychology-based copy to convert cold traffic" },
    { title: "Tech Stack", desc: "Speed-optimized, clean code (Next.js/React)" },
    { title: "Integration", desc: "Seamless CRM & Email form connection" },
    { title: "Tracking", desc: "Pixel, Analytics & Conversion events setup" },
    { title: "Testing", desc: "A/B Variant included for headline testing" },
    { title: "Support", desc: "7-Day post-launch monitoring + 1 Revision round" }
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });

    // 1. Header Reveal
    tl.from(".header-anim", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    });

    // 2. Grid Items Reveal (Cards)
    tl.from(".bento-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.5");

    // 3. Feature List Items
    tl.from(".feature-row", {
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
    }, "-=0.5");

    // 4. Guarantee Reveal
    tl.from(guaranteeRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
    }, "-=0.2");

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="packages"
      className="relative min-h-screen flex flex-col justify-center py-20 px-4 lg:px-12 text-white overflow-hidden"
      style={fonts.body}
    >
      
      {/* --- HEADER SECTION --- */}
      <div ref={headerRef} className="mb-16 lg:mb-24 flex flex-col items-start relative z-10">
        <div className="overflow-hidden">
          {/* IBM Plex Mono for Label */}
          <h2 className="header-anim text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 mb-4" style={fonts.mono}>
            The Package
          </h2>
        </div>
        <div className="overflow-hidden">
          {/* Kanit for Main Title */}
          <h2 className="header-anim text-4xl md:text-6xl lg:text-8xl leading-[0.9]" style={fonts.display}>
            LANDING PAGE <br />
            <span style={{ color: "#B9935B" }}>LEAD BOOSTER</span>
          </h2>
        </div>
      </div>

      {/* --- BENTO GRID LAYOUT --- */}
      <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* CARD 1: VIDEO & TARGET AUDIENCE (Span 5) */}
        <div className="bento-card lg:col-span-5 relative group overflow-hidden rounded-sm border border-[#B9935B]/20 bg-[#0a0a0a]">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
             <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
            >
              <source src="/music/music.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-end">
            {/* Kanit for Card Header */}
            <h3 className="text-2xl mb-6 border-b border-[#B9935B]/50 pb-4 inline-block" style={{ ...fonts.display, color: "#B9935B" }}>
              Who is this for?
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#B9935B] mt-1">●</span>
                <span className="text-lg text-gray-200" style={fonts.body}>
                  Founders tired of design fluff and want <span className="text-white font-bold">ROI</span>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B9935B] mt-1">●</span>
                <span className="text-lg text-gray-200" style={fonts.body}>
                  Businesses running paid ads getting clicks but <span className="text-white font-bold">no customers</span>.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* CARD 2: SPECS / FEATURES (Span 7) */}
        <div className="bento-card lg:col-span-7 flex flex-col border border-[#B9935B]/20 bg-[#0a0a0a]/40 backdrop-blur-md p-8 rounded-sm">
           <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
             {/* IBM Plex Mono for Technical Labels */}
             <h3 className="text-xl text-gray-400 uppercase tracking-widest" style={fonts.mono}>Specifications</h3>
             <span style={{ ...fonts.mono, color: "#B9935B" }} className="text-sm">Everything included</span>
           </div>

           <div className="flex flex-col gap-4 flex-grow">
             {features.map((item, idx) => (
               <div key={idx} className="feature-row flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8 py-3 border-b border-gray-800/50 hover:border-[#B9935B]/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-[150px]">
                    <Check size={16} className="text-[#B9935B]" />
                    {/* IBM Plex Mono for Feature Names (Specs) */}
                    <span className="uppercase text-sm font-bold tracking-wide text-gray-300" style={fonts.mono}>{item.title}</span>
                  </div>
                  {/* Inter for Description */}
                  <span className="text-gray-400 text-sm md:text-right font-light" style={fonts.body}>{item.desc}</span>
               </div>
             ))}
           </div>
        </div>

        {/* CARD 3: PRICING & CTA (Span 12 - Full Width Bottom) */}
        <div className="bento-card lg:col-span-12 mt-4 flex flex-col md:flex-row items-center border border-[#B9935B] bg-[#B9935B]/5 p-8 md:p-12 rounded-sm relative overflow-hidden">
          {/* Animated Sheen Effect Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#B9935B]/10 to-transparent -skew-x-12 translate-x-[-100%] animate-pulse" />
          
          <div className="flex-1 z-10 text-center md:text-left mb-8 md:mb-0">
             {/* IBM Plex Mono for Label */}
             <p className="text-sm uppercase tracking-[0.2em] text-[#B9935B] mb-2" style={fonts.mono}>Total Investment</p>
             <div className="flex items-baseline justify-center md:justify-start gap-2">
               {/* Kanit Bold for Price */}
               <span className="text-6xl md:text-8xl leading-none text-white" style={{ ...fonts.display, color: "#B9935B" }}>$949</span>
               <span className="text-gray-400 text-lg" style={fonts.body}>/ flat rate</span>
             </div>
             <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide" style={fonts.mono}>Payment plans available upon request</p>
          </div>

          <div className="z-10">
            {/* IBM Plex Mono for Button */}
            <Link 
              href="/contact" 
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#B9935B] text-black overflow-hidden font-bold uppercase tracking-wider text-sm transition-all hover:bg-white hover:text-black"
              style={fonts.mono}
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-96 group-hover:h-96 opacity-10"></span>
              <span className="relative flex items-center gap-2">
                Ignite Your Conversions <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>

      </div>

      {/* --- GUARANTEE BADGE --- */}
      <div ref={guaranteeRef} className="mt-20 border-t border-dashed border-gray-700 pt-12 relative">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-between">
          
          <div className="max-w-2xl text-center lg:text-left">
            {/* Kanit for Guarantee Title */}
            <h3 className="text-2xl lg:text-3xl mb-4 leading-snug" style={fonts.display}>
              THE <span style={{ color: "#B9935B" }} className="border-b-2 border-[#B9935B]">IRON-CLAD</span> GUARANTEE
            </h3>
            {/* Inter for Body */}
           <p className="text-gray-400 leading-relaxed text-lg" style={fonts.body}>
              If your new landing page doesn&apos;t hit a{" "}
              <span className="text-white font-bold">10% conversion rate</span> or
              significantly outperform your current one within 30 days, we&apos;ll optimize it
              again for free.
           </p>

          </div>

          <div className="border border-[#B9935B] p-6 text-center min-w-[300px] rotate-[-2deg] bg-black hover:rotate-0 transition-transform duration-300 shadow-[0_0_30px_rgba(185,147,91,0.1)]">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2" style={fonts.mono}>Risk Reversal</p>
            {/* Kanit for Stamp Text */}
            <p className="text-xl leading-tight" style={{ ...fonts.display, color: "#B9935B" }}>
              STILL NO RESULTS?<br />
              <span className="text-white">100% MONEY BACK.</span>
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}

export default PackageSection;