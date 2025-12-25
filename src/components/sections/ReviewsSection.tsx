"use client";
import React, {  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, ArrowLeft, Quote, Plus } from "lucide-react";
import Link from "next/link";

const fonts = {
  display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
  mono: { fontFamily: "'IBM Plex Mono', monospace" },
  body: { fontFamily: "'Inter', sans-serif" },
};

export default function GoldenPrecisionReviews() {
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      quote: "Our conversion rate jumped from 2.3% to 12.8% in just two weeks. The ROI was immediate and substantial.",
      name: "Sarah Chen",
      designation: "Marketing Director, TechFlow",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      rating: 5
    },
    {
      quote: "Finally, a landing page that actually converts. Clean, fast, and strategically designed. Worth every penny.",
      name: "Marcus Rodriguez",
      designation: "Founder, GrowthLab",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      rating: 5
    },
    {
      quote: "Professional, results-driven, and backed by a solid guarantee. This is how landing pages should be done.",
      name: "David Kim",
      designation: "CEO, ConvertPro",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      rating: 5
    },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen relative overflow-hidden selection:bg-[#B9935B] selection:text-black">
      
      {/* --- ARCHITECTURAL GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: `linear-gradient(#B9935B 1px, transparent 1px), linear-gradient(90deg, #B9935B 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
        {/* Major Axis Lines */}
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#B9935B]/20" />
        <div className="absolute top-1/2 left-0 h-[1px] w-full bg-[#B9935B]/20" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        
        {/* --- HEADER WITH CROSSHAIR ACCENTS --- */}
        <div className="relative border-t border-l border-[#B9935B]/30 pt-12 pl-8 mb-24">
          <Plus className="absolute -top-3 -left-3 text-[#B9935B]" size={24} />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="text-[#B9935B] tracking-[0.5em] text-[10px] font-bold uppercase" style={fonts.mono}>
               Engineering Results
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-7xl font-bold leading-none uppercase mb-4" style={fonts.display}>
            Stop Sending Traffic <br />
            <span className=" bg-clip-text bg-gradient-to-r  text-[#B9935B]">
              Into a Black Hole.
            </span>
          </h2>
          <p className="max-w-xl text-gray-400 text-lg" style={fonts.body}>
            We build high-precision conversion funnels. Designed in 
            <span className="text-white"> Gold</span>, optimized for 
            <span className="text-[#B9935B]"> Growth</span>.
          </p>
        </div>

        {/* --- STATS: BORDERED GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#B9935B]/20 mb-32 bg-black/40 backdrop-blur-md">
          {[
            { label: "Conversion Lift", value: "450%" },
            { label: "Active Partners", value: "247+" },
            { label: "Avg. ROI", value: "12.4x" },
          ].map((stat, i) => (
            <div key={i} className="p-10 border-r border-[#B9935B]/20 last:border-r-0 flex flex-col items-center text-center">
              <span className="text-[#B9935B] text-5xl font-bold mb-2" style={fonts.display}>{stat.value}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold" style={fonts.mono}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* --- TESTIMONIALS: PRECISION LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#B9935B]/30">
          
          {/* Image Side */}
          <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden border-b lg:border-b-0 lg:border-r border-[#B9935B]/30">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={testimonials[active].src}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Index Counter */}
            <div className="absolute top-8 left-8 bg-[#B9935B] text-black px-4 py-1 text-xs font-bold" style={fonts.mono}>
              0{active + 1} / 0{testimonials.length}
            </div>
          </div>

          {/* Content Side */}
          <div className="p-12 md:p-20 flex flex-col justify-center bg-[#0d0d0d] relative">
            <Quote className="text-[#B9935B]/20 absolute top-12 right-12" size={80} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#B9935B" className="text-[#B9935B]" />
                  ))}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-medium leading-relaxed text-white mb-10" style={fonts.body}>
                  &quot;{testimonials[active].quote}&quot;
                </h3>

                <div className="border-l-2 border-[#B9935B] pl-6">
                  <h4 className="text-xl font-bold uppercase tracking-tight text-[#B9935B]" style={fonts.display}>
                    {testimonials[active].name}
                  </h4>
                  <p className="text-gray-500 text-xs tracking-widest uppercase mt-1" style={fonts.mono}>
                    {testimonials[active].designation}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-1 mt-12">
               <button 
                 onClick={() => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                 className="p-6 border border-[#B9935B]/30 hover:bg-[#B9935B] hover:text-black transition-all"
               >
                 <ArrowLeft size={20} />
               </button>
               <button 
                 onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
                 className="p-6 border border-[#B9935B]/30 bg-[#B9935B]/10 hover:bg-[#B9935B] hover:text-black transition-all"
               >
                 <ArrowRight size={20} />
               </button>
            </div>
          </div>
        </div>

        {/* --- FOOTER CTA --- */}
        <div className="mt-32 text-center relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#B9935B]/20 z-0" />
          
          <Link 
            href="/contact"
            className="relative z-10 group inline-flex items-center gap-6 px-12 py-6 bg-[#B9935B] text-black  uppercase tracking-[0.3em] text-sm transition-transform hover:scale-105 font-[700]"
            style={fonts.body}
          >
            Deploy Buying Machine
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </section>

      {/* Edge Accents */}
      <div className="fixed top-0 right-12 w-[1px] h-32 bg-gradient-to-b from-[#B9935B] to-transparent opacity-40" />
      <div className="fixed bottom-0 left-12 w-[1px] h-32 bg-gradient-to-t from-[#B9935B] to-transparent opacity-40" />
    </div>
  );
}