"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, Target, TrendingUp, ArrowRight, ArrowLeft, Quote } from "lucide-react";

// --- TYPES ---
type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  rating: number;
};

// --- UTILITY COMPONENTS ---

// Custom hook for intersection observer (Replacing ScrollTrigger)
const useInView = (options = { threshold: 0.1, rootMargin: "0px" }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // Only trigger once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isInView] as const;
};

// Animated Number Component
const AnimatedNumber = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease out quartic
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      setCount(end * ease);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="inline-block">
      {end % 1 === 0 ? Math.round(count) : count.toFixed(1)}
      {suffix}
    </div>
  );
};

const AnimatedTestimonials = ({ testimonials, autoplay = false }: { testimonials: Testimonial[]; autoplay?: boolean }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 8000); // Slower rotation for readability
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-[#B9935B] fill-[#B9935B]" : "text-gray-600"}`}
      />
    ));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Image Section */}
        <div className="relative h-[400px] w-full flex items-center justify-center lg:justify-end perspective-1000">
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => {
              // Calculate offset for the card stack effect
              const isActive = index === active;
              const offset = (index - active + testimonials.length) % testimonials.length;
              
              // Only render the active and next 2 cards to save resources
              if (offset > 2 && !isActive) return null;

              return (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, scale: 0.9, x: 50, rotateY: 20 }}
                  animate={{
                    opacity: isActive ? 1 : 1 - offset * 0.3,
                    scale: isActive ? 1 : 1 - offset * 0.05,
                    x: isActive ? 0 : offset * 20,
                    z: isActive ? 0 : -offset * 10,
                    rotateY: isActive ? 0 : 5,
                    zIndex: testimonials.length - offset,
                  }}
                  exit={{ opacity: 0, scale: 0.9, x: -50, rotateY: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className={`absolute w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#2a2a2a] ${isActive ? 'shadow-[#B9935B]/20' : ''}`}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                    <img
                        src={testimonial.src}
                        alt={testimonial.name}
                        draggable={false}
                        className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-0 transition-transform duration-300">
                        <div className="flex gap-1 mb-2">
                             {renderStars(testimonial.rating)}
                        </div>
                        <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}>{testimonial.name}</h3>
                        <p className="text-[#B9935B] text-sm font-medium">{testimonial.designation}</p>
                    </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center h-full relative z-20">
            <div className="absolute -top-10 -left-10 opacity-10">
                <Quote size={120} className="text-[#B9935B]" />
            </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6 font-sans">
                &quot;
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <span key={index} className={index % 2 === 0 ? "text-white" : "text-white"}>
                    {word}{" "}
                  </span>
                ))}
                &quot;
              </h3>
              
              <div className="h-1 w-20 bg-[#B9935B] rounded-full mb-8"></div>

              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#B9935B]/30 bg-[#B9935B]/5 hover:bg-[#B9935B] transition-all duration-300"
                >
                  <ArrowLeft className="h-5 w-5 text-[#B9935B] group-hover:text-black transition-colors" />
                </button>
                <button
                  onClick={handleNext}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#B9935B]/30 bg-[#B9935B]/5 hover:bg-[#B9935B] transition-all duration-300"
                >
                  <ArrowRight className="h-5 w-5 text-[#B9935B] group-hover:text-black transition-colors" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function ReviewsSection() {
  
  // Placeholder images used for the preview. 
  const testimonials: Testimonial[] = [
    {
      quote: "Our conversion rate jumped from 2.3% to 12.8% in just two weeks. The ROI was immediate and substantial.",
      name: "Sarah Chen",
      designation: "Marketing Director, TechFlow",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop",
      rating: 5
    },
    {
      quote: "Finally, a landing page that actually converts. Clean, fast, and strategically designed. Worth every penny.",
      name: "Marcus Rodriguez",
      designation: "Founder, GrowthLab",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
      rating: 5
    },
    {
      quote: "The A/B testing and optimization made all the difference. Our cost per acquisition dropped by 40% within the first month.",
      name: "Emily Watson",
      designation: "CMO, ScaleUp Inc",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop",
      rating: 5
    },
    {
        quote: "Professional, results-driven, and backed by a solid guarantee. This is how landing pages should be done in 2024.",
        name: "David Kim",
        designation: "CEO, ConvertPro",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop",
        rating: 5
      },
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-[#B9935B]" />,
      title: "Speed Optimized",
      description: "Sub-second load times that keep visitors engaged and improve Quality Score.",
    },
    {
      icon: <Target className="w-8 h-8 text-[#B9935B]" />,
      title: "Conversion Focused",
      description: "Data-driven layouts designed specifically to turn clicks into qualified leads.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#B9935B]" />,
      title: "Continuous Testing",
      description: "We don't just launch; we iterate based on real user behavior data.",
    },
  ];

  return (
    // Background set to transparent
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
       <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-1 { animation: float-slow 4s ease-in-out infinite; animation-delay: 0s; }
        .animate-float-2 { animation: float-medium 5s ease-in-out infinite; animation-delay: 1s; }
      `}</style>

      <section id="reviews" className="w-full pt-20 pb-20 relative z-10">
        
        {/* Decorative Grid Background - Kept subtle grid for texture over black */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(#B9935B 1px, transparent 1px), linear-gradient(90deg, #B9935B 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* --- HEADER SECTION --- */}
        <div className="relative z-10 flex flex-col items-center text-center mb-20 max-w-full px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B9935B]/30 bg-[#B9935B]/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-[#B9935B] animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-[#B9935B] font-bold">Trusted by 247+ Companies</span>
            </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-2" style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}>
              Don&#39;t Send Traffic to a
            </h2>
            <h2
              className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight mb-2"
              style={{ 
                  color: 'transparent', 
                  WebkitTextStroke: '1px #B9935B',
                  textShadow: '0 0 30px rgba(185, 147, 91, 0.3)',
                  fontFamily: "Druk Wide Cy Web Bold Regular"
              }}
            >
              Glorified Brochure
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-white" style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}>
              Send it to a <span className="text-[#B9935B] underline decoration-[#B9935B] underline-offset-8">Buying Machine</span>
            </h2>
          </motion.div>

          <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            Stop burning ad spend on pages that don&apos;t convert. We build high-performance landing pages engineered to maximize your ROI.
          </p>
        </div>

        {/* --- BENEFITS GRID --- */}
        <div className="relative z-10 max-w-6xl mx-auto mb-24 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-2xl bg-[#111111] border border-[#2a2a2a] hover:border-[#B9935B]/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#B9935B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative z-10">
                    <div className="bg-[#1a1a1a] p-3 rounded-xl inline-block mb-4 group-hover:bg-[#B9935B]/20 transition-colors duration-300">
                        {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#B9935B] transition-colors" style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}>{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- STATS BAR --- */}
        <div className="relative z-10 w-full bg-[#111111] border-y border-[#2a2a2a] mb-20">
             <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-[#2a2a2a]">
                    <div className="text-center px-4">
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-mono" style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}>
                            <AnimatedNumber end={500} suffix="+" />
                        </div>
                        <div className="text-[#B9935B] text-sm uppercase tracking-widest font-semibold">Happy Clients</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-mono" style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}>
                            <AnimatedNumber end={12.8} suffix="%" />
                        </div>
                        <div className="text-[#B9935B] text-sm uppercase tracking-widest font-semibold">Avg Conv. Rate</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-mono" style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}>
                            <AnimatedNumber end={7} suffix=" Days" />
                        </div>
                        <div className="text-[#B9935B] text-sm uppercase tracking-widest font-semibold">To Launch</div>
                    </div>
                </div>
             </div>
        </div>

        {/* --- TESTIMONIALS --- */}
        <div className="relative z-10 mb-20">
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>

        {/* --- CTA SECTION --- */}
        <div className="relative z-10 flex flex-col items-center justify-center pb-10 px-4">
            <div className="p-[1px] rounded-full bg-gradient-to-r from-transparent via-[#B9935B] to-transparent w-full max-w-sm mb-12 opacity-50"></div>
            
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#B9935B] to-[#d4b37e] rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                <a 
                    href="#contact" // Changed to #contact for smooth scroll
                    className="relative flex items-center gap-4 bg-[#0a0a0a] text-white px-10 py-5 rounded-lg border border-[#B9935B] hover:bg-[#B9935B] hover:text-black transition-all duration-300 font-bold text-lg uppercase tracking-wider"
                    style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
                >
                    <Zap className="w-5 h-5 fill-current" />
                    Ignite Your Conversions
                </a>
            </motion.div>
        </div>

        {/* --- ANIMATED DECORATIVE ICONS --- */}
        <div className="animate-float-1 absolute right-[5%] top-[15%] hidden lg:block opacity-30 pointer-events-none">
          <img
            src="https://img.icons8.com/ios/100/ffffff/sea-urchin.png"
            alt="Decoration"
            width={80}
            height={80}
            className="invert brightness-0"
            style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(5deg)' }}
          />
        </div>

        <div className="animate-float-2 absolute left-[5%] top-[50%] hidden lg:block opacity-20 pointer-events-none">
          <img
            src="https://img.icons8.com/ios/100/ffffff/coral.png"
            alt="Decoration"
            width={120}
            height={120}
            className="invert brightness-0"
          />
        </div>

      </section>
    </div>
  );
}