"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Wrench, Headphones, ShieldCheck, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onSelectPlan?: (planMonths: number) => void;
  heroImageSrc?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectPlan,
  heroImageSrc = "/images/hero-purifier.svg",
}) => {
  const { scrollY } = useScroll();
  const yPurifier = useTransform(scrollY, [0, 500], [0, 45]);
  const yBadge1 = useTransform(scrollY, [0, 500], [0, -35]);
  const yBadge2 = useTransform(scrollY, [0, 500], [0, 25]);
  const yBadge3 = useTransform(scrollY, [0, 500], [0, -20]);
  const yBgSplash = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden flex items-center bg-gradient-to-b from-sky-50/60 via-white to-slate-50/40">
      {/* Background Ambient Glow & Parallax Elements */}
      <motion.div
        style={{ y: yBgSplash }}
        className="absolute top-10 right-[-5%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-sky-200/40 blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        style={{ y: yBadge1 }}
        className="absolute bottom-10 left-[-5%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full bg-blue-100/50 blur-3xl pointer-events-none -z-10"
      />

      {/* Decorative Parallax Water Droplets */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-[10%] w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-cyan-200 opacity-40 blur-[1px] hidden sm:block pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-[8%] w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-sky-300 opacity-30 blur-[2px] hidden sm:block pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200/80 text-sky-800 text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Water Purifiers. On Rent.</span>
            </div>

            {/* Main Punchy Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Own Less. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500">
                Live Smart.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-lg mb-8 leading-relaxed">
              Access pure, mineral-rich drinking water with zero maintenance headaches and free doorstep installation across Coimbatore.
            </p>

            {/* Interactive Pricing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-8">
              {/* 12 Months Plan Card */}
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPlan?.(12)}
                className="group relative flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-0.5">
                    12 Months
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">₹699</span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-sky-600 group-hover:bg-blue-600 text-white flex items-center justify-center transition-all shadow-sm">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.button>

              {/* 24 Months Plan Card */}
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPlan?.(24)}
                className="group relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-sky-500/10 via-white to-white border-2 border-sky-400/80 hover:border-sky-600 shadow-sm hover:shadow-md transition-all text-left"
              >
                <span className="absolute -top-2.5 right-4 bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Best Value
                </span>
                <div>
                  <span className="text-xs font-semibold text-sky-700 block mb-0.5">
                    24 Months
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">₹449</span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-sky-600 group-hover:bg-blue-600 text-white flex items-center justify-center transition-all shadow-sm">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            </div>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium pt-2 border-t border-slate-200/70 w-full">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Zero Security Deposit Options
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Free Relocation Support
              </span>
            </div>
          </motion.div>

          {/* Right Hero Visual with Parallax & Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Center Main Product Stage */}
            <motion.div
              style={{ y: yPurifier }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl flex items-center justify-center"
            >
              {/* Halo Backlight */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-b from-sky-400/20 via-cyan-400/10 to-transparent blur-2xl -z-10" />

              {/* Product Visual */}
              <div className="relative w-full h-full p-4 flex items-center justify-center drop-shadow-2xl">
                <Image
                  src={heroImageSrc}
                  alt="RentOMate Smart RO+UV Water Purifier"
                  width={420}
                  height={500}
                  priority
                  className="object-contain max-h-[460px] w-auto drop-shadow-2xl hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Floating Feature Badge 1: Top Left */}
              <motion.div
                style={{ y: yBadge1 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -left-3 sm:-left-8 z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/60 max-w-[210px]"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Flexible Rental Plans
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    12 or 24 months
                  </p>
                </div>
              </motion.div>

              {/* Floating Feature Badge 2: Mid-Left */}
              <motion.div
                style={{ y: yBadge2 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-1/2 -left-4 sm:-left-12 -translate-y-1/2 z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/60 max-w-[220px]"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Free Installation
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    We install at your home
                  </p>
                </div>
              </motion.div>

              {/* Floating Feature Badge 3: Bottom-Right */}
              <motion.div
                style={{ y: yBadge3 }}
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -right-2 sm:-right-8 z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/60 max-w-[220px]"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    24/7 Support
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    Quick assistance always
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
