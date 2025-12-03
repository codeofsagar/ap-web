"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Clock } from 'lucide-react';

function Contact() {
  const containerRef = useRef(null);
  

 

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen text-white flex flex-col justify-center px-4 py-32 lg:px-12 lg:py-40 relative overflow-hidden "
    >
      {/* --- CUSTOM STYLES FOR ANIMATIONS --- */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        .animate-float-1 { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-reverse 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-slow 12s ease-in-out infinite; }
      `}</style>

      {/* Decorative Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(#B9935B 1px, transparent 1px), linear-gradient(90deg, #B9935B 1px, transparent 1px)', 
                 backgroundSize: '60px 60px' 
             }}>
      </div>

      {/* --- SECTION HEADER --- */}
      <div className="relative z-10 text-center mb-24 lg:mb-32">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="overflow-hidden mb-8"
        >
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight uppercase tracking-tight"
            style={{ fontFamily: 'Druk Wide Cy Web Bold Regular', color: '#B9935B' }}
          >
            Ready to convert
            <br />
            <span className="text-white text-transparent" style={{ WebkitTextStroke: '1px white' }}>more visitors?</span>
          </h2>
        </motion.div>
        
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
        >
            Book a time below for your 30-minute landing page consultation.
        </motion.p>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Calendly Embed */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-[#111] border border-[#2a2a2a] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 relative min-h-[750px] group hover:border-[#B9935B]/30 transition-colors duration-500"
            >
                {/* Gold Top Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B9935B] via-[#d4b37e] to-[#B9935B] z-20"></div>
                
                <iframe 
                    src="https://calendly.com/apdigitalagency/30-minute-landing-page-consultation-1?back=1&month=2025-11&hide_gdpr_banner=1&background_color=111111&text_color=ffffff&primary_color=B9935B" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    title="Calendly Scheduling Page"
                    className="w-full h-[750px] lg:h-[800px] relative z-10"
                ></iframe>
            </motion.div>

            {/* Right Column: Contact Info */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-12"
            >
                <div className="relative p-10 lg:p-12 rounded-3xl bg-[#111]/50 backdrop-blur-sm border border-[#2a2a2a]">
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#B9935B]/20 blur-3xl rounded-full"></div>
                    
                    <h3 className="text-3xl lg:text-5xl uppercase mb-8 leading-none" style={{ fontFamily: 'Druk Wide Cy Web Bold Regular', color: '#B9935B' }}>
                        Let&#39;s Talk <br /> <span className="text-white">Growth</span>
                    </h3>
                    
                    <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                        We&#39;ll show you how our landing pages can transform your conversion rates within days. 
                        Can&apos;t find a time that works? Reach out directly.
                    </p>
                    
                    <div className="space-y-10">
                        {/* Email */}
                        <a href="mailto:info@apagency.ca" className="flex items-start gap-6 group">
                            <div className="bg-[#B9935B]/5 border border-[#B9935B]/20 p-4 rounded-full flex-shrink-0 transition-all duration-300 group-hover:bg-[#B9935B] group-hover:text-black group-hover:scale-110">
                                <Mail size={24} className="text-[#B9935B] group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-sm uppercase tracking-widest text-[#B9935B] mb-2 font-bold">Email Us</h4>
                                <span className="text-2xl text-white group-hover:text-[#B9935B] transition-colors font-light">
                                    info@apagency.ca
                                </span>
                            </div>
                        </a>
                        
                        {/* Phone */}
                        <div className="flex items-start gap-6 group">
                            <div className="bg-[#B9935B]/5 border border-[#B9935B]/20 p-4 rounded-full flex-shrink-0 transition-all duration-300 group-hover:bg-[#B9935B] group-hover:text-black group-hover:scale-110">
                                <Phone size={24} className="text-[#B9935B] group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-sm uppercase tracking-widest text-[#B9935B] mb-2 font-bold">Call Us</h4>
                                <p className="text-2xl text-white font-light"> (647) 424-0504</p>
                            </div>
                        </div>
                        
                        {/* Location */}
                        <div className="flex items-start gap-6 group">
                            <div className="bg-[#B9935B]/5 border border-[#B9935B]/20 p-4 rounded-full flex-shrink-0 transition-all duration-300 group-hover:bg-[#B9935B] group-hover:text-black group-hover:scale-110">
                                <MapPin size={24} className="text-[#B9935B] group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-sm uppercase tracking-widest text-[#B9935B] mb-2 font-bold">HQ Location</h4>
                                <p className="text-lg text-white/80 font-light leading-relaxed max-w-xs">10330 Yonge St, Richmond Hill,<br/> ON L4C 5N1, Canada</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hours Box */}
                <div className="p-10 rounded-3xl border border-[#B9935B]/20 bg-gradient-to-br from-[#B9935B]/10 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Clock size={100} className="text-[#B9935B]" />
                    </div>
                    <h4 className="text-xl uppercase mb-6 flex items-center gap-3 relative z-10" style={{ fontFamily: 'Druk Wide Cy Web Bold Regular', color: 'white' }}>
                        Working Hours
                    </h4>
                    <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <span className="text-gray-400">Monday - Friday</span>
                            <span className="text-[#B9935B] font-bold tracking-widest">09:00 - 19:00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Saturday</span>
                            <span className="text-[#B9935B] font-bold tracking-widest">12:00 - 16:00</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
      
      {/* Guarantee Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 mt-24 lg:mt-32 text-center max-w-5xl mx-auto px-4"
      >
        <div className="inline-flex flex-col md:flex-row items-center gap-6 p-8 lg:p-10 rounded-3xl border border-[#B9935B]/30 backdrop-blur-xl bg-[#000]/40">
          <div className="bg-[#B9935B] rounded-full p-4 shadow-lg shadow-[#B9935B]/20 animate-pulse">
            <Send size={24} className="text-[#000]" />
          </div>
          <div className="text-left">
              <p className="text-xl lg:text-2xl text-white font-light">
                We respond to all inquiries within
              </p>
              <p className="text-xl lg:text-3xl mt-1 uppercase" style={{ fontFamily: 'Druk Wide Cy Web Bold Regular', color: '#B9935B' }}>
                  24 business hours
              </p>
          </div>
        </div>
      </motion.div>

     

      

      <motion.div className="animate-float-3 absolute left-[15%] bottom-[10%] hidden xl:block pointer-events-none select-none opacity-10">
        <img
          src="https://img.icons8.com/ios/100/ffffff/flower.png"
          alt=""
          width={150}
          height={150}
          className="invert brightness-0"
        />
      </motion.div>
      
      {/* Accent Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#B9935B]/5 to-transparent pointer-events-none"></div>
    </section>
  );
}

export default Contact;