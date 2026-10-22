"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FEATURED_PURIFIERS, LOWEST_PRICE, type Purifier, type PurifierColour } from "@/lib/site";
import { useSiteActions } from "@/components/SiteShell";

const AUTOPLAY_MS = 5000;
const COUNT = FEATURED_PURIFIERS.length;

const specsFor = ({ storageLitres, stages, tdsAdjustment, colours }: Purifier) => [
  { label: "Storage capacity", value: `${storageLitres} Litres` },
  { label: "Purification", value: `${stages.length}-stage` },
  { label: "TDS adjustment", value: tdsAdjustment ? "Yes" : "No" },
  { label: "Colours", value: colours.map((item) => item.colour.split(" ").pop()).join(" & ") },
];

export const ProductRange: React.FC = () => {
  const { openLeadForm: onRentNow } = useSiteActions();
  // Carousel of purifiers: arrows or autoplay move it; `dir` says which way the slides travel (1 = next, right to left).
  const [slide, setSlide] = useState({ index: 0, prev: -1, dir: 1 });
  const [paused, setPaused] = useState(false);
  const [colourId, setColourId] = useState<PurifierColour["id"]>("black");
  const { index, prev, dir } = slide;
  const purifier = FEATURED_PURIFIERS[index];

  const go = (step: 1 | -1) => setSlide((current) => ({ index: (current.index + step + COUNT) % COUNT, prev: current.index, dir: step }));

  // Autoplay; restarts after every move, pauses on hover/focus, and stays off for reduced motion.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  // Every slide stays mounted in the same grid cell (so the card keeps the tallest slide's height) and slides/fades.
  const slideClass = (i: number) => {
    const offset = i === index ? "translate-x-0 opacity-100" : (i === prev ? -dir : dir) > 0 ? "translate-x-10 opacity-0" : "-translate-x-10 opacity-0";
    return `col-start-1 row-start-1 transition duration-500 ease-out ${offset} ${i === index ? "" : "pointer-events-none"}`;
  };

  return (
    <section id="product" className="relative bg-slate-50/70 py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="min-w-0 lg:col-span-4">
            <span className="mb-3 inline-block rounded-[10px] bg-sky-100/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">Our Product Range</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What Is a Water Purifier <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Rental?</span>
            </h2>
            {/* Left-aligned with balanced line breaks: justified text left big gaps in this narrow column. */}
            <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              With Rent O&apos; Mate, you use an Akvinz RO water purifier at home without paying the machine cost. Instead, you pay a small monthly rent that covers installation, servicing, filter swaps and relocation support.
            </p>
            <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              It is ideal for families, tenants and young professionals who want safe drinking water without the upfront cost or maintenance headaches of owning a purifier.
            </p>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            aria-roledescription="carousel"
            aria-label="Our purifiers"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="grid min-w-0 gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:grid-cols-[0.95fr_1.05fr] lg:col-span-8"
          >
            {/* Photo stage: arrows, position dots, colour picker. Light stage for the black machine, dark for the white one
                (a dark layer fades over the light gradient, since gradients themselves can't transition). */}
            <div className="relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-b from-slate-50 to-slate-100 p-5">
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1e293b] to-[#0b1220] transition-opacity duration-500 ease-in-out ${colourId === "white" ? "opacity-100" : "opacity-0"}`}
                aria-hidden
              />
              <div
                className={`pointer-events-none absolute left-1/2 top-[42%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-500 ${
                  colourId === "white" ? "bg-sky-400/25" : "bg-sky-200/50"
                }`}
                aria-hidden
              />

              <div className="relative flex items-center justify-between">
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 shadow-sm ring-1 ring-slate-200">
                  {purifier.storageLitres} Litres
                </span>
                <div className="flex items-center gap-1.5" aria-hidden>
                  {FEATURED_PURIFIERS.map((item, i) => (
                    <span key={item.id} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-sky-600" : "w-1.5 bg-slate-300"}`} />
                  ))}
                </div>
              </div>

              <div className="relative mx-auto mt-2 grid aspect-square w-full max-w-[320px] flex-1">
                {FEATURED_PURIFIERS.map((item, i) => (
                  <div key={item.id} className={`relative ${slideClass(i)}`} aria-hidden={i !== index || undefined}>
                    {/* Colour switch: a gentle cross-zoom. The old colour shrinks a little as it fades; the new one starts
                        growing in while the old is still fading (no empty gap) and settles with a smooth ease-out. */}
                    {item.colours.map((colour) => (
                      <Image
                        key={colour.id}
                        src={colour.image}
                        alt={`${item.brand} ${item.name} in ${colour.colour}`}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 768px) 40vw, 80vw"
                        className={`object-contain transition-[transform,opacity] will-change-transform ${
                          colour.id === colourId
                            ? "scale-100 opacity-100 delay-100 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            : "scale-[0.85] opacity-0 duration-300 ease-out"
                        }`}
                      />
                    ))}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous purifier"
                  className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md ring-1 ring-slate-200 backdrop-blur transition hover:bg-white hover:text-sky-700"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next purifier"
                  className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md ring-1 ring-slate-200 backdrop-blur transition hover:bg-white hover:text-sky-700"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div role="radiogroup" aria-label="Purifier colour" className="relative mt-3 grid grid-cols-2 gap-2">
                {purifier.colours.map((colour) => {
                  const selected = colour.id === colourId;
                  return (
                    <button
                      key={colour.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setColourId(colour.id)}
                      className={`flex items-center justify-center gap-2 rounded-full border bg-white px-3 py-2 text-xs font-bold transition ${
                        selected ? "border-sky-500 text-slate-900 ring-2 ring-sky-500/20" : "border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <span className="h-4 w-4 shrink-0 rounded-full ring-1 ring-slate-300" style={{ background: colour.swatch }} aria-hidden />
                      {colour.colour}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details: one slide per purifier, stacked so the height never changes; price and button stay put */}
            <div className="flex min-w-0 flex-col">
              {/* mb-6 keeps a minimum gap above the price row, which is pushed to the bottom with mt-auto */}
              <div className="mb-6 grid" aria-live={paused ? "polite" : "off"}>
                {FEATURED_PURIFIERS.map((item, i) => (
                  <div key={item.id} className={slideClass(i)} aria-hidden={i !== index || undefined} inert={i !== index}>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                      {item.brand} <span className="ml-1 tracking-normal text-slate-400">{i + 1} / {COUNT}</span>
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.7rem]">{item.name}</h3>

                    <dl className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200">
                      {specsFor(item).map((spec, k) => (
                        <div key={spec.label} className={`px-4 py-3 ${k % 2 ? "border-l border-slate-200" : ""} ${k > 1 ? "border-t border-slate-200" : ""}`}>
                          <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{spec.label}</dt>
                          <dd className="mt-0.5 text-sm font-extrabold text-slate-900">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="mt-5 text-[11px] font-bold uppercase tracking-wide text-slate-500">{item.stages.length} stages of filtration</p>
                    <ol className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 min-[420px]:grid-cols-2">
                      {item.stages.map((stage, k) => (
                        <li key={stage} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[10px] font-bold text-sky-700 ring-1 ring-sky-200">
                            {k + 1}
                          </span>
                          {stage}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-slate-200 pt-5">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Unlimited pure water from</p>
                  <p className="mt-0.5 text-slate-900">
                    <span className="text-3xl font-black tracking-tight">₹{LOWEST_PRICE}</span>
                    <span className="text-sm font-semibold text-slate-500">/month*</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onRentNow}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-110"
                >
                  Book Now <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
