"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ArrowRight, MapPin, Sparkles } from "lucide-react";

export const CtaBanner: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const parallaxX = useTransform(scrollYProgress, [0.6, 1], [-20, 20]);

  const whatsappUrl = "https://wa.me/+919876543210?text=" + encodeURIComponent("Hi RentOMate! I am ready to get a smart water purifier on rent in Coimbatore.");

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-blue-950 to-sky-950 p-10 sm:p-16 md:p-20 text-center overflow-hidden shadow-2xl border border-sky-900/40">
        
        {/* Animated Parallax Water Ripples / Particles */}
        <motion.div
          style={{ x: parallaxX }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ x: parallaxX }}
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"
        />

        {/* Floating Water Bubble 1 */}
        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[15%] w-12 h-12 rounded-full bg-sky-400/20 border border-sky-300/30 blur-[1px] hidden md:block pointer-events-none"
        />
        
        {/* Floating Water Bubble 2 */}
        <motion.div
          animate={{ y: [0, 18, 0], scale: [1, 0.95, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-[15%] w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-300/30 blur-[1px] hidden md:block pointer-events-none"
        />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Ready to Rent Smarter?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Own Less. <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
              Live Smart.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
            Get your premium RO+UV water purifier installed at your home or apartment in Coimbatore within 24 hours.
          </p>

          {/* CTA Action Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm sm:text-base hover:bg-slate-100 shadow-xl shadow-sky-950/50 transition-all group"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
            <span>Get a Water Purifier</span>
            <ArrowRight className="w-4 h-4 text-slate-900 transition-transform group-hover:translate-x-1" />
          </motion.a>

          {/* Location Badge */}
          <div className="mt-8 flex items-center gap-1.5 text-xs font-semibold text-sky-300/90 bg-sky-950/60 border border-sky-800/60 px-3.5 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Serving all localities across Coimbatore</span>
          </div>

        </div>

      </div>
    </section>
  );
};
