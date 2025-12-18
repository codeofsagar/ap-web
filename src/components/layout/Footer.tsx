"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { pageTransition } from "@/constants/pageTransition";
import { ArrowUp } from "lucide-react";

const COLORS = {
  gold: "#B9935B",
  black: "#050505",
  white: "#FFFBF6"
};

function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useTransitionRouter();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect for the massive text at the bottom
    gsap.fromTo(
      ".footer-brand-text",
      { y: -40 },
      {
        y: 0,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1.5,
        },
      }
    );
  }, { scope: footerRef });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) return; // Let smooth scroll handle anchors
    e.preventDefault();
    if (pathname === href) return;
    router.push(href, { onTransitionReady: pageTransition });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-[#050505] text-[#FFFBF6] pt-16 md:pt-24 overflow-hidden relative border-t border-[#1a1a1a]"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      {/* 1. Main Call to Action Area (Original Header Logic) */}
      <div className="container max-w-8xl mx-auto px-4 md:px-6 lg:px-12 mb-12 md:mb-20 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-10">
          <div>
            <p 
              className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4"
              style={{ 
                fontFamily: '"IBM Plex Mono", monospace', 
                color: COLORS.gold 
              }}
            >
              [ Start a Project ]
            </p>
            <h2 
              className="text-[clamp(3rem,8vw,7.5rem)] leading-[0.85] uppercase"
              style={{ 
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 900 
              }}
            >
              Ready to <br />
              <span style={{ color: COLORS.gold }}>Scale Up?</span>
            </h2>
          </div>
          
          <div className="group relative w-full lg:w-auto">
             <a 
                href="mailto:info@apagency.ca"
                className="flex items-center gap-4 text-xl md:text-3xl lg:text-4xl uppercase border-b border-[#B9935B]/50 pb-4 group-hover:border-[#B9935B] transition-all duration-300"
                style={{ 
                  fontFamily: "'Kanit', sans-serif",
                  fontWeight: 900 
                }}
             >
                info@apagency.ca
                <IconArrowUpRight 
                    className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 text-[#B9935B]" 
                />
             </a>
          </div>
        </div>
      </div>

      {/* 2. Architectural Grid Info (Merging Content from Original Footer) */}
      <div className="border-t border-[#B9935B]/30 relative z-10 bg-[#050505]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#B9935B]/20">
            
            {/* Col 1: Headquarters & Logo */}
            <div className="py-12 lg:pr-12">
                <div className="mb-8">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 ">
                    <Image
                      src="/images/foot.png"
                      alt="AP Agency Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h4 className="text-[10px] uppercase text-gray-500 tracking-widest mb-4 font-mono">HEADQUARTERS</h4>
                <div className="text-gray-400 leading-relaxed text-sm font-light font-mono space-y-1">
                    <p>10330 Yonge St, Richmond Hill</p>
                    <p>ON L4C 5N1, Canada</p>
                    <a href="tel:6474240504" className="block mt-4 text-[#B9935B] hover:text-white transition-colors">(647) 424-0504</a>
                </div>
            </div>

            {/* Col 2: Sitemap */}
            <div className="py-12 md:px-12">
                <h4 className="text-[10px] uppercase mb-8 tracking-widest font-mono text-[#B9935B]">Sitemap</h4>
                <ul className="space-y-4">
                    {[
                        { name: "Home", href: "/" },
                        { name: "Our Work", href: "/work" },
                        { name: "Lab", href: "/lab" },
                        { name: "Contact", href: "/contact" }
                    ].map((item) => (
                        <li key={item.name}>
                            <Link 
                                href={item.href} 
                                onClick={(e) => handleLinkClick(e, item.href)}
                                className="text-base md:text-lg hover:text-[#B9935B] transition-colors inline-block font-semibold uppercase tracking-tight"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Col 3: Capabilities */}
            <div className="py-12 md:px-12">
                <h4 className="text-[10px] uppercase mb-8 tracking-widest font-mono text-[#B9935B]">Capabilities</h4>
                <ul className="space-y-4">
                    {[
                      "Personal Branding", "UX / Development", "Digital Design", 
                      "Video Production", "Strategy & Ads"
                    ].map((item) => (
                        <li key={item} className="text-sm md:text-base text-gray-400 font-mono">
                           {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Col 4: Socials & Back to Top */}
            <div className="py-12 md:pl-12 flex flex-col justify-between">
                <div>
                    <h4 className="text-[10px] uppercase mb-8 tracking-widest font-mono text-[#B9935B]">Socials</h4>
                    <a 
                      href="https://www.instagram.com/ap.digitalagency/" 
                      target="_blank" 
                      className="group flex items-center gap-2 text-base md:text-lg hover:text-[#B9935B] transition-colors font-semibold uppercase"
                    >
                        Instagram <IconArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>
                
                <div className="mt-12">
                    <button 
                      onClick={scrollToTop}
                      className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#B9935B] hover:text-white transition-colors font-mono"
                    >
                      Back to Top <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <p className="text-[10px] text-gray-600 mt-6 font-mono">
                        &copy; {currentYear} AP Agency Inc.<br/>Richmond Hill, ON.
                    </p>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Massive Brand Watermark (With GSAP Parallax) */}
      <div 
        className="border-t border-[#B9935B]/30 overflow-hidden w-full relative z-10"
        style={{ backgroundColor: COLORS.gold }}
      >
        <div className="footer-brand-text flex justify-center w-full pt-6 pb-2">
            <h1 
              className="text-[18vw] uppercase text-[#050505] mix-blend-multiply leading-none select-none tracking-tighter"
              style={{ 
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 900 
              }}
            >
                AP Agency
            </h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer;