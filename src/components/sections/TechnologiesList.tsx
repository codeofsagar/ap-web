"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Centralized Data Source
const TECH_DATA = [
  { name: "React", href: "https://reactjs.org", src: "/images/svg/react-logo.svg", width: 90 },
  { name: "Next.js", href: "https://nextjs.org", src: "/images/svg/nextjs-logotype-light-background.svg", width: 150 },
  { name: "TypeScript", href: "https://www.typescriptlang.org", src: "/images/svg/typescript-logo.svg", width: 70 },
  { name: "GSAP", href: "https://gsap.com/", src: "/images/svg/gsap-black.svg", width: 80 },
  { name: "Motion", href: "https://motion.dev/", src: "/images/svg/motion.svg", width: 80 },
  { name: "Tailwind", href: "https://tailwindcss.com/", src: "/images/svg/tailwindcss-logo.svg", width: 70 },
  { name: "Contentful", href: "https://www.contentful.com/", src: "/images/svg/contentful-logo.svg", width: 50 },
  { name: "Supabase", href: "https://supabase.com/", src: "/images/svg/supabase-logo.svg", width: 50 },
  { name: "Vercel", href: "https://vercel.com/", src: "/images/svg/vercel-logotype-light.svg", width: 90 },
  { name: "Figma", href: "https://www.figma.com/", src: "/images/svg/figma-logo.svg", width: 60 },
];

const fonts = {
  display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
  mono: { fontFamily: "'IBM Plex Mono', monospace" },
  body: { fontFamily: "'Inter', sans-serif" },
};

export default function TechnologiesLit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;

    if (!container || !highlight) return;

    const moveToElement = (element: HTMLElement) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const techName = element.getAttribute("data-name") || "";

        setActiveTech(techName);

        highlight.style.transform = `translate(${
          rect.left - containerRect.left
        }px, ${rect.top - containerRect.top}px)`;
        highlight.style.width = `${rect.width}px`;
        highlight.style.height = `${rect.height}px`;

        container.querySelectorAll("img").forEach((img) => {
          img.classList.remove("invert");
        });

        const currentImage = element.querySelector("img");
        if (currentImage) {
          currentImage.classList.add("invert");
        }
      }
    };

    const moveHighlight = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const gridItem = target.closest(".grid-item") as HTMLElement;

      if (gridItem) {
        moveToElement(gridItem);
      }
    };

    const firstItem = container.querySelector(".grid-item") as HTMLElement;
    if (firstItem) moveToElement(firstItem);

    container.addEventListener("mousemove", moveHighlight);
    return () => container.removeEventListener("mousemove", moveHighlight);
  }, []);

  return (
    <section className="pb-24 px-4 lg:px-8 bg-white" style={fonts.body}>
      <LetterScroll />

      <h4 className="text-4xl md:text-6xl uppercase mb-8" style={fonts.display}>
        Our TechStack
      </h4>

      <div ref={containerRef} className="relative border-t border-l border-neutral-300">
        {/* Highlight Box */}
        <div
          ref={highlightRef}
          className="highlight hidden sm:flex absolute top-0 left-0 bg-[#B9935B] pointer-events-none transition-all duration-300 z-0 items-end justify-center pb-4"
        >
          <span 
            className="text-white text-xs md:text-sm uppercase tracking-widest" 
            style={fonts.mono}
          >
            {activeTech}
          </span>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid grid-rows-2 relative z-10">
          {/* Row 1: Top 3 Items */}
          <div className="grid grid-cols-3 border-b border-neutral-300 h-[clamp(200px,20vw,400px)]">
            {TECH_DATA.slice(0, 3).map((tech, i) => (
              <TechLink key={tech.name} {...tech} noBorder={i === 2} />
            ))}
          </div>

          {/* Row 2: Remaining 7 Items */}
          <div className="grid grid-cols-7 h-[clamp(200px,15vw,400px)]">
            {TECH_DATA.slice(3).map((tech, i) => (
              <TechLink key={tech.name} {...tech} noBorder={i === 6} />
            ))}
          </div>
        </div>

        {/* Mobile Grid Layout (2 columns, shows all items) */}
        <div className="grid grid-cols-2 lg:hidden relative z-10">
          {TECH_DATA.map((tech, i) => (
            <TechLink 
              key={tech.name} 
              {...tech} 
              mobile 
              // noBorder if it's the 2nd item in a row (even index in a 0-based list)
              noBorder={i % 2 !== 0} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TechLinkProps {
  name: string;
  href: string;
  src: string;
  width: number;
  noBorder?: boolean;
  mobile?: boolean;
}

function TechLink({ name, href, src, width, noBorder, mobile }: TechLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-name={name}
      className={`grid-item flex items-center justify-center group cursor-pointer border-b ${
        !noBorder ? "border-r" : ""
      } border-neutral-300 ${mobile ? "h-[160px]" : "h-full lg:border-b-0"}`}
    >
      <div className="relative flex items-center justify-center w-full h-full p-6">
        <Image
          src={src}
          alt={name}
          width={width}
          height={width}
          className="z-10 transition-all duration-300 mix-blend-multiply object-contain"
        />
      </div>
    </a>
  );
}

function LetterScroll() {
  const containerRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.to(".letter", {
      yPercent: 100,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "40% 95%",
        end: "100% 80%",
        scrub: 1,
      },
      stagger: { each: 0.05, from: "random" },
    });
  }, []);

  const renderWord = (word: string) => word.split("").map((char, i) => (
    <span key={i} className={`letter relative inline-block ${char === 'H' ? 'mr-[clamp(16px,4.5vw,72px)]' : ''}`}>
      <span>{char}</span>
      <span className="absolute bottom-full left-0">{char}</span>
    </span>
  ));

  return (
    <ul ref={containerRef} className="letter-scroll flex flex-col justify-center items-center h-[300px] lg:h-[600px] py-12" style={fonts.display}>
      <li className="text-[clamp(40px,12vw,200px)] tracking-tight leading-[0.85] overflow-hidden flex">{renderWord("MODERN")}</li>
      <li className="text-[clamp(40px,12vw,200px)] tracking-tight leading-[0.85] overflow-hidden flex">{renderWord("TECHSTACK")}</li>
    </ul>
  );
}