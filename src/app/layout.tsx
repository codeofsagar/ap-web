import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

import { ReactLenis } from "lenis/react";
import { Analytics } from "@vercel/analytics/next";
import CTAButton from "@/components/ui/CTAButton";
import { saans } from "@/fonts";
import { FooterProvider } from "@/contexts/footer-context";
import DocumentTitleChanger from "@/components/layout/DocumentTitleChanger";
import { metadata } from "./metadata";
import FooterWrapper from "@/components/layout/FooterWrapper";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { InitialLoadProvider } from "@/contexts/initial-load-context";
import { AuroraBackground } from "@/components/ui/aura";
export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Kanit:wght@700&display=swap"
      rel="stylesheet" />
        </head>
        <ReactLenis root options={{ 

        
          
        }}>
          <InitialLoadProvider>
            <FooterProvider>
              <body
                className={`${saans.className} antialiased  text-neutral-900 bg-black dark:bg-zinc-900`}
              >
               
                <LoadingScreen />
                <DocumentTitleChanger />
                
                <CTAButton />
                {children}
                <FooterWrapper />
                <Analytics />
                
              </body>
            </FooterProvider>
          </InitialLoadProvider>
        </ReactLenis>
      </html>
    </ViewTransitions>
  );
}
