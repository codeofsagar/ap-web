"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { redirect } from "next/navigation";
// Removed lcddot import as we are using IBM Plex Mono now
import { use } from "react";
import { ArrowUpRight } from "lucide-react";
import useInitialLoad from "@/contexts/initial-load-context";

type PageParams = {
  slug: string;
};

export default function Project({ params }: { params: Promise<PageParams> }) {
  const { isInitialLoad } = useInitialLoad();

  const unwrappedParams = use(params);

  const project = projects.find(
    (project) => project.slug === unwrappedParams.slug
  );

  if (!project) {
    redirect("/work");
  }

  // --- Font Configuration ---
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 }, // Big Headers
    mono: { fontFamily: "'IBM Plex Mono', monospace" }, // Labels / Tags / Tech
    body: { fontFamily: "'Inter', sans-serif" }, // Body Text
  };

  return (
    <main className=" px-2 lg:px-4 pt-7 ">
      <motion.div
        initial={{ y: "24px", opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: isInitialLoad ? 2.8 : 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-col items-center gap-[clamp(64px,6vw,200px)] px-3 lg:px-4 pt-[clamp(64px,10vw,128px)] pb-3 lg:pb-4 rounded-2xl lg:rounded-[20px] bg-neutral-900"
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1,
              delay: isInitialLoad ? 3 : 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full text-neutral-100 text-center text-5xl md:text-[clamp(64px,8vw,180px)] font-bold uppercase leading-[0.85]"
            style={fonts.display} // Kanit Bold
          >
            {project.title}
          </motion.h1>
        </div>

        <div className="flex flex-col gap-12 lg:gap-16 2xl:gap-[clamp(64px,5vw,150px)] px-4 lg:px-5 pt-5 lg:pt-6 pb-4 lg:pb-5 rounded-lg lg:rounded-xl bg-neutral-800">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12">
            <div className="flex flex-col gap-3 col-span-2">
          

           
            </div>

            <div className="flex flex-col gap-3 col-span-4">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: isInitialLoad ? 3.2 : 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider"
                  style={fonts.mono} // IBM Plex Mono for Label
                >
                  Services
                </motion.p>
              </div>

              <ul className="flex gap-1.5 2xl:gap-2 flex-wrap">
                {project.keywords.map((keyword, index) => (
                  <motion.li
                    key={keyword}
                    initial={{ y: 24, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                      duration: 1,
                      delay: isInitialLoad
                        ? 3.3 + index * 0.025
                        : 1.3 + index * 0.025,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    // Removed lcddot.className, applied mono font directly
                    className="text-[10px] lg:text-[clamp(12px,0.7vw,16px)] text-neutral-100 uppercase tracking-[1.1] bg-neutral-100/10 px-2 3xl:px-3 pt-2 pb-1.5 rounded-md whitespace-nowrap"
                    style={fonts.mono} 
                  >
                    {keyword}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block col-span-1"></div>

            <div className="flex flex-col gap-3 col-span-5">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: isInitialLoad ? 3.2 : 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider"
                  style={fonts.mono} // IBM Plex Mono for Label
                >
                  Summary
                </motion.p>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: isInitialLoad ? 3.3 : 1.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-[clamp(16px,1.3vw,30px)] text-neutral-100 font-medium leading-[1.3]"
                  style={fonts.body} // Inter for Body text
                >
                  {project.summary}
                </motion.p>
              </div>

              {project.url ? (
                <div className="overflow-hidden">
                  <motion.a
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1,
                      delay: isInitialLoad ? 3.3 : 1.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider flex items-center gap-1 hover:underline hover:text-neutral-100 transition-all duration-300"
                    style={fonts.mono} // IBM Plex Mono for Link
                  >
                    Visit site <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:gap-5">
            {project.media.map((media, index) => {
              // Every 4th item (index 2, 6, 10...) starts a half-width pair
              if (index % 4 === 2) {
                return (
                  <div key={index} className="flex gap-4 lg:gap-5">
                    <div className="w-1/2 h-[160px] lg:h-[clamp(600px,40vw,1200px)] rounded-lg lg:rounded-xl overflow-hidden relative">
                      {media.type === "image" ? (
                        <Image
                          src={media.url}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <video
                          src={media.url}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      )}
                    </div>
                    <motion.div className="w-1/2 h-[160px] lg:h-[clamp(600px,40vw,1200px)] rounded-lg lg:rounded-xl overflow-hidden relative">
                      {project.media[index + 1]?.type === "image" ? (
                        <Image
                          src={project.media[index + 1].url}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <video
                          src={project.media[index + 1]?.url}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      )}
                    </motion.div>
                  </div>
                );
              }

              // Skip if this item is part of a half-width pair
              if (index % 4 === 3) {
                return null;
              }

              // Render full-width items
              return (
                <motion.div
                  key={index}
                  initial={{ y: 32, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    delay: isInitialLoad ? 3.5 : 1.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full h-[200px] lg:h-[clamp(600px,57vw,1200px)] rounded-lg lg:rounded-xl overflow-hidden relative"
                >
                  {media.type === "image" ? (
                    <Image
                      src={media.url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={media.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="object-cover object-center h-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </main>
  );
}