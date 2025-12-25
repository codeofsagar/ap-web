// components/Guarantee.tsx
"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

const Guarantee = () => {
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
    mono: { fontFamily: "'IBM Plex Mono', monospace" },
    body: { fontFamily: "'Inter', sans-serif" },
  };

  return (
    // 1. WRAPPER: Used <section>, w-full, py-24 instead of margins
    // 2. THEME: Explicitly set to 'light' (White Navbar) because the background is white
    <section 
      className="w-full bg-white py-14 relative z-10" 
      data-nav-theme="dark"
    >
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-20"> 
          
          {/* Left Side: Content */}
          <div className="max-w-5xl">
            <h3 
              className="text-6xl md:text-7xl mb-8 leading-[0.9] text-black" 
              style={fonts.display}
            >
              THE <span className="text-[#B9935B]">IRON-CLAD</span> <br/> REVENUE GUARANTEE
            </h3>
            <p 
              className="text-2xl text-gray-600 leading-relaxed" 
              style={fonts.body}
            >
              If your new landing page doesn’t hit a <span className="text-black font-bold">10% conversion rate</span> or 
              outperform your current one within 30 days, we’ll optimize it again for <span className="text-[#B9935B] font-bold">Free</span>.
            </p>
          </div>

          {/* Right Side: Badge Card */}
          <div className="w-full lg:w-auto">
            <div className="relative border-2 border-[#B9935B] p-12 text-center bg-[#0a0a0a] -rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                <ShieldCheck size={60} className="mx-auto mb-8 text-[#B9935B]" />
                <p 
                  style={fonts.mono} 
                  className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-4"
                >
                  Risk Mitigation
                </p>
                <h4 
                  style={fonts.display} 
                  className="text-3xl text-white leading-tight"
                >
                  STILL NO RESULTS?<br />
                  <span className="text-[#B9935B]">100% MONEY BACK.</span>
                </h4>
            </div>
          </div>

      </div>
    </section>
  );
};

export default Guarantee;