"use client";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { IconArrowUpRight, IconBarcode } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  gold: "#B9935B",
  bg: "#FFFBF6",
  black: "#000000",
};

const FONTS = {
  display: { fontFamily: "'Kanit', sans-serif", fontWeight: 900 },
  mono: { fontFamily: "'IBM Plex Mono', monospace" },
  body: { fontFamily: "'Inter', sans-serif" },
};

function HomeContact() {
  const [showCalendar, setShowCalendar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Parallax/Reveal Text Effect
    gsap.fromTo(
      textRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );

    // 2. Ticket Entrance
    gsap.fromTo(
      ticketRef.current,
      { scale: 0.9, opacity: 0, y: 40 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="bg-[#FFFBF6] text-black py-24 lg:py-48 px-4 relative overflow-hidden border-t border-black/10"
      style={FONTS.body}
    >
      {/* --- Background Elements --- */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.06] mix-blend-multiply pointer-events-none"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)'
        }}
      />
      <div className="absolute top-0 left-1/4 w-px h-full bg-black/[0.03] z-[1]"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-black/[0.03] z-[1]"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        
        {/* --- Headline Section --- */}
        <div ref={textRef} className="mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 border border-[#B9935B] rounded-full px-4 py-1 mb-8 bg-white/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: COLORS.gold }}></span>
            <span className="text-xs uppercase tracking-widest font-bold" style={{ ...FONTS.display, color: COLORS.gold }}>
              Limited Q4 Availability
            </span>
          </div>
          
          <h2 className="text-[11vw] lg:text-[7vw] leading-[0.85] mb-8 text-black uppercase tracking-tighter" style={FONTS.display}>
            Stop Losing <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>
              Revenue Today
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg" style={FONTS.body}>
            Your landing page shouldn&apos;t be your bottleneck. Grab a boarding pass for a free 30-minute audit.
          </p>
        </div>

        {/* --- The Boarding Pass CTA --- */}
        <div className="flex justify-center" ref={ticketRef}>
          <div
            onClick={() => setShowCalendar(true)}
            className="group relative w-full max-w-2xl bg-white border-2 border-black flex flex-col md:flex-row shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_#B9935B] transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            {/* Left Side: Ticket Details */}
            <div className="flex-1 p-8 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-black/10 border-dashed relative">
              <div className="flex justify-between mb-8">
                <div className="text-left">
                  <p className="text-[10px] uppercase text-gray-400 mb-1" style={FONTS.mono}>Gate / Session</p>
                  <p className="text-lg uppercase" style={FONTS.display}>Audit & Strategy</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-gray-400 mb-1" style={FONTS.mono}>Duration</p>
                  <p className="text-lg uppercase" style={FONTS.display}>30 Min</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 text-white flex items-center justify-center rounded-full bg-black group-hover:bg-[#B9935B] transition-colors duration-300">
                  <IconBarcode size={24} />
                </div>
                <div className="text-left">
                  <p className="text-xl uppercase leading-none mb-1" style={FONTS.display}>Free Consultation</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest" style={FONTS.mono}>Claim your spot now</p>
                </div>
              </div>
            </div>

            {/* Right Side: Action Button */}
            <div className="w-full md:w-32 bg-black group-hover:bg-[#B9935B] transition-colors duration-300 flex items-center justify-center p-6">
              <div className="flex flex-row md:flex-col items-center gap-3 text-white group-hover:text-black">
                <span className="uppercase tracking-widest text-sm md:[writing-mode:vertical-rl]" style={FONTS.display}>
                  Book Now
                </span>
                <IconArrowUpRight className="w-6 h-6 transition-transform group-hover:rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL (CALENDLY) --- */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowCalendar(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-20">
                <span className="text-xs font-bold uppercase tracking-widest" style={FONTS.mono}>Scheduling Portal</span>
                <button onClick={() => setShowCalendar(false)} className="text-black hover:rotate-90 transition-transform duration-300">
                  <X size={24} />
                </button>
              </div>

              <iframe 
                src="https://calendly.com/apdigitalagency/30-minute-landing-page-consultation-1?hide_gdpr_banner=1&primary_color=B9935B"
                width="100%" 
                height="100%" 
                className="w-full h-full pt-14"
                title="Calendly"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default HomeContact;