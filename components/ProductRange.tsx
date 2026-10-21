"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { KEY_SPECS, LOWEST_PRICE, MODELS } from "@/lib/site";
import { useSiteActions } from "@/components/SiteShell";

// Decorative fan of thin curves, echoing the wave print on the purifier's front panel.
const WaveLines: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 160" fill="none" stroke="currentColor" strokeWidth="0.8" preserveAspectRatio="none" className={className} aria-hidden="true">
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M0 ${20 + i * 6} C 110 ${-30 + i * 9}, 220 ${150 - i * 7}, 400 ${10 + i * 4}`} />
    ))}
  </svg>
);

// The card's colours follow the selected purifier, matching the black and white posters.
const THEMES = {
  black: {
    text: "text-[#111111]",
    check: "fill-[#111111]",
    waves: ["text-slate-400/70", "text-slate-300"],
    button: "border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white",
    buttonDot: "bg-[#111111]",
    panel: "bg-gradient-to-br from-[#2a2a2a] to-[#0d0d0d]",
  },
  white: {
    text: "text-[#1d1aa8]",
    check: "fill-[#1a56db]",
    waves: ["text-cyan-700/40", "text-sky-300/70"],
    button: "border-[#1a56db] text-[#1a56db] hover:bg-[#1a56db] hover:text-white",
    buttonDot: "bg-[#1a56db]",
    panel: "bg-gradient-to-br from-[#c9d6df] to-[#a8b9c6]",
  },
};

export const ProductRange: React.FC = () => {
  const { openLeadForm: onRentNow } = useSiteActions();
  // One purifier on show; the colour buttons switch between the Midnight Black and Pearl White models.
  const [modelId, setModelId] = useState(MODELS[0].id);
  const model = MODELS.find((item) => item.id === modelId) ?? MODELS[0];
  const theme = model.id === "white" ? THEMES.white : THEMES.black;

  return (
    <section id="product" className="relative bg-slate-50/70 py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="min-w-0 lg:col-span-5">
            <span className="mb-3 inline-block rounded-[10px] bg-sky-100/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">Our Product Range</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What Is a Water Purifier <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Rental?</span>
            </h2>
            <p className="mt-4 text-justify text-sm leading-relaxed text-slate-600 sm:text-base">
              With RentOMate, you use an Akvinz RO water purifier at home without paying the machine cost. Instead, you pay a small monthly rent that covers installation, servicing, filter swaps and relocation support.
            </p>
            <p className="mt-3 text-justify text-sm leading-relaxed text-slate-600 sm:text-base">
              It is ideal for families, tenants and young professionals who want safe drinking water without the upfront cost or maintenance headaches of owning a purifier.
            </p>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative grid min-w-0 gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8 lg:col-span-7"
          >
            <WaveLines className={`pointer-events-none absolute -left-10 -top-6 h-40 w-[70%] transition-colors duration-300 ${theme.waves[0]}`} />
            <WaveLines className={`pointer-events-none absolute -bottom-8 -right-10 h-36 w-[55%] rotate-180 transition-colors duration-300 ${theme.waves[1]}`} />

            {/* Left: name, specs, price, book button – all in the selected model's colour */}
            <div className={`relative flex flex-col transition-colors duration-300 ${theme.text}`}>
              <h3 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">{model.name}</h3>

              <ul className="mt-6 space-y-3">
                {KEY_SPECS.slice(0, 4).map((spec) => (
                  <li key={spec.title} className="flex items-center gap-3 text-base sm:text-lg">
                    <BadgeCheck className={`h-7 w-7 shrink-0 text-white transition-colors duration-300 ${theme.check}`} aria-hidden /> {spec.title}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="text-sm sm:text-base">
                  <span className="font-extrabold uppercase">Unlimited</span> pure water starting at
                </p>
                <p className="mt-1 flex items-start gap-1">
                  <span className="text-5xl font-black leading-none">₹{LOWEST_PRICE}</span>
                  <span className="mt-1 text-sm font-semibold text-[#1d1aa8]">
                    *<br />/month
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={onRentNow}
                className={`mt-6 inline-flex items-center gap-3 self-start rounded-full border-2 bg-white py-1.5 pl-1.5 pr-6 text-sm font-extrabold uppercase tracking-wide transition ${theme.button}`}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors duration-300 ${theme.buttonDot}`}>
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </span>
                Book Now
              </button>
            </div>

            {/* Right: photo panel and colour swatches */}
            <div className="relative flex flex-col">
              <div
                className={`relative flex min-h-[300px] flex-1 items-center justify-center overflow-hidden rounded-[28px] border-2 border-emerald-300/70 transition-colors duration-300 ${theme.panel}`}
              >
                {/* Both colours stay mounted (so switching is instant) and crossfade. */}
                {MODELS.map((item) => {
                  const selected = item.id === model.id;
                  return (
                    <Image
                      key={item.id}
                      src={item.image}
                      alt={`${item.name} water purifier in ${item.colour}`}
                      aria-hidden={!selected || undefined}
                      width={320}
                      height={320}
                      className={`absolute h-64 w-auto object-contain drop-shadow-2xl transition duration-300 ${selected ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                    />
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-center gap-5">
                <p className="text-lg font-extrabold uppercase tracking-wide text-[#1d1aa8]">Colour</p>
                <div role="radiogroup" aria-label="Purifier colour" className="flex items-center gap-4">
                  {MODELS.map((item) => {
                    const selected = item.id === model.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={item.colour}
                        title={item.colour}
                        onClick={() => setModelId(item.id)}
                        className={`h-11 w-11 rounded-full border-2 border-slate-300 transition ${
                          selected ? "ring-4 ring-sky-400/50 ring-offset-2" : "hover:scale-105"
                        }`}
                        style={{ background: item.swatch }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
