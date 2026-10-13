"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { CITIES } from "@/lib/site";
import { whatsappLink } from "@/lib/contact";
import { useSiteActions } from "@/components/SiteShell";

export const AvailableCities: React.FC = () => {
  const { openAvailability: onCheckAvailability } = useSiteActions();
  return (
  <section id="cities" className="relative overflow-hidden border-y border-slate-200/70 bg-slate-50 py-14">
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-40 justify-center opacity-40">
      <Image src="/images/coimbatore-skyline.svg" alt="" width={1200} height={160} className="h-full w-full object-cover" />
    </div>

    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-[10px] bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
          <MapPin className="h-3.5 w-3.5" /> Available Cities
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Where We <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Serve</span>
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">Check if RentOMate is available at your address. More cities are coming soon.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {CITIES.map((city) => (
          <motion.div key={city.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[10px] border border-sky-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-xl font-extrabold text-slate-900"><MapPin className="h-5 w-5 text-sky-600" /> {city.name}</h3>
              <span className="inline-flex items-center gap-1 rounded-[10px] bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" /> Live</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{city.areas.slice(0, 10).join(" · ")} and more.</p>
            <button type="button" onClick={onCheckAvailability} className="mt-5 inline-flex items-center gap-2 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-sky-500/20">
              Check My Area <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}

        <div className="flex flex-col justify-center rounded-[10px] border border-dashed border-slate-300 bg-white/70 p-6">
          <h3 className="text-lg font-extrabold text-slate-900">Not in {CITIES.map((city) => city.name).join(", ")}?</h3>
          <p className="mt-2 text-sm text-slate-600">Tell us your city and we&apos;ll let you know as soon as RentOMate reaches you.</p>
          <a href={whatsappLink("Hi RentOMate! Please let me know when you start in my city: ")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 transition hover:border-sky-300 hover:text-sky-700">
            Request My City <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
  );
};
