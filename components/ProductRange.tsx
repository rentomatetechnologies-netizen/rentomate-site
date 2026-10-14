"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { KEY_SPECS, LOWEST_PRICE, MODELS } from "@/lib/site";
import { useSiteActions } from "@/components/SiteShell";

export const ProductRange: React.FC = () => {
  const { openLeadForm: onRentNow } = useSiteActions();
  // One purifier on show; the colour buttons switch between the Midnight Black and Pearl White models.
  const [modelId, setModelId] = useState(MODELS[0].id);
  const model = MODELS.find((item) => item.id === modelId) ?? MODELS[0];

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
            className="grid min-w-0 overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:col-span-7"
          >
            <div className="relative flex h-72 items-center justify-center bg-gradient-to-b from-sky-50 to-white sm:h-auto sm:min-h-[340px]">
              {/* Both colours stay mounted (so switching is instant) and crossfade. */}
              {MODELS.map((item) => {
                const selected = item.id === model.id;
                return (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={`${item.name} water purifier in ${item.colour}`}
                    aria-hidden={!selected || undefined}
                    width={300}
                    height={300}
                    className={`absolute h-60 w-auto object-contain drop-shadow-xl transition duration-300 sm:h-64 ${
                      selected ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex flex-col p-5 sm:p-6">
              <h3 className="text-xl font-extrabold text-slate-900">{model.name}</h3>

              {/* Colour picker */}
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">Colour</p>
              <div role="radiogroup" aria-label="Purifier colour" className="mt-2 flex flex-wrap gap-2">
                {MODELS.map((item) => {
                  const selected = item.id === model.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setModelId(item.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition ${
                        selected ? "border-sky-500 bg-sky-50 text-sky-800 ring-2 ring-sky-500/20" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
                      }`}
                    >
                      <span className="h-4 w-4 rounded-full border border-slate-300" style={{ backgroundColor: item.swatch }} />
                      {item.colour}
                    </button>
                  );
                })}
              </div>

              <ul className="mt-5 space-y-2">
                {KEY_SPECS.slice(0, 4).map((spec) => (
                  <li key={spec.title} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {spec.title}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:mt-6">
                <p className="text-xs text-slate-500">From <span className="text-lg font-extrabold text-slate-900">₹{LOWEST_PRICE}</span>/month</p>
                <button type="button" onClick={onRentNow} className="inline-flex items-center gap-1.5 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-2.5 text-sm font-bold text-white">
                  Rent Now <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
