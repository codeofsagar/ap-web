"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

function PackageSection() {
  const containerRef = useRef<HTMLElement>(null);

  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
    mono: { fontFamily: "'IBM Plex Mono', monospace" },
    body: { fontFamily: "'Inter', sans-serif" },
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

  return (
    <section
      ref={containerRef}
      id="packages"
      className="relative min-h-screen py-32 bg-[#050505] text-white overflow-hidden"
      style={fonts.body}
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-24">
          <p style={{ ...fonts.mono, color: "#B9935B" }} className="text-sm tracking-[0.4em] uppercase mb-6">
            [ THE CORE OFFERING ]
          </p>
          <h2 className="text-6xl md:text-9xl leading-[0.85]" style={fonts.display}>
            LANDING <span className="text-[#B9935B]">BOOSTER.</span>
          </h2>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
          
          {/* LEFT: AUDIENCE & VIDEO */}
          <div className="lg:col-span-5 bg-[#0a0a0a] p-10 flex flex-col justify-between min-h-[600px] relative overflow-hidden group border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="absolute inset-0 opacity-30 transition-all duration-1000">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                 <source src="/music/music.mp4" type="video/mp4" />
               </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
            
            <div className="relative z-10">
              <span className="bg-[#B9935B] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={fonts.mono}>
                Ideal Fit
              </span>
              <h3 className="text-4xl mt-6 tracking-tight text-white" style={fonts.display}>
                WHO IS THIS FOR?
              </h3>
            </div>

            <div className="relative z-10 space-y-8 pb-10">
              <div className="flex gap-4">
                <Zap size={20} className="text-[#B9935B] shrink-0" />
                <p className="text-xl text-gray-300">Founders tired of design fluff who want <span className="text-white font-bold">Aggressive ROI</span>.</p>
              </div>
              <div className="flex gap-4">
                <Zap size={20} className="text-[#B9935B] shrink-0" />
                <p className="text-xl text-gray-300">Ads getting clicks but <span className="text-white font-bold">Zero Conversion</span>.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: SPECS LIST */}
          <div className="lg:col-span-7 bg-[#080808] p-10 lg:p-16">
            <h4 style={fonts.mono} className="text-md uppercase text-[#B9935B] mb-12 block">
              The Specifications
            </h4>

            <div className="space-y-2">
              {features.map((item, idx) => (
                <div key={idx} className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/5 hover:bg-white/[0.03] transition-all px-6 -mx-6">
                  <div className="flex items-center gap-6 mb-2 md:mb-0">
                    <span style={fonts.mono} className="text-sm text-[#B9935B] font-bold">
                      0{idx + 1}
                    </span>
                    <span className="text-2xl md:text-3xl uppercase text-white group-hover:translate-x-2 transition-transform" style={fonts.body}>
                      {item.title}
                    </span>
                  </div>
                  <span className="text-gray-400 text-base md:text-lg md:text-right max-w-xs leading-snug" style={fonts.body}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- PRICING & CTA --- */}
        <div className="mt-24 bg-[#B9935B] p-[1px]">
          <div className="bg-[#0a0a0a] grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-12 lg:p-20">
               <p style={fonts.mono} className="text-sm uppercase tracking-widest text-[#B9935B] mb-4">Total Investment</p>
               <div className="flex items-baseline gap-4">
                 <span style={fonts.display} className="text-8xl lg:text-[12rem] text-white ">$949</span>
                 <span style={fonts.mono} className="text-gray-500 uppercase text-sm">Flat Rate</span>
               </div>
            </div>
            
            <div className="p-12 lg:p-20 flex flex-col gap-10">
              <Link 
                href="/contact" 
                className="group flex items-center justify-between bg-[#B9935B] p-10 text-black transition-all hover:bg-white"
              >
                <span style={fonts.body} className="text-2xl md:text-4xl uppercase ">IGNITE CONVERSIONS</span>
                <ArrowRight size={40} className="group-hover:translate-x-4 transition-transform" />
              </Link>
              <div className="flex justify-between items-center opacity-40" style={fonts.mono}>
                <span className="text-[10px] uppercase tracking-widest">Limited Slots Available</span>
                <span className="text-[10px] uppercase tracking-widest text-right">Q1 2024 Slots Open</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- GUARANTEE SECTION --- */}
        <div className="mt-40 flex flex-col lg:flex-row items-center justify-between gap-20">
          <div className="max-w-3xl">
            <h3 className="text-5xl md:text-7xl mb-8 leading-[0.9]" style={fonts.display}>
              THE <span className="text-[#B9935B]">IRON-CLAD</span> <br/> REVENUE GUARANTEE
            </h3>
            <p className="text-2xl text-gray-400 leading-relaxed" style={fonts.body}>
              If your new landing page doesn’t hit a <span className="text-white font-bold">10% conversion rate</span> or 
              outperform your current one within 30 days, we’ll optimize it again for <span className="text-[#B9935B] font-bold">Free</span>.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <div className="relative border-2 border-[#B9935B] p-12 text-center bg-[#0a0a0a] -rotate-3 hover:rotate-0 transition-transform duration-700">
                <ShieldCheck size={60} className="mx-auto mb-8 text-[#B9935B]" />
                <p style={fonts.mono} className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-4">Risk Mitigation</p>
                <h4 style={fonts.display} className="text-3xl text-white leading-tight">
                  STILL NO RESULTS?<br />
                  <span className="text-[#B9935B]">100% MONEY BACK.</span>
                </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PackageSection;