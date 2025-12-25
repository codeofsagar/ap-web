// components/Star.tsx
import React from "react";

const Star = () => {
  const fonts = {
    display: { fontFamily: "'Kanit', sans-serif", fontWeight: 700 },
    mono: { fontFamily: "'IBM Plex Mono', monospace" },
    body: { fontFamily: "'Inter', sans-serif" },
  };

  return (
    // 1. WRAPPER: Changed to section, added w-full, padding, and removed 'dark-bg'
    <section 
      className="w-full bg-white  relative z-10" 
      data-nav-theme="dark"
    >
      {/* 2. CONTAINER: Handles the width restriction and centering */}
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* 3. GRID: Changed border color to gray-200 so lines are visible on white bg */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 bg-white">
          
          {/* COLUMN 1 */}
          <div className="p-12 border-r border-gray-200 hover:bg-[#B9935B] group transition-all duration-500">
            <span
              style={fonts.mono}
              className="text-md uppercase tracking-widest text-[#B9935B] group-hover:text-black"
            >
              Traffic Retention
            </span>

            <div
              style={fonts.display}
              className="text-8xl text-black my-4 group-hover:text-black"
            >
              90%
            </div>

            <p className="text-xs uppercase tracking-widest opacity-50 group-hover:text-black text-black">
              of visitors bounce in the first 3 seconds
            </p>
          </div>

          {/* COLUMN 2 */}
          <div className="p-12 border-r border-gray-200 hover:bg-[#B9935B] group transition-all duration-500">
            <span
              style={fonts.mono}
              className="text-md uppercase tracking-widest text-[#B9935B] group-hover:text-black"
            >
              Revenue Impact
            </span>

            <div
              style={fonts.display}
              className="text-8xl my-4 group-hover:text-black text-black"
            >
              3.2X
            </div>

            <p className="text-xs uppercase tracking-widest opacity-50 group-hover:text-black text-black">
              better conversion than industry averages
            </p>
          </div>

          {/* COLUMN 3 – STAR BADGE */}
          <div className="p-12 flex items-center justify-center relative overflow-hidden group">
            {/* Static Star */}
            <div className="absolute z-10 text-[#B9935B] text-5xl animate-pulse">
              ★
            </div>

            {/* Rotating Text */}
            <div className="animate-spin-slow">
              <svg
                viewBox="0 0 100 100"
                className="w-48 h-48 md:w-56 md:h-56"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text
                  className="text-black text-[7px] uppercase tracking-[0.25em]"
                  style={fonts.mono}
                >
                  <textPath xlinkHref="#circlePath">
                    Award Winning Design • High Performance Architecture • Elite
                    Strategy •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Star;