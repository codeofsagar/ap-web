"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { pageTransition } from "@/constants/pageTransition";

import { ArrowUpRight, ArrowUp } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const router = useTransitionRouter();
  const currentYear = new Date().getFullYear();

  // --- Font Configuration ---
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 }, // Headers
    mono: { fontFamily: "'IBM Plex Mono', monospace" }, // Nav / Specs / Tech
    body: { fontFamily: "'Inter', sans-serif" }, // Legal / Small text
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (pathname === href) return;
    router.push(href, { onTransitionReady: pageTransition });
  };

  return (
    <footer className="w-full bg-[#050505] text-white pt-20 md:pt-32 pb-8 overflow-hidden relative border-t border-[#1a1a1a]">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ 
               backgroundImage: 'linear-gradient(#B9935B 1px, transparent 1px), linear-gradient(90deg, #B9935B 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="max-w-[95%] mx-auto relative z-10">
        
        {/* --- TOP SECTION: CTA --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-[#B9935B] uppercase tracking-widest text-xs md:text-sm mb-2" style={fonts.mono}>
              [ Start a Project ]
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-white" style={fonts.display}>
              READY TO <br />
              <span className="text-[#B9935B]">SCALE UP?</span>
            </h2>
          </div>

          <a 
            href="mailto:info@apagency.ca"
            className="group relative flex items-center justify-center w-full md:w-auto px-8 py-12 md:px-16 md:py-16 rounded-full border border-[#333] hover:border-[#B9935B] hover:bg-[#B9935B] transition-all duration-500"
          >
            <span className="text-xl md:text-3xl group-hover:text-black transition-colors duration-300" style={fonts.mono}>
              info@apagency.ca
            </span>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
               <ArrowUpRight className="w-6 h-6 text-black" />
            </div>
          </a>
        </div>

        {/* --- MIDDLE SECTION: GRID LINKS --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-t border-[#1a1a1a] pt-12 md:pt-16 mb-20">
          
          {/* Col 1: Address */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-xs uppercase text-gray-500 tracking-widest" style={fonts.mono}>HEADQUARTERS</h4>
            <div className="flex flex-col gap-1 text-sm md:text-base text-gray-300" style={fonts.mono}>
              <p>10330 Yonge St,</p>
              <p>Richmond Hill, ON</p>
              <p>L4C 5N1, Canada</p>
            </div>
            <div className="flex flex-col gap-1 text-sm md:text-base text-gray-300 mt-4" style={fonts.mono}>
              <a href="tel:+16474240504" className="hover:text-[#B9935B] transition-colors">(647) 424-0504</a>
            </div>
          </div>

          {/* Col 2: Sitemap */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-xs uppercase text-gray-500 tracking-widest" style={fonts.mono}>SITEMAP</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Home", href: "/" },
                { name: "Our Work", href: "/work" },
                { name: "Services", href: "/#services" }, // Assuming services is on home or separate
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="group flex items-center gap-2 text-lg text-white hover:text-[#B9935B] transition-colors"
                    style={fonts.mono}
                  >
                    <span className="w-1.5 h-1.5 bg-[#333] group-hover:bg-[#B9935B] transition-colors rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services List */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-xs uppercase text-gray-500 tracking-widest" style={fonts.mono}> CAPABILITIES</h4>
            <ul className="flex flex-col gap-3">
              {[
                "Personal Branding",
                "UX / Development",
                "Digital Design",
                "Video Production",
                "Strategy & Ads"
              ].map((item) => (
                <li key={item} className="text-gray-400 text-sm md:text-base" style={fonts.mono}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Socials */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-xs uppercase text-gray-500 tracking-widest" style={fonts.mono}> SOCIALS</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a 
                  href="https://www.instagram.com/ap.digitalagency/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-white hover:text-[#B9935B] transition-colors"
                  style={fonts.mono}
                >
                  Instagram <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              {/* Add other socials here if needed */}
            </ul>
            
            <button 
              onClick={scrollToTop}
              className="mt-auto self-start group flex items-center gap-2 text-xs uppercase tracking-widest text-[#B9935B] hover:text-white transition-colors"
              style={fonts.mono}
            >
              Back to Top <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* --- BOTTOM SECTION: MASSIVE SIGNATURE --- */}
        <div className="relative border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row justify-between items-end md:items-center">
          
          {/* Legal */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:mb-0 order-2 md:order-1">
            <p className="text-neutral-600 text-xs" style={fonts.body}>
              &copy; {currentYear} AP Agency Inc.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors" style={fonts.body}>Privacy Policy</a>
              <a href="#" className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors" style={fonts.body}>Terms & Conditions</a>
            </div>
          </div>

          {/* Location Time Stub (Visual) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#111] rounded border border-[#333] order-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-xs text-gray-400" style={fonts.mono}>OPERATIONAL / RICHMOND HILL</span>
          </div>

        </div>

        {/* MASSIVE BRANDING */}
        <div className="w-full text-center mt-12 md:mt-24 select-none pointer-events-none">
          <h1 
            className="text-[14vw] leading-[0.8] text-[#111] font-bold tracking-tighter mix-blend-difference"
            style={{ ...fonts.display, color: "#B9935B", textShadow: "-1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222" }}
          >
            AP AGENCY
          </h1>
        </div>

      </div>
    </footer>
  );
}