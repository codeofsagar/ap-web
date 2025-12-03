"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, X } from 'lucide-react';

function HomeContact() {
  const [showCalendar, setShowCalendar] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 lg:py-48  overflow-hidden flex items-center justify-center"
    >
      {/* --- BACKGROUND ELEMENTS --- */}
      
      {/* Moving Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ 
               backgroundImage: 'linear-gradient(#B9935B 1px, transparent 1px), linear-gradient(90deg, #B9935B 1px, transparent 1px)', 
               backgroundSize: '50px 50px' 
           }}>
      </div>

      {/* Floating Gold Glows */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-0 right-0 w-[500px] h-[500px]  blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div 
        style={{ y: yBg }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B9935B]/5 blur-[120px] rounded-full pointer-events-none"
      />

      {/* --- CONTENT --- */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        
        {/* Badge */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B9935B]/10 border border-[#B9935B]/20 backdrop-blur-md mb-8"
        >
            <span className="w-2 h-2 rounded-full bg-[#B9935B] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B9935B]">Limited Availability for Q4</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-8xl leading-none text-white uppercase mb-8"
            style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}
        >
            Stop Losing <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #B9935B' }}>
                Revenue Today
            </span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
            Your traffic is expensive. Your landing page shouldn&apos;t be the bottleneck. 
            Book a free 30-minute audit and we&apos;ll show you exactly where you&apos;re leaving money on the table.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-400"
        >
            <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#B9935B]" />
                <span>No Commitment Required</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#B9935B]" />
                <span>Actionable Insights</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#B9935B]" />
                <span>Direct Access to Founders</span>
            </div>
        </motion.div>

        {/* CTA Button - Opens Modal */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative inline-block group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B9935B] to-[#FBF5E6] rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
            <button 
                onClick={() => setShowCalendar(true)}
                className="relative flex items-center gap-4 bg-[#B9935B] text-black px-10 py-5 rounded-lg hover:bg-[#cba264] transition-all duration-300 transform group-hover:-translate-y-1 cursor-pointer"
            >
                <Calendar className="w-5 h-5" />
                <span className="font-bold text-lg uppercase tracking-wider" style={{ fontFamily: 'Druk Wide Cy Web Bold Regular' }}>
                    Book Your Strategy Call
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {showCalendar && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowCalendar(false)}
                ></div>

                {/* Modal Content */}
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl h-[85vh] bg-[#111] border border-[#B9935B]/30 rounded-2xl overflow-hidden shadow-2xl shadow-[#B9935B]/20"
                >
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center justify-end px-4 z-20">
                         <button 
                            onClick={() => setShowCalendar(false)}
                            className="text-gray-400 hover:text-white transition-colors p-1"
                         >
                            <X size={20} />
                         </button>
                    </div>

                    {/* Calendly Iframe with Dark Mode Params */}
                    <iframe 
                        src="https://calendly.com/apdigitalagency/30-minute-landing-page-consultation-1?back=1&month=2025-11&hide_gdpr_banner=1&background_color=111111&text_color=ffffff&primary_color=B9935B"
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        title="Calendly Scheduling Page"
                        className="w-full h-full pt-8" // pt-8 to clear the close button bar
                    ></iframe>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default HomeContact;