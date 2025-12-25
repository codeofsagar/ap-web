// components/Header.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, CornerDownRight, ExternalLink, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useBackgroundTheme } from './BackgroundContext'; 

// ... (Keep your interfaces NavItem, ServiceItem, Fonts here) ...
interface NavItem { name: string; href: string; }
interface ServiceItem { name: string; href: string; desc: string; num: string; external: boolean; }
interface Fonts { header: string; mono: string; body: string; }

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState<boolean>(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const { theme, updateTheme } = useBackgroundTheme();

  // ==========================================
  //  THE NEW "LASER ACCURATE" LOGIC
  // ==========================================
  // Inside components/Header.tsx

  // Inside components/Header.tsx

  useEffect(() => {
    const handleScrollTheme = () => {
      // 1. Check points: Left, Center, Right to catch columns
      const pointsToCheck = [
        window.innerWidth * 0.1,
        window.innerWidth * 0.5,
        window.innerWidth * 0.9
      ];
      const y = 20; // Just below the top edge
      
      let foundDark = false;

      // Loop through the 3 horizontal points
      for (const x of pointsToCheck) {
        const elements = document.elementsFromPoint(x, y);
        
        // Loop through the stack of elements at this point
        for (const el of elements) {
          // SKIP the header, the mobile menu, and the BODY/HTML tags
          // (This prevents the body's bg-black from triggering the theme)
          if (
            el.tagName === 'HEADER' || 
            el.tagName === 'BODY' || 
            el.tagName === 'HTML' ||
            el.hasAttribute('data-mobile-menu')
          ) {
            continue;
          }

          // CHECK FOR DARK THEME MARKERS
          // We removed '.bg-black' from here so it doesn't auto-detect the body
          const isDark = el.closest('.dark-bg, .bg-dark, [data-nav-theme="dark"]');
          
          // CHECK FOR LIGHT THEME MARKERS
          const isLight = el.closest('[data-nav-theme="light"]');

          // PRIORITY LOGIC:
          // If we found a light marker inside a dark section, it's Light.
          if (isLight && (!isDark || isLight.contains(isDark as Node))) {
            break; // Stop checking this point, it's light
          }

          // If we found a dark marker (and no inner light marker overrides it)
          if (isDark) {
            foundDark = true;
            break; // Stop checking this point, we found a dark trigger
          }
        }

        if (foundDark) break; // If any point is dark, the header becomes dark
      }

      // 2. APPLY THEME
      if (foundDark) {
        updateTheme('dark');
      } else {
        updateTheme('light'); // Default to white
      }
    };

    window.addEventListener('scroll', handleScrollTheme);
    handleScrollTheme(); // Run on mount

    return () => window.removeEventListener('scroll', handleScrollTheme);
  }, [pathname, updateTheme]);

   

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ... (Rest of your component: fonts, navItems, style definitions, and the return JSX) ...
  // ... Paste the rest of your existing Header code below this line ...

  const fonts: Fonts = {
    header: "'Kanit', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    body: "'Inter', sans-serif",
  };

  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Lab', href: '/lab' },
  ];

  const servicesItems: ServiceItem[] = [
    { name: 'Landing Page Lead Booster', href: '/', desc: 'Custom-built landing page proven to convert cold traffic into leads', num: "01", external: false },
    { name: 'Lead Booster', href: 'https://social-engine-nu.vercel.app/', desc: 'Maximize lead generation velocity', num: "02", external: true },
    { name: 'AdCraft', href: 'https://ap-video.vercel.app/', desc: 'High-velocity video asset production', num: "03", external: true },
  ];

  const navTextStyle = "uppercase tracking-widest text-sm font-semibold";
  const buttonTextStyle = "uppercase tracking-widest text-sm font-bold";

  // Theme classes based on current theme
  const getThemeClasses = () => {
    return {
      // Desktop Header
      desktop: {
        container: theme === 'light' 
          ? 'bg-white text-black border-black/10 shadow-lg' 
          : 'bg-black text-white border-white/5 shadow-xl',
        navItem: theme === 'light' 
          ? 'text-black hover:text-[#B9935B]' 
          : 'text-white hover:text-[#B9935B]',
        navItemActive: 'text-[#B9935B]',
        servicesDropdown: theme === 'light'
          ? 'bg-white/95 border-black/10 backdrop-blur-md text-black' 
          : 'bg-black/90 border-white/5 backdrop-blur-md text-white',
        servicesDesc: theme === 'light'
          ? 'text-gray-700' 
          : 'text-gray-500',
      },
      // Mobile Navbar (top bar)
      mobileNavbar: {
        container: theme === 'light' 
          ? 'bg-white text-black border-black/10 shadow-lg' 
          : 'bg-black text-white border-white/10 shadow-lg',
      }
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="relative w-full z-50">
      
      {/* ======================= 
          DESKTOP HEADER
      ======================== */}
      <header className={`hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1400px] h-16 backdrop-blur-md border z-50 items-center px-8 transition-all duration-300 ${themeClasses.desktop.container} ${scrolled ? 'top-2' : 'top-4'}`}>
        
        <div className="absolute top-1/2 -translate-y-1/2 left-6">
          <div className="relative h-24 w-24 transition-transform hover:scale-105">
            <Image 
              src="/images/logo.png" 
              alt="Logo" 
              fill 
              className="object-contain" 
              priority 
              sizes="96px"
            />
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          <ul className="flex space-x-6 lg:space-x-10 items-center">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  style={{ fontFamily: fonts.body }}
                  className={`transition-all duration-300 ${navTextStyle} hover:tracking-[0.15em] ${
                    pathname === item.href 
                      ? themeClasses.desktop.navItemActive 
                      : themeClasses.desktop.navItem
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li 
              className="relative group h-16 flex items-center"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                style={{ fontFamily: fonts.body }}
                className={`transition-all duration-300 flex items-center gap-1 h-full ${navTextStyle} hover:tracking-[0.15em] ${
                  servicesDropdownOpen 
                    ? themeClasses.desktop.navItemActive 
                    : themeClasses.desktop.navItem
                }`}
              >
                Services
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-300 ${
                    servicesDropdownOpen 
                      ? 'rotate-180 text-[#B9935B]' 
                      : ''
                  }`} 
                />
              </button>
              
              <div 
                className={`absolute left-1/2 -translate-x-1/2 top-[90%] w-[380px] border shadow-2xl p-2 transition-all duration-300 origin-top ${
                  servicesDropdownOpen 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 -translate-y-4 invisible'
                } ${themeClasses.desktop.servicesDropdown}`}
              >
                <div className="space-y-1 p-2 text-left">
                  {servicesItems.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      target={service.external ? "_blank" : "_self"}
                      rel={service.external ? "noopener noreferrer" : ""}
                      className={`block p-3 rounded-lg transition-all group/item border-l-2 border-transparent hover:border-[#B9935B] ${
                        theme === 'light' 
                          ? 'hover:bg-black/5' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span 
                          className="text-lg font-black text-[#B9935B]/40 group-hover/item:text-[#B9935B]" 
                          style={{ fontFamily: fonts.header }}
                        >
                          {service.num}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 
                              className="font-bold text-sm group-hover/item:text-[#B9935B]" 
                              style={{ fontFamily: fonts.header }}
                            >
                              {service.name}
                            </h4>
                            {service.external ? (
                              <ExternalLink className="h-3 w-3 text-[#B9935B] opacity-40" />
                            ) : (
                              <CornerDownRight className="h-4 w-4 text-[#B9935B] opacity-0 group-hover/item:opacity-100 transition-all" />
                            )}
                          </div>
                          <p 
                            className={`text-[10px] uppercase tracking-wider mt-0.5 ${themeClasses.desktop.servicesDesc}`} 
                            style={{ fontFamily: fonts.body }}
                          >
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>

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
          MOBILE HEADER
      ======================== */}
      <header className={`md:hidden fixed top-3 left-1/2 transform -translate-x-1/2 w-[94%] max-w-[500px] h-16 backdrop-blur-xl z-50 flex items-center px-4 border shadow-lg transition-colors duration-300 ${themeClasses.mobileNavbar.container}`}>
        <div className="relative h-16 w-16 shrink-0">
          <Image 
            src="/images/logo.png" 
            alt="Logo" 
            fill 
            className="object-contain" 
            priority 
            sizes="64px"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link 
            href="/contact" 
            style={{ fontFamily: fonts.body }}
            className={`bg-[#B9935B] text-black px-6 py-2.5 hover:bg-[#cfa66b] transition-all flex items-center gap-2 shadow-lg ${buttonTextStyle}`}
          >
            Contact
            <ArrowRight className="h-4 w-4 stroke-[3px]" />
          </Link>
          
          <button 
            className={`p-2 -mr-2 transition-colors ${
              theme === 'light' 
                ? 'text-black hover:text-[#B9935B]' 
                : 'text-white hover:text-[#B9935B]'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </header>
    
    {/* ... (Mobile Menu Overlay code remains exactly the same as before) ... */}
    <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 bg-black z-40 overflow-y-auto"
            style={{ fontFamily: fonts.body }}
          >
            {/* ... Rest of your mobile menu code ... */}
            <div 
              className="fixed inset-0 pointer-events-none opacity-[0.04] z-[0]" 
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
              }}
            />

            <div className="relative z-10 flex flex-col min-h-screen">
              <div className="h-24"></div>
              <div className="px-6 pb-12 flex-1 flex flex-col">
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4 mb-6 opacity-60">
                    <div className="h-px flex-1 bg-[#B9935B]"></div>
                    <span 
                      className="text-[10px] uppercase tracking-[0.2em] text-[#B9935B]" 
                      style={{ fontFamily: fonts.mono }}
                    >
                      Navigation
                    </span>
                    <div className="h-px flex-1 bg-[#B9935B]"></div>
                  </div>
                  
                  {/* Standard Nav Blocks */}
                  {navItems.map((item, index) => (
                    <Link 
                      key={index} 
                      href={item.href} 
                      className="block w-full text-center py-4 bg-[#B9935B] border border-white/5 text-black font-bold uppercase tracking-widest text-lg transition-colors active:bg-[#cfa66b] hover:bg-[#cfa66b]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Services Accordion Block */}
                  <div className="relative">
                    <button 
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-center gap-4 w-full text-center py-4 bg-white/5 border border-white/10 text-[#B9935B] font-bold uppercase tracking-widest text-lg transition-colors active:bg-[#B9935B]/10 hover:bg-white/10"
                    >
                      Services
                      <ChevronDown 
                        className={`h-5 w-5 transition-transform duration-300 ${
                          mobileServicesOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white/[0.02] border-x border-white/5"
                        >
                          <div className="p-2 space-y-2">
                            {servicesItems.map((service, index) => (
                              <Link 
                                key={index} 
                                href={service.href} 
                                target={service.external ? "_blank" : "_self"}
                                rel={service.external ? "noopener noreferrer" : ""}
                                className="block w-full p-4 border border-white/5 text-left bg-black/40 transition-colors active:bg-black/60 hover:bg-black/60"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[#B9935B] font-mono text-xs">
                                    {service.num}
                                  </span>
                                  {service.external && (
                                    <ExternalLink className="h-3 w-3 text-[#B9935B]/50" />
                                  )}
                                </div>
                                <h4 className="text-white font-bold uppercase tracking-wider text-sm mt-1">
                                  {service.name}
                                </h4>
                                <p className="text-[10px] text-gray-500 uppercase mt-1 leading-tight">
                                  {service.desc}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link 
                    href="/contact" 
                    className={`flex items-center justify-center gap-3 w-full py-5 bg-[#B9935B] text-black ${buttonTextStyle} text-base transition-colors active:bg-[#cfa66b] hover:bg-[#cfa66b]`} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Project
                    <ArrowRight className="h-5 w-5 stroke-[3px]" />
                  </Link>
                  <p 
                    className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest" 
                    style={{ fontFamily: fonts.mono }}
                  >
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