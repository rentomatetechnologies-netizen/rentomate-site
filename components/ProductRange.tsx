"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { KEY_SPECS, LOWEST_PRICE, MODELS } from "@/lib/site";
import { useSiteActions } from "@/components/SiteShell";

export const ProductRange: React.FC = () => {
  const { openLeadForm: onRentNow } = useSiteActions();
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 1 | -1) =>
    trackRef.current?.scrollBy({ left: direction * trackRef.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="product" className="relative bg-slate-50/70 py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">

          {/* What is a water purifier rental? */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="min-w-0 lg:col-span-5">
            <span className="mb-3 inline-block rounded-[10px] bg-sky-100/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">Our Product Range</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What Is a Water Purifier <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Rental?</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              With RentOMate, you use an Akvinz RO water purifier at home without paying the machine cost. Instead, you pay a small monthly rent that covers installation, servicing, filter swaps and relocation support.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              It is ideal for families, tenants and young professionals who want safe drinking water without the upfront cost or maintenance headaches of owning a purifier.
            </p>
          </motion.div>

          {/* Scrollable product range */}
          <div className="min-w-0 lg:col-span-7">
            <div className="mb-3 flex justify-end gap-2">
              <button type="button" onClick={() => scroll(-1)} aria-label="Previous product" className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-slate-200 bg-white text-slate-600 transition hover:border-sky-300 hover:text-sky-700"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => scroll(1)} aria-label="Next product" className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-slate-200 bg-white text-slate-600 transition hover:border-sky-300 hover:text-sky-700"><ChevronRight className="h-4 w-4" /></button>
            </div>
            <div ref={trackRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
              {MODELS.map((model) => (
                <article key={model.id} className="w-[82%] shrink-0 snap-start rounded-[10px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-lg sm:w-[300px]">
                  <div className="flex h-56 items-center justify-center rounded-[10px] bg-gradient-to-b from-sky-50 to-white">
                    <Image src={model.image} alt={`${model.name} water purifier in ${model.colour}`} width={240} height={240} className="h-48 w-auto object-contain drop-shadow-xl" />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-slate-900">{model.name}</h3>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <span className="h-3.5 w-3.5 rounded-full border border-slate-300" style={{ backgroundColor: model.swatch }} />
                      {model.colour}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {KEY_SPECS.slice(0, 4).map((spec) => (
                      <li key={spec.title} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> {spec.title}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <p className="text-xs text-slate-500">From <span className="text-lg font-extrabold text-slate-900">₹{LOWEST_PRICE}</span>/month</p>
                    <button type="button" onClick={onRentNow} className="inline-flex items-center gap-1.5 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-2 text-xs font-bold text-white">
                      Rent Now <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
