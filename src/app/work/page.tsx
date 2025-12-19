"use client";

import { motion } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import useInitialLoad from "@/contexts/initial-load-context";


export default function Work() {
  const { isInitialLoad } = useInitialLoad();

  return (
    <main className="">
     
      <div className="px-4 lg:px-8 pt-[200px] md:pt-30">
     
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              delay: isInitialLoad ? 2.9 : 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-4xl md:text-7xl text-white"
          >
            Selected Work
          </motion.h1>
        </div>
      </div>

      <ProjectList />
            
    </main>
  );
}

function ProjectList() {
  const { isInitialLoad } = useInitialLoad();

  return (
    <div className="px-2 lg:px-4 py-4 lg:py-6">
      <motion.div
        initial={{ y: "24px", opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: isInitialLoad ? 2.8 : 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full bg-transparent rounded-2xl lg:rounded-[20px] p-3 lg:p-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
