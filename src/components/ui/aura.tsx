"use client";

import { cn } from "../../lib/utlis";
import React ,{ useState, useEffect } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const [isMobile, setIsMobile] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

     useEffect(() => {
        // Detect mobile devices
        const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
        setIsMobile(isMobileDevice);
        
        // Mark as loaded after initial render
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
      }, []);
    
      // Simplified gradient for mobile
      const mobileGradient = "linear-gradient(250deg, #222230 0%, #0a0808 30%, #534c4c 60%, #3a3535 80%, #B9935B 100%)";
  return (
    <div
      className={cn(
        "relative flex flex-col bg-zinc-900 dark:bg-zinc-900 w-full",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora": isMobile 
              ? mobileGradient: "repeating-linear-gradient(100deg, #0a0808 30%, #1a1a1d 15%, #2d2828 10%, #302a2a 25%, #a78554 40%)",
            "--dark-gradient": "repeating-linear-gradient(100deg, #000 0%, #2b2727 7%, transparent 10%, transparent 12%, #000 16%)",
            "--blue-300": "#454f5a",
            "--blue-400": "#5e6266",
            "--blue-500": "#363d44",
            "--indigo-300": "#7d829b",
            "--violet-200": "#af8c58",
            "--black": "#000000",
            "--white": "#f7eeee",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[12px] opacity-60 blur-[51px] invert filter will-change-transform 
            [--aurora:repeating-linear-gradient(250deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] 
            [--dark-gradient:repeating-linear-gradient(250deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] 
            after:absolute after:inset-0 after:mix-blend-difference after:content-[""] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
            `[background-image:var(--dark-gradient),var(--aurora)] [background-size:200%,_200%] [background-position:50%_50%,50%_50%]`, 
            `after:[background-size:200%,_100%] after:[background-attachment:fixed]`,
            !isMobile && `after:animate-aurora`,
            showRadialGradient && `[mask-image:radial-gradient(ellipse_at_0%_0%,black_40%,var(--transparent)_70%)]`,
          )}
        ></div>
         
        
        {/* Updated linear gradient direction */}
        <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(to_top,rgba(175, 171, 171, 0.8)_0%,rgba(175, 171, 171, 0.8)_70%,transparent_100%)]" />
        
        {/* Updated radial position to bottom */}
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_at_0%_100%,rgba(0, 0, 0, 0.8)_0%,rgba(15, 14, 14, 0.8)_100%)]" />
        
      </div>
     <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};