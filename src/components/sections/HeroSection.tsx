"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


import { Link } from "next-view-transitions"; // Using Link as requested
import { ArrowRight } from "lucide-react"; // Imported for the button icon
import HeroGradient from '../ui/HeroGradient';

interface WebsiteImage {
  id: number;
  title: string;
  url: string;
  alt: string;
}

const HeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
 

  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
    mono: { fontFamily: "'IBM Plex Mono', monospace" },
    body: { fontFamily: "'Inter', sans-serif" },
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 1024);
      const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const websiteImages: WebsiteImage[] = [
    { id: 1, title: "3XSR", url: "/3xr/1.png", alt: "Portfolio website for 3XSR" },
    { id: 2, title: "AP Video Ad Agency", url: "/video/1.png", alt: "Services website for AP Video Ad Agency" },
    { id: 3, title: "Brass Knuckles", url: "/ecom/1.png", alt: "E-commerce website for Brass Knuckles" },
    { id: 4, title: "Balanced Pitch", url: "/music/1.png", alt: "Music website for Balanced Pitch" },
    { id: 5, title: "AP Merchandise", url: "/mer/1.png", alt: "Landing page for AP Merchandise" },
    { id: 6, title: "Toronto Delivery Company", url: "/tdg/1.png", alt: "Services website for Toronto Delivery Company" }
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % websiteImages.length);
    }, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [websiteImages.length]);

  const getImagePosition = (index: number) => {
    const current = currentImage;
    const total = websiteImages.length;
    const relativeIndex = (index - current + total) % total;

    if (isDesktop) {
      if (relativeIndex === 0) return { zIndex: 50, opacity: 1, scale: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, filter: 'brightness(1) blur(0px)' };
      if (relativeIndex === 1) return { zIndex: 40, opacity: 1, scale: 0.94, x: 60, y: 10, rotateY: -18, rotateX: 2, filter: 'brightness(0.9) blur(0.5px)' };
      if (relativeIndex === 2) return { zIndex: 30, opacity: 1, scale: 0.88, x: 120, y: 20, rotateY: -30, rotateX: 4, filter: 'brightness(0.75) blur(1px)' };
      return { zIndex: 20, opacity: 1, scale: 0.85, x: 150, y: 30, rotateY: -45, rotateX: 5, filter: 'brightness(0.6) blur(2px)' };
    } else {
      if (relativeIndex === 0) return { zIndex: 50, opacity: 1, scale: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, filter: 'brightness(1) blur(0px)' };
      if (relativeIndex === 1) return { zIndex: 40, opacity: 0.85, scale: 0.94, x: 30, y: 10, rotateY: -18, rotateX: 2, filter: 'brightness(0.9) blur(0.5px)' };
      if (relativeIndex === 2) return { zIndex: 30, opacity: 0.7, scale: 0.88, x: 60, y: 20, rotateY: -30, rotateX: 4, filter: 'brightness(0.75) blur(1px)' };
      return { zIndex: 20, opacity: 0, scale: 0.85, x: 90, y: 30, rotateY: -45, rotateX: 5, filter: 'brightness(0.6) blur(2px)' };
    }
  };

  const transitionSettings = { duration: 0.8, ease: "easeInOut" as const };

  return (
    <section className="relative w-full  overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0 pointer-events-none h-[100vh]">
        <HeroGradient />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-20 py-30 md:py-12 min-h-screen flex flex-col justify-center md:gap-12 gap-0" style={fonts.body}>
        
       
          <motion.div 
          className="w-full text-center mb-8 md:mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase mt-0 md:mt-16 " 
            style={{ 
              color: "#B9935B", 
              ...fonts.display,
              textShadow: "0px 10px 30px rgba(185, 147, 91, 0.2)" // Adds slight depth to the large text
            }}
          >
            Landing Page <br /> Lead Booster
          </motion.h2>
          
          {/* Subtext: by ap agency */}
          <motion.p 
            className="text-sm md:text-base lg:text-lg  uppercase text-gray-400 mt-4 md:mt-6"
            style={fonts.mono}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            by ap agency
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            className="space-y-6 md:space-y-8 w-full text-center lg:text-left order-2 lg:order-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-4 md:space-y-9">
              <motion.h1 className="text-3xl md:text-7xl font-bold text-white" style={fonts.display}>
                Turn <span style={{ color: "#B9935B" }}>Clicks </span>
                Into <span style={{ color: "#B9935B" }}>Clients</span>.
              </motion.h1>

              <div className="space-y-2 md:space-y-4">
                <p className="text-lg md:text-xl lg:text-2xl text-white font-semibold">Custom-built landing page proven</p>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300">to convert cold traffic into leads.</p>
              </div>
            </div>

            {/* Updated High-End Link Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }} className="pt-4 flex justify-center lg:justify-start">
              <Link 
                href="/contact"
                className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#B9935B] text-black overflow-hidden hover:scale-105 hover:shadow-[0_0_50px_rgba(185,147,91,0.6)] shadow-[0_0_30px_rgba(185,147,91,0.3)] transition-all duration-300"
              >
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-none animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10" />
                
                {/* Hover Fill Effect */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />

                <span 
                  className="relative z-20 font-black text-sm md:text-base uppercase tracking-[0.2em] flex items-center gap-4"
                  style={fonts.mono} 
                >
                  Build My Page Now
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Section - Image Stack */}
          <div className="w-full flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-72 md:w-full max-w-6xl h-[180px] sm:h-[280px] md:h-[400px]">
              {websiteImages.map((image, index) => {
                const position = getImagePosition(index);
                const isCurrent = index === currentImage;
                return (
                  <motion.div
                    key={image.id}
                    className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-600/50 bg-gray-900"
                    style={{ zIndex: position.zIndex, transformStyle: "preserve-3d" }}
                    animate={position}
                    transition={transitionSettings}
                  >
                    <div className={`bg-gray-800 flex items-center ${isCurrent ? 'h-6 md:h-8 px-3 space-x-2' : 'h-4 md:h-6 px-2 space-x-1'}`}>
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-gray-700 rounded h-3 md:h-5 ml-2 flex items-center px-2">
                        <div className="text-[10px] text-gray-400 truncate" style={fonts.mono}>
                          {isCurrent ? `${image.title.toLowerCase().replace(/\s+/g, '')}.com` : 'website.com'}
                        </div>
                      </div>
                    </div>
                    <div className="h-full relative">
                      <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-4 flex flex-col justify-end">
                          <h3 className="text-white text-sm md:text-lg" style={fonts.display}>{image.title}</h3>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;