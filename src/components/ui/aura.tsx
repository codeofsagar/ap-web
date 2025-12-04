"use client";

import { cn } from "../../lib/utlis";
import React, { useState, useEffect } from "react";

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
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mobile: Very dark gradient
  const mobileGradient =
    "linear-gradient(250deg, #09090b 0%, #000000 20%, #18181b 40%, #09090b 70%, #453625 100%)";

  return (
    <div
      className={cn(
        // Switched to bg-zinc-950 for the deepest possible base color
        "relative flex flex-col bg-zinc-900 dark:bg-zinc-800 w-full",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora": isMobile
              ? mobileGradient
              : "repeating-linear-gradient(100deg, #09090b 30%, #18181b 15%, #18181b 10%, #27272a 25%, #5c4a30 60%)", // Very dark bronze
            "--dark-gradient":
              "repeating-linear-gradient(100deg, #000 0%, #09090b 7%, transparent 10%, transparent 12%, #000 16%)",
            "--blue-300": "#333b45", // Dark Steel
            "--blue-400": "#3f434a", // Dark Steel
            "--blue-500": "#1d2129", // Near Black
            "--indigo-300": "#4b4e57", // Dark Grey
            "--violet-200": "#6b5739", // Dark Bronze/Brown
            "--black": "#000000",
            "--white": "#71717a", // Zinc-500 (Much darker "white" point lowers the blend intensity)
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            // Opacity 40: Low visibility, very subtle
            `after:animate-aurora pointer-events-none absolute -inset-[12px] opacity-40 blur-[21px] invert filter will-change-transform 
            [--aurora:repeating-linear-gradient(250deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] 
            [--dark-gradient:repeating-linear-gradient(250deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] 
            after:absolute after:inset-0 after:mix-blend-difference after:content-[""] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
            `[background-image:var(--dark-gradient),var(--aurora)] [background-size:200%,_200%] [background-position:50%_50%,50%_50%]`,
            `after:[background-size:200%,_100%] after:[background-attachment:fixed]`,
            !isMobile && `after:animate-aurora`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>

        {/* Heavy dark fog at the bottom (opacity 0.8) to fade into pure black */}
        <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(to_top,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.5)_50%,transparent_100%)]" />

        {/* Strong radial shadow */}
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_at_0%_100%,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0)_100%)]" />
      </div>
      <div
        className={`relative z-10 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};