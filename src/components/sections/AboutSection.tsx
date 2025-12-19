"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

function AboutSection() {
  const containerRef = useRef(null);

  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
    mono: { fontFamily: "'IBM Plex Mono', monospace" },
    body: { fontFamily: "'Inter', sans-serif" },
  };

  const accentStyle: CSSProperties = {
    color: "#B9935B",
    ...fonts.mono,
    textTransform: "uppercase",
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in lines
    gsap.from(".reveal-line", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      }
    });

    // Image Parallax
    gsap.to(".parallax-img", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".img-viewport",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen py-24 bg-[#0a0a0a] text-white overflow-hidden"
      style={fonts.body}
    >
      {/* 1. TOP HEADER SECTION */}
      <div className="container mx-auto px-6 lg:px-12 border-b border-white/10 pb-20">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          {/* Left: The Technical Label */}
          <div className="lg:w-1/3">
            <p style={accentStyle} className="text-sm tracking-[0.5em] leading-loose">
              Conversion Architecture <br /> 
              Strategy / Design 
            </p>
          </div>

          {/* Right: The Brutalist Headline */}
          <div className="lg:w-2/3">
            <h2 className="reveal-line text-6xl md:text-7xl lg:text-[10rem] leading-[0.85] " style={fonts.display}>
              BEST ADS<br />
              <span className="text-[#B9935B]" >UGLY PAGE ?</span>
            </h2>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE CONTENT SECTION (REVERSED) */}
      <div className="container mx-auto px-6 lg:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Huge Stat/Label */}
          <div className="lg:col-span-5">
             <div className="img-viewport relative aspect-[4/5] overflow-hidden border border-[#B9935B]/30">
                <Image 
                  src="/images/ss.png" 
                  alt="Conversion" 
                  fill 
                  className="parallax-img object-cover scale-125 grayscale hover:grayscale-0 transition-all duration-700" 
                />
             </div>
          </div>

          {/* Right: The High-Impact Copy */}
          <div className="lg:col-span-7 space-y-20">
            <div>
               <h3 className="text-4xl md:text-6xl leading-tight mb-8" style={fonts.display}>
                YOU HAVE THE <span style={{color: "#B9935B"}}>BEST ADS</span> IN THE WORLD, BUT... <br/>
                YOUR LANDING PAGE <span className="underline decoration-[#B9935B]">SUCKS?</span>
               </h3>
               <p className="text-xl md:text-3xl text-gray-400 font-light leading-relaxed">
                 <span style={accentStyle} className="text-white block mb-4 text-base tracking-[0.2em]">[ STOP BURNING MONEY ]</span><br/>
                 Your traffic is elite. Your destination is mediocre. We bridge the gap between attention and revenue.
               </p>
            </div>

            {/* Strategic Pillars - Restyled bigger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
              <div>
                <span style={accentStyle} className="text-lg block mb-4">01 / Strategy</span>
                <p className="text-xl text-gray-300">Fast loading, clean design, and strategic psychology turn clicks into cash.</p>
              </div>
              <div>
                <span style={accentStyle} className="text-lg block mb-4">02 / Results</span>
                <p className="text-xl text-gray-300">We don&apos;t build websites; we build high-converting sales machines.</p>
              </div>
            </div>

            {/* BIGGER Call to Action */}
            <div className="pt-10">
              <Link
                href="#conversion"
                className="group flex items-center justify-between border-y border-white/20 py-10 hover:border-[#B9935B] transition-colors duration-500"
              >
                <span className="text-4xl md:text-7xl uppercase group-hover:text-[#B9935B] transition-all" style={fonts.display}>
                  BOOK A AUDIT
                </span>
                <span className="text-4xl md:text-7xl group-hover:translate-x-4 transition-transform text-[#B9935B]">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. AWARDS FOOTER */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="p-12 border-r border-white/10 hover:bg-[#B9935B] group transition-all duration-500">
            <span style={fonts.mono} className="text-xs uppercase tracking-widest text-[#B9935B] group-hover:text-black">Traffic Retention</span>
            <div style={fonts.display} className="text-8xl my-4 group-hover:text-black">90%</div>
            <p className="text-xs uppercase tracking-widest opacity-50 group-hover:text-black">of visitors bounce in the first 3 seconds</p>
          </div>

          <div className="p-12 border-r border-white/10 hover:bg-[#B9935B] group transition-all duration-500">
            <span style={fonts.mono} className="text-xs uppercase tracking-widest text-[#B9935B] group-hover:text-black">Revenue Impact</span>
            <div style={fonts.display} className="text-8xl my-4 group-hover:text-black">3.2X</div>
            <p className="text-xs uppercase tracking-widest opacity-50 group-hover:text-black">better conversion than industry averages</p>
          </div>

          {/* CIRCLE BADGE SECTION */}
          <div className="p-12 flex items-center justify-center relative overflow-hidden group">
             {/* Static Star */}
             <div className="absolute z-10 text-[#B9935B] text-5xl animate-pulse">★</div>
             
             {/* Rotating Text */}
             <div className="animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-56 md:h-56">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent"/>
                    <text className="fill-white/30 text-[7px] uppercase tracking-[0.25em]" style={fonts.mono}>
                        <textPath xlinkHref="#circlePath">
                          Award Winning Design • High Performance Architecture • Elite Strategy •
                        </textPath>
                    </text>
                </svg>
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

export default AboutSection;