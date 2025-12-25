"use client";

import { motion, useInView } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import Copy from "../layout/Copy";

import Link from "next/link";

import { useRef } from "react";




export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -55% 0px",
  });
 

  // --- Font Configuration ---
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 }, // Headers
    mono: { fontFamily: "'IBM Plex Mono', monospace" }, // Buttons / Tech
    body: { fontFamily: "'Inter', sans-serif" }, // Default
  };

   const accentStyle: React.CSSProperties = {
     color: "#B9935B",
     ...fonts.display, // Kanit for the Header
     textTransform: "uppercase",
   };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center py-24 px-4 lg:px-8 bg-[#000000] "
      style={fonts.body}
    >
      <h2 className="flex justify-between w-full mb-6 lg:mb-8">
        <Copy>
         {/* Kanit Bold */}
         <span style={accentStyle} className="md:text-9xl text-6xl ">Our Work</span>
        </Copy>
       
      </h2>

      <ul className="flex flex-col lg:flex-row gap-3 lg:gap-4 w-full mb-8 lg:mb-16">
        <motion.li
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          key={projects[0].title}
          className="w-full lg:w-1/2"
        >
          <ProjectCard project={projects[0]} index={0} />
        </motion.li>
        <motion.li
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          key={projects[1].title}
          className="w-full lg:w-1/2"
        >
          <ProjectCard project={projects[1]} index={1} />
        </motion.li>
      </ul>

       <div className="flex justify-center relative top-12">
        <Link 
              href="/work" 
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#B9935B] text-black overflow-hidden font-[700] uppercase tracking-wider text-sm transition-all hover:bg-white hover:text-black"
              style={fonts.body}
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-96 group-hover:h-96 opacity-10"></span>
              <span className="relative flex items-center gap-2">
                SEE All WORK
              </span>
            </Link>
      </div>

    </section>
   
  );
}