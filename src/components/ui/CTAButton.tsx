"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Exact font stack from your header.tsx
  const fonts = {
    header: "'Kanit', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    body: "'Inter', sans-serif",
  };

  // Nav items from CTAButton
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Lab', href: '/lab' },
    { name: 'Contact', href: '/contact' },
  ];

  // Exact styles from header.tsx
  const navTextStyle = "uppercase tracking-widest text-sm font-semibold"; 
  const buttonTextStyle = "uppercase tracking-widest text-sm font-bold";

  return (
    <div className="relative w-full z-50"> 
      
      {/* ======================= 
          DESKTOP HEADER (Exactly like header.tsx)
      ======================== */}
      <header className="hidden md:flex fixed top-3 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1400px] h-16 backdrop-blur-md bg-black/90 border border-white/5 z-50 items-center px-8 shadow-2xl shadow-black/20">
        
        {/* Logo Container */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6">
          <div className="relative h-24 w-24 transition-transform hover:scale-105">
            <Image 
              src="/images/logo.png" 
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Navigation Items (Swapped for Home, Work, Lab, Contact) */}
        <div className="flex flex-1 justify-center">
          <ul className="flex space-x-6 lg:space-x-10 items-center">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  style={{ fontFamily: fonts.body }}
                  className={`text-white/90 hover:text-[#B9935B] transition-all duration-300 ${navTextStyle} hover:tracking-[0.15em] ${pathname === item.href ? "text-[#B9935B]" : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Contact Button */}
        <div className="absolute right-2 md:right-4">
          <Link 
            href="/contact" 
            style={{ fontFamily: fonts.body }}
            className={`bg-[#B9935B] text-black px-6 py-3 hover:bg-[#cfa66b] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_15px_rgba(185,147,91,0.2)] hover:shadow-[0_0_25px_rgba(185,147,91,0.4)] ${buttonTextStyle}`}
          >
            Contact
            <ArrowRight className="h-4 w-4 stroke-[3px]" />
          </Link>
        </div>
      </header>

      {/* ======================= 
          MOBILE HEADER (Exactly like header.tsx)
      ======================== */}
      <header className="md:hidden fixed top-3 left-1/2 transform -translate-x-1/2 w-[94%] max-w-[500px] h-16 backdrop-blur-xl bg-black/60 z-50 flex items-center px-4 border border-white/10 shadow-lg">
        <div className="relative h-14 w-14 shrink-0">
          <Image 
            src="/images/logo.png" 
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/contact"
            style={{ fontFamily: fonts.body }}
            className={`bg-[#B9935B] text-black px-4 py-2 text-xs flex items-center gap-1 hover:bg-[#cfa66b] transition-colors whitespace-nowrap ${buttonTextStyle}`}
          >
            Contact
            <ArrowRight className="h-3 w-3 stroke-[3px]" />
          </Link>
          
          <button 
            className="p-2 -mr-2 text-white hover:text-[#B9935B] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </header>

      {/* ======================= 
          MOBILE MENU OVERLAY (Exactly like header.tsx)
      ======================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 bg-black z-40 overflow-y-auto"
            style={{ fontFamily: fonts.body }}
          >
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[0]" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
              <div className="h-24"></div>
              <div className="px-6 pb-12 flex-1 flex flex-col">
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4 mb-6 opacity-60">
                    <div className="h-px flex-1 bg-[#B9935B]"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B9935B]" style={{ fontFamily: fonts.mono }}>Navigation</span>
                    <div className="h-px flex-1 bg-[#B9935B]"></div>
                  </div>
                  
                  {navItems.map((item, index) => (
                    <Link 
                      key={index}
                      href={item.href}
                      className={`block w-full text-center py-4 bg-[#B9935B] border border-white/5 text-black font-bold uppercase tracking-widest text-lg`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link
                    href="/contact"
                    className={`flex items-center justify-center gap-3 w-full py-5 bg-[#B9935B] text-black rounded-lg ${buttonTextStyle} text-base`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Project
                    <ArrowRight className="h-5 w-5 stroke-[3px]" />
                  </Link>
                  <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest" style={{ fontFamily: fonts.mono }}>
                    AP Agency © {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;