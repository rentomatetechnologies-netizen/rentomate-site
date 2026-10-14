"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { CITIES, SERVICE_LOCATIONS } from "@/lib/site";
import { whatsappLink } from "@/lib/contact";
import { useSiteActions } from "@/components/SiteShell";

// "Where We Serve": the cities from the header location picker, on a black band.
// The first city is featured with its service areas; the rest are listed beside it.
export const AvailableCities: React.FC = () => {
  const { openAvailability: onCheckAvailability } = useSiteActions();
  const [featured, ...otherCities] = SERVICE_LOCATIONS;
  const featuredAreas = CITIES.find((city) => city.name === featured)?.areas ?? [];

  return (
    <section id="cities" className="relative overflow-hidden bg-[#0a0a0a] py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.18),transparent_40%)]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-[10px] bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300 ring-1 ring-sky-400/25">
            <MapPin className="h-3.5 w-3.5" /> Available Cities
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Where We <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Serve</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            RentOMate purifiers are available in {SERVICE_LOCATIONS.length} cities across Tamil Nadu and Puducherry.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Featured city with its service areas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-500/15 via-white/[0.04] to-transparent p-6 sm:p-7 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-2xl font-extrabold text-white">
                <MapPin className="h-6 w-6 text-sky-400" /> {featured}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-[10px] bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-400/25">
                <CheckCircle2 className="h-3.5 w-3.5" /> Live
              </span>
            </div>
            {featuredAreas.length > 0 && (
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{featuredAreas.slice(0, 10).join(" · ")} and more.</p>
            )}
            <button
              type="button"
              onClick={onCheckAvailability}
              className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-110"
            >
              Check My Area <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Every other city */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-2 content-start gap-3 sm:grid-cols-3 lg:col-span-7"
          >
            {otherCities.map((city) => (
              <li
                key={city}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400/40 hover:bg-sky-400/10"
              >
                <MapPin className="h-4 w-4 shrink-0 text-sky-400" />
                {city}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Not listed */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <h3 className="text-lg font-extrabold text-white">Don&apos;t see your city?</h3>
            <p className="mt-1 text-sm text-slate-400">Tell us where you are and we&apos;ll let you know as soon as RentOMate reaches you.</p>
          </div>
          <a
            href={whatsappLink("Hi RentOMate! Please let me know when you start in my city: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition hover:border-sky-400/50 hover:bg-sky-400/10"
          >
            Request My City <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
