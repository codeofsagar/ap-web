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
          <link
            href="https://db.onlinewebfonts.com/c/0b5ecd0afcf95185925504cdca01f5e3?family=Druk+Wide+Cy+Web+Bold+Regular"
            rel="stylesheet"
          />
        </head>
        <ReactLenis root options={{ 

        
          
        }}>
          <InitialLoadProvider>
            <FooterProvider>
              <body
                className={`${saans.className} antialiased  text-neutral-900 bg-zinc-950 dark:bg-zinc-900`}
              >
               
                <LoadingScreen />
                <DocumentTitleChanger />
                 <AuroraBackground  >
                <CTAButton />
                {children}
                <FooterWrapper />
                <Analytics />
                </AuroraBackground>
              </body>
            </FooterProvider>
          </InitialLoadProvider>
        </ReactLenis>
      </html>
    </ViewTransitions>
  );
}
