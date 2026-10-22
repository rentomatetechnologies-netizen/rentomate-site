"use client";

import React from "react";
import { motion } from "framer-motion";
import { Atom, BadgeIndianRupee, Bug, CalendarCheck, Droplets, FlaskConical, Gauge, GlassWater, ShieldCheck, Sparkles, TestTube, Truck, type LucideIcon } from "lucide-react";
import { PRICE_PER_DAY } from "@/lib/site";

// The water's journey, in order. `modelDependent` stages are only on some models and are marked as such.
const stages: { name: string; desc: string; icon: LucideIcon; modelDependent?: boolean }[] = [
  { name: "Sediment & Carbon", desc: "Removes dust, sand, dirt, chlorine, pesticides and organic impurities for better taste.", icon: Sparkles },
  { name: "RO (Reverse Osmosis)", desc: "Removes dissolved solids, heavy metals, arsenic and chemicals.", icon: Droplets },
  { name: "UV (Ultraviolet)", desc: "Eliminates bacteria, viruses and other microbes.", icon: Bug },
  { name: "UF (Ultrafiltration)", desc: "Hollow-fibre membrane removes fine physical impurities and cysts.", icon: FlaskConical },
  { name: "TDS Controller", desc: "Keeps the right level of dissolved minerals in your water.", icon: Gauge },
  { name: "Copper & Minerals", desc: "Copper enriched, with essential minerals added back after purification.", icon: Atom },
  {
    name: "Balanced Alkaline pH",
    desc: "Raises and balances the pH of purified water for fresh, mildly alkaline drinking water.",
    icon: TestTube,
    modelDependent: true,
  },
];

// Each tile has its own colour: `tile` styles the card, `icon` the icon badge.
const zeroes: { value: string; label: string; icon: LucideIcon; tile: string; iconTone: string }[] = [
  { value: "₹0", label: "Machine cost", icon: BadgeIndianRupee, tile: "border-emerald-100 from-emerald-50", iconTone: "bg-emerald-100 text-emerald-600" },
  { value: "₹0", label: "Service cost", icon: ShieldCheck, tile: "border-sky-100 from-sky-50", iconTone: "bg-sky-100 text-sky-600" },
  { value: "₹0", label: "Annual maintenance", icon: CalendarCheck, tile: "border-violet-100 from-violet-50", iconTone: "bg-violet-100 text-violet-600" },
  { value: "0%", label: "Ownership tension", icon: Truck, tile: "border-amber-100 from-amber-50", iconTone: "bg-amber-100 text-amber-600" },
];

const assurances = [
  { title: "Affordable", desc: `Plans from about ₹${PRICE_PER_DAY} a day, with longer plans saving you more.` },
  { title: "Flexible", desc: "Choose 12 or 24 months, with relocation support when you move." },
  { title: "Reliable", desc: "ISI certified machines with free service and filter swaps." },
];

export const PureWaterTech: React.FC = () => (
  <section id="technology" className="relative bg-white py-12 lg:py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      {/* ₹0 strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {zeroes.map(({ value, label, icon: Icon, tile, iconTone }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`flex items-center gap-3 rounded-[10px] border bg-gradient-to-br to-white p-4 ${tile}`}>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] ${iconTone}`}>
              <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden />
            </span>
            <div>
              <p className="text-2xl font-black leading-none text-[#051838]">{value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-600">{label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mb-8 mt-12 max-w-2xl text-center">
        <span className="mb-3 inline-block rounded-[10px] bg-sky-100/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">Product Technology</span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Technology Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Pure Water</span></h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">Every Rent O&apos; Mate purifier features an advanced Akvinz RO purification system, with 8-stage or 10-stage filtration depending on the model. Here&apos;s how each stage helps purify your water.</p>
      </div>

      {/* Numbered stage cards, then a "result" card: 8 cards, so two even rows of 4 on desktop and 2 per row on tablets */}
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map(({ name, desc, icon: Icon, modelDependent }, index) => (
          <motion.li
            key={name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`group relative flex flex-col overflow-hidden rounded-[10px] border p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/5 ${
              modelDependent ? "border-dashed border-sky-300 bg-sky-50/50 hover:border-sky-400" : "border-slate-200 bg-white hover:border-sky-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Stage <span className="text-sky-600">{String(index + 1).padStart(2, "0")}</span>
              </span>
            </div>
            <h3 className="mt-5 font-extrabold text-slate-900">{name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{desc}</p>
            {modelDependent && (
              <span className="mt-auto pt-4">
                <span className="inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 ring-1 ring-amber-200">*Depends on the model</span>
              </span>
            )}
            {/* Accent line that slides in on hover */}
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-sky-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
          </motion.li>
        ))}

        {/* The result of every stage above */}
        <motion.li
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: stages.length * 0.05 }}
          className="relative flex flex-col overflow-hidden rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] p-5 text-white shadow-lg shadow-sky-900/20"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-400/25 blur-2xl" aria-hidden />
          <div className="relative flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white/15 ring-1 ring-white/25">
              <GlassWater className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-200">Result</span>
          </div>
          <h3 className="relative mt-5 font-extrabold">Pure water at your tap</h3>
          <p className="relative mt-1.5 text-sm leading-relaxed text-sky-100">Safe, great-tasting drinking water for your whole family, every single day.</p>
        </motion.li>
      </ol>

      {/* Rent O' Mate assurance */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {assurances.map((item) => (
          <div key={item.title} className="rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600">Rent O&apos; Mate Assurance</p>
            <h3 className="mt-1 text-xl font-extrabold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
