"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Droplets, House, Wrench } from "lucide-react";

interface HeroSectionProps {
  onSelectPlan?: (planMonths: number) => void;
  heroImageSrc?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectPlan,
  heroImageSrc = "/hero/purifier-transparent.png",
}) => {
  const { scrollY } = useScroll();
  const yPurifier = useTransform(scrollY, [0, 400], [0, 20]);
  const yBadgeFloat = useTransform(scrollY, [0, 400], [0, -10]);

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] pt-28 pb-12 md:pt-32 md:pb-14 overflow-hidden flex items-center bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* ================= LEFT COLUMN: HERO HEADLINE & PRICING ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start text-left pt-2 lg:pt-0"
          >
            {/* Spaced-out Eyebrow Category */}
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.24em] text-slate-500 uppercase mb-3 sm:mb-5">
              WATER PURIFIERS. ON RENT.
            </p>

            {/* Main Punchy 2-Line Heading with Period */}
            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-[1.04] mb-4 sm:mb-5">
              <span className="text-[#051838] block">Own Less.</span>
              <span className="text-[#0084FF] block">Live Smart.</span>
            </h1>

            {/* Clean Supporting Line */}
            <p className="text-slate-600 text-sm sm:text-base font-medium max-w-md mb-8 sm:mb-10 leading-relaxed">
              Rent an Akvinz Ultron RO+UV water purifier in Coimbatore with flexible 12 or 24-month plans, doorstep installation, and ongoing service support.
            </p>

            {/* Interactive Pricing Cards matching exact UI composition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-lg">
              {/* Card 1: 24 Months / ₹449 - Highlighted with active blue border & Most Popular badge */}
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPlan?.(24)}
                className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded bg-white/95 backdrop-blur-md border-2 border-[#54A4FF] shadow-lg shadow-sky-100/70 hover:shadow-xl hover:border-sky-500 transition-all text-left"
              >
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-0.5">
                    24 Months
                  </span>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl sm:text-[28px] font-extrabold text-[#051838]">₹ 449</span>
                    <span className="text-xs font-semibold text-slate-500">/ month</span>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#E5F3FF] text-[#0070F3] text-[10px] font-extrabold tracking-wide uppercase">
                    Most Popular
                  </span>
                </div>
                <div className="w-9 h-9 rounded bg-[#0080FF] group-hover:bg-[#0066CC] text-white flex items-center justify-center shrink-0 ml-2 shadow-md shadow-sky-500/30 transition-all group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>

              {/* Card 2: 12 Months / ₹699 - White clean card with arrow */}
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPlan?.(12)}
                className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-100 hover:border-sky-400 hover:shadow-xl transition-all text-left"
              >
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-0.5">
                    12 Months
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-[28px] font-extrabold text-[#051838]">₹ 699</span>
                    <span className="text-xs font-semibold text-slate-500">/ month</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded bg-[#0080FF] group-hover:bg-[#0066CC] text-white flex items-center justify-center shrink-0 ml-2 shadow-md shadow-sky-500/30 transition-all group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: PURIFIER STAGE & CALLOUT BADGES ================= */}
          <div className="lg:col-span-6 relative h-[440px] sm:h-[500px] lg:h-[540px] flex items-center justify-center rounded bg-[#eff8ff] border border-sky-100/80 overflow-hidden">
            
            {/* Purifier sitting on the countertop */}
            <motion.div
              style={{ y: yPurifier }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full h-full max-w-[480px] flex items-center justify-center"
            >
              {/* Soft concentric line treatment inspired by the reference stage. */}
              <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/80" />
              <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/70" />
              <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/60" />
              <div className="absolute left-1/2 top-[55%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/25 blur-3xl" />

              {/* Purifier Visual with grounding shadow */}
              <div className="relative z-20 w-full h-full max-h-[460px] flex flex-col items-center justify-center">
                <Image
                  src={heroImageSrc}
                  alt="Akvinz Ultron RO water purifier available on rent in Coimbatore"
                  width={500}
                  height={500}
                  priority
                  className="object-contain max-h-[380px] sm:max-h-[410px] w-auto drop-shadow-2xl select-none pointer-events-none z-10"
                />
                {/* Natural contact shadow on countertop */}
                <div className="w-56 h-4 bg-slate-950/20 blur-lg rounded-full -mt-2 pointer-events-none z-0" />
              </div>

              {/* ---------- FLOATING CALLOUT BADGE 1: TOP LEFT ---------- */}
              <motion.div
                style={{ y: yBadgeFloat }}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-9 left-3 sm:left-0 z-30 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded border border-white shadow-xl shadow-sky-950/10 max-w-[210px] hover:border-sky-300 transition-all hover:shadow-2xl"
              >
                <div className="w-8 h-8 rounded bg-sky-50 flex items-center justify-center text-[#0080FF] shrink-0 border border-sky-100/60">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#051838] leading-tight">
                    RO + UV purification
                  </h4>
                  <p className="text-[10.5px] font-medium text-slate-500 leading-tight mt-0.5">
                    Multi-stage purification.
                  </p>
                </div>
              </motion.div>

              {/* ---------- FLOATING CALLOUT BADGE 2: MID LEFT ---------- */}
              <motion.div
                style={{ y: yBadgeFloat }}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-12 left-3 sm:left-0 z-30 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded border border-white shadow-xl shadow-sky-950/10 max-w-[210px] hover:border-sky-300 transition-all hover:shadow-2xl"
              >
                <div className="w-8 h-8 rounded bg-sky-50 flex items-center justify-center text-[#0080FF] shrink-0 border border-sky-100/60">
                  <House className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#051838] leading-tight">
                    Installation included
                  </h4>
                  <p className="text-[10.5px] font-medium text-slate-500 leading-tight mt-0.5">
                    Subject to location feasibility.
                  </p>
                </div>
              </motion.div>

              {/* ---------- FLOATING CALLOUT BADGE 3: RIGHT ---------- */}
              <motion.div
                style={{ y: yBadgeFloat }}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute top-[34%] right-3 sm:right-0 z-30 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded border border-white shadow-xl shadow-sky-950/10 max-w-[210px] hover:border-sky-300 transition-all hover:shadow-2xl"
              >
                <div className="w-8 h-8 rounded bg-sky-50 flex items-center justify-center text-[#0080FF] shrink-0 border border-sky-100/60">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#051838] leading-tight">
                    Servicing included
                  </h4>
                  <p className="text-[10.5px] font-medium text-slate-500 leading-tight mt-0.5">
                    Support according to your plan.
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* ---------- MOBILE REFINED FEATURE CHIPS (BELOW PRODUCT ON MOBILE ONLY) ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-8 md:hidden">
          <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md p-3 rounded border border-slate-100 shadow-sm">
            <div className="w-8 h-8 rounded bg-sky-50 flex items-center justify-center text-[#0080FF] shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#051838]">RO + UV purification</h4>
              <p className="text-[10.5px] text-slate-500">Multi-stage purification.</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md p-3 rounded border border-slate-100 shadow-sm">
            <div className="w-8 h-8 rounded bg-sky-50 flex items-center justify-center text-[#0080FF] shrink-0">
              <House className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#051838]">Installation included</h4>
              <p className="text-[10.5px] text-slate-500">Subject to location feasibility.</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md p-3 rounded border border-slate-100 shadow-sm">
            <div className="w-8 h-8 rounded bg-sky-50 flex items-center justify-center text-[#0080FF] shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#051838]">Servicing included</h4>
              <p className="text-[10.5px] text-slate-500">Support according to your plan.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

