"use client";

import { motion, useInView } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import Copy from "../layout/Copy";
import { pageTransition } from "@/constants/pageTransition";

import { useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";

import { Zap } from "lucide-react";

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -55% 0px",
  });
  const router = useTransitionRouter();

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
      className="flex flex-col items-center py-24 px-4 lg:px-8 "
      style={fonts.body}
    >
      <h2 className="flex justify-between w-full mb-6 lg:mb-8">
        <Copy>
         {/* Kanit Bold */}
         <span style={accentStyle} className="md:text-6xl text-4xl ">Our Work</span>
        </Copy>
        <Copy delay={0.2}>
         {/* Kanit Bold */}
          <span style={accentStyle} className="text-4xl md:text-6xl ">
            &apos;25
          </span>
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
        <motion.button
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#B9935B",
            color: "#0a0a0a"
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 text-sm lg:text-xl uppercase px-8 py-4 transition-all border border-[#B9935B] font-bold"
          style={{ 
            backgroundColor: 'transparent',
            color: '#B9935B',
            ...fonts.mono // IBM Plex Mono for Button
          }}
          onClick={(e) => {
              e.preventDefault();
              router.push("/work", { onTransitionReady: pageTransition });
          }} 
        >
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Zap className="w-5 h-5" fill="#B9935B" />
          </motion.div>
          See All
        </motion.button>
      </div>

    </section>
   
  );
}