"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { BadgeIndianRupee, Droplets, Filter, MessageCircle, MousePointer2, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { whatsappLink } from "@/lib/contact";
import { LOWEST_PRICE, MODELS, PRICE_PER_DAY } from "@/lib/site";
import { useSiteActions } from "@/components/SiteShell";


// Diameters of the concentric rings around the purifier (px). Each ring reveals one benefit.
const RING_SIZES = [250, 360, 470];

const RING_FEATURES: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "8-stage purification", desc: "RO + UV + UF + TDS control with copper & essential minerals.", icon: Droplets },
  { title: "Zero machine & installation cost", desc: "Pay a small monthly rent instead of buying the purifier.", icon: BadgeIndianRupee },
  { title: "Lifetime free service & filters", desc: "Maintenance and filter swaps at zero cost while you rent.", icon: Wrench },
];

const USPS: { label: string; icon: LucideIcon }[] = [
  { label: "Zero installation cost", icon: BadgeIndianRupee },
  { label: "Lifetime free filter service", icon: Filter },
  { label: "Zero service cost", icon: Wrench },
  { label: "7-day risk-free trial", icon: ShieldCheck },
];

export const HeroSection: React.FC = () => {
  const { openLeadForm: onRentNow } = useSiteActions();
  const { scrollY } = useScroll();
  const yPurifier = useTransform(scrollY, [0, 400], [0, 20]);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeRing, setActiveRing] = useState<number | null>(null);
  const [modelId, setModelId] = useState(MODELS[0].id);
  const model = MODELS.find((item) => item.id === modelId) ?? MODELS[0];

  const supportUrl = whatsappLink("Hi RentOMate! I need support regarding a water purifier on rent.");

  // Work out which ring the pointer is inside, measured from the centre of the stage.
  const handlePointerMove = (event: React.PointerEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
    const ring = RING_SIZES.findIndex((size) => distance <= size / 2);
    setActiveRing(ring === -1 ? null : ring);
  };

  const feature = activeRing === null ? null : RING_FEATURES[activeRing];

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] pt-28 pb-10 md:pt-32 md:pb-12 overflow-hidden flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* ================= LEFT COLUMN: HEADLINE, USPs & CTAs ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start text-left pt-2 lg:pt-0"
          >
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.24em] text-slate-500 uppercase mb-3 sm:mb-5">
              WATER PURIFIERS. ON RENT.
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-[1.04] mb-4 sm:mb-5">
              <span className="text-[#051838] block">Own Less.</span>
              <span className="text-[#0084FF] block">Live Smart.</span>
            </h1>

            {/* The logic behind "Own Less. Live Smart." */}
            <p className="text-slate-600 text-sm sm:text-base font-medium max-w-lg mb-6 leading-relaxed">
              Why buy a purifier when you can rent one? Get pure, 8-stage purified water at home with <strong className="text-slate-800">ZERO installation cost</strong>, <strong className="text-slate-800">lifetime free filter service</strong> and <strong className="text-slate-800">zero service cost</strong> — for about ₹{PRICE_PER_DAY} a day.
            </p>

            <div className="grid grid-cols-2 gap-x-5 gap-y-3 mb-7 max-w-lg">
              {USPS.map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onRentNow}
                className="rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-sky-500/25 transition hover:from-sky-700 hover:to-blue-700"
              >
                Rent Now
              </motion.button>
              <a
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 transition hover:border-[#25D366] hover:text-[#128C7E]"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> Need Support?
              </a>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-600">
              Plans start <span className="font-extrabold text-[#051838]">@₹{LOWEST_PRICE}/month</span>
            </p>
          </motion.div>

          {/* ================= RIGHT COLUMN: INTERACTIVE PURIFIER STAGE ================= */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div
              ref={stageRef}
              id="product-stage"
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setActiveRing(null)}
              className="relative h-[440px] sm:h-[500px] lg:h-[540px] flex items-center justify-center rounded-[10px] bg-[#eff8ff] border border-sky-100/80 overflow-hidden touch-pan-y"
            >
              {/* Concentric rings – the one under the pointer lights up */}
              {RING_SIZES.map((size, index) => (
                <div
                  key={size}
                  style={{ width: size, height: size }}
                  className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${
                    activeRing === index ? "border-2 border-sky-500 bg-sky-400/5 shadow-[0_0_40px_rgba(14,165,233,0.25)]" : "border-sky-200/70"
                  }`}
                />
              ))}
              <div className="pointer-events-none absolute left-1/2 top-[55%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/25 blur-3xl" />

              <motion.div style={{ y: yPurifier }} className="relative z-20 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div key={model.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                    <Image
                      src={model.image}
                      alt={`${model.name} RO water purifier in ${model.colour}, available on rent in Coimbatore`}
                      width={500}
                      height={500}
                      preload
                      className="object-contain max-h-[300px] sm:max-h-[360px] w-auto drop-shadow-2xl select-none pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="w-56 h-4 bg-slate-950/20 blur-lg rounded-full -mt-2 pointer-events-none" />
              </motion.div>

              {/* Benefit callout for the ring under the pointer */}
              <div className="absolute inset-x-3 bottom-3 z-30 flex justify-center sm:inset-x-6 sm:bottom-5">
                <AnimatePresence mode="wait">
                  {feature ? (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex max-w-sm items-center gap-3 rounded-[10px] border border-white bg-white/95 px-4 py-3 shadow-xl shadow-sky-950/10 backdrop-blur-md"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-sky-50 text-[#0080FF] ring-1 ring-sky-100">
                        <feature.icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-[#051838]">{feature.title}</span>
                        <span className="block text-xs font-medium text-slate-500">{feature.desc}</span>
                      </span>
                    </motion.div>
                  ) : (
                    <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hidden items-center gap-2 rounded-[10px] bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-500 md:inline-flex">
                      <MousePointer2 className="h-3.5 w-3.5" /> Move closer to the purifier to explore its benefits
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Colour options */}
              <div className="absolute right-3 top-3 z-30 flex items-center gap-2 rounded-[10px] bg-white/90 px-3 py-2 shadow-sm backdrop-blur sm:right-5 sm:top-5">
                <span className="text-[11px] font-bold text-slate-600">{model.colour}</span>
                {MODELS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setModelId(item.id)}
                    aria-label={`Show ${item.colour}`}
                    aria-pressed={item.id === modelId}
                    style={{ backgroundColor: item.swatch }}
                    className={`h-5 w-5 rounded-full border border-slate-300 transition ${item.id === modelId ? "ring-2 ring-sky-500 ring-offset-2" : "hover:scale-110"}`}
                  />
                ))}
              </div>
            </div>

            {/* Touch devices can't hover the rings, so list the same benefits below the stage */}
            <div className="grid grid-cols-1 gap-2.5 md:hidden">
              {RING_FEATURES.map(({ title, desc, icon: Icon }) => (
                <div key={title} className="flex items-center gap-2.5 rounded-[10px] border border-slate-100 bg-white p-3 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-sky-50 text-[#0080FF]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-[#051838]">{title}</span>
                    <span className="block text-[11px] text-slate-500">{desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
