"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeIndianRupee, Filter, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappLink } from "@/lib/contact";
import { isOptimizableImage } from "@/lib/blog";
import { DEFAULT_SLIDE, type HeroContent, type HeroSlide } from "@/lib/hero";
import { LOWEST_PRICE, PRICE_PER_DAY } from "@/lib/site";
import { useSiteActions } from "@/components/SiteShell";

// Two-column hero: headline, benefits and CTAs on the left; the hero image on the right.
// The right side rotates through the carousel images set in the admin panel (Homepage hero),
// and shows the RentOMate ambassador image when none are uploaded.

const USPS: { label: string; icon: LucideIcon }[] = [
  { label: "Zero installation cost", icon: BadgeIndianRupee },
  { label: "Lifetime free filter service", icon: Filter },
  { label: "Zero service cost", icon: Wrench },
  { label: "7-day risk-free trial", icon: ShieldCheck },
];

const SLIDE_INTERVAL_MS = 5000;
const SWIPE_DISTANCE = 60;

export const HeroSection: React.FC<{ content: HeroContent }> = ({ content }) => {
  const { openLeadForm: onRentNow } = useSiteActions();
  const supportUrl = whatsappLink("Hi RentOMate! I need support regarding a water purifier on rent.");
  const uploaded = content.slides.filter((slide) => slide.image);
  const slides = uploaded.length ? uploaded : [DEFAULT_SLIDE];

  // On laptops the hero fills the viewport below the sticky navbar (76px), capped so big monitors stay compact.
  // The `short:` variant (globals.css) tightens spacing on short laptop screens.
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-6 md:pb-14 lg:flex lg:min-h-[min(calc(100svh-76px),900px)] lg:items-center lg:py-10 short:py-6">
      {/* Soft brand glow behind the image */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[720px] rounded-full bg-sky-100/60 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 short:gap-8">
        {/* ================= LEFT: TEXT + CTAs ================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <p className="mb-4 short:mb-3 text-xs font-extrabold uppercase tracking-[0.24em] text-slate-500 sm:text-sm">Water purifiers. On rent.</p>

          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-[#051838] sm:text-6xl lg:text-[64px] short:text-[52px]">
            Own Less.
            <span className="block text-[#0084FF]">Live Smart.</span>
          </h1>

          <p className="mt-5 short:mt-4 max-w-lg text-justify text-[15px] font-medium leading-relaxed text-slate-600 sm:text-base">
            Why buy a purifier when you can rent one? Get pure, 8-stage purified water at home with{" "}
            <strong className="text-slate-800">zero installation cost</strong>, <strong className="text-slate-800">lifetime free filter service</strong>{" "}
            and <strong className="text-slate-800">zero service cost</strong> — for about ₹{PRICE_PER_DAY} a day.
          </p>

          <ul className="mt-6 grid max-w-lg grid-cols-2 gap-x-5 gap-y-3 short:mt-4 short:gap-y-2">
            {USPS.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <span className="flex h-9 w-9 short:h-8 short:w-8 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-600">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap short:mt-6">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRentNow}
              className="group inline-flex min-h-14 short:min-h-12 items-center justify-center rounded-[10px] bg-gradient-to-r from-[#078BDF] to-[#145DFF] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110"
            >
              Rent Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            <a
              href={supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 short:min-h-12 items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-[#243650] transition hover:border-sky-300 hover:bg-sky-50"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Need Support?
            </a>
          </div>
          <p className="mt-4 short:mt-3 text-sm font-medium text-slate-600">
            Plans start <span className="font-extrabold text-[#051838]">@₹{LOWEST_PRICE}/month</span>
          </p>
        </motion.div>

        {/* ================= RIGHT: HERO IMAGE / CAROUSEL ================= */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative lg:col-span-7"
        >
          <HeroCarousel slides={slides} />
        </motion.div>
      </div>
    </section>
  );
};

/** The hero image. With more than one slide it autoplays, pauses on hover, has dots and can be swiped. */
const HeroCarousel: React.FC<{ slides: HeroSlide[] }> = ({ slides }) => {
  const reduceMotion = useReducedMotion();
  const count = slides.length;
  // [index, direction]: direction tells the slide animation which side the next image comes from.
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const current = slides[index % count];

  // Cursor light: a mild sky-blue glow that follows the pointer while it is over the card.
  const lightX = useMotionValue(0);
  const lightY = useMotionValue(0);
  const light = useMotionTemplate`radial-gradient(340px circle at ${lightX}px ${lightY}px, rgba(56, 189, 248, 0.14), rgba(56, 189, 248, 0.05) 45%, transparent 70%)`;
  const edgeLight = useMotionTemplate`radial-gradient(240px circle at ${lightX}px ${lightY}px, rgba(125, 211, 252, 0.55), transparent 70%)`;
  const moveLight = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    lightX.set(event.clientX - rect.left);
    lightY.set(event.clientY - rect.top);
  };

  const go = useCallback((delta: number) => setSlide(([i]) => [(i + delta + count) % count, delta]), [count]);
  const goTo = (target: number) => setSlide(([i]) => [target, target > i ? 1 : -1]);

  // Restarts after every change, so a manual step gets a full interval before the next autoplay.
  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const timer = window.setTimeout(() => go(1), SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [count, go, index, paused, reduceMotion]);

  return (
    <div
      onPointerMove={moveLight}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="group relative aspect-[3/2] overflow-hidden lg:max-h-[calc(100svh-156px)] lg:min-h-80 short:max-h-[calc(100svh-124px)] rounded-[28px] bg-[#0b1220] shadow-[0_40px_80px_-30px_rgba(5,24,56,0.45)] ring-1 ring-slate-900/5"
      {...(count > 1 && { role: "region", "aria-roledescription": "carousel", "aria-label": "RentOMate highlights" })}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={reduceMotion ? FADE : SLIDE}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, { offset, velocity }) => {
            if (offset.x < -SWIPE_DISTANCE || velocity.x < -500) go(1);
            else if (offset.x > SWIPE_DISTANCE || velocity.x > 500) go(-1);
          }}
          className={`absolute inset-0 ${count > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
          {...(count > 1 && { role: "group", "aria-roledescription": "slide", "aria-label": `${index + 1} of ${count}` })}
        >
          <Image
            src={current.image}
            alt={current.alt}
            fill
            preload={index === 0}
            draggable={false}
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
            unoptimized={!isOptimizableImage(current.image) && !current.image.startsWith("/")}
            className="select-none object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Glow over the image, plus a brighter rim where the light meets the card edge. */}
      <motion.div
        aria-hidden
        style={{ background: light }}
        className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <motion.div
        aria-hidden
        style={{ background: edgeLight }}
        className="pointer-events-none absolute inset-0 z-[5] rounded-[28px] p-px opacity-0 transition-opacity duration-300 [mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] group-hover:opacity-100"
      />

      {count > 1 && (
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-[#051838]/40 px-3 py-2 backdrop-blur-md">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Slides enter from the side they come from; reduced motion gets a plain crossfade.
const SLIDE = {
  enter: (direction: number) => ({ x: direction >= 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: direction >= 0 ? "-100%" : "100%" }),
};
const FADE = { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } };
