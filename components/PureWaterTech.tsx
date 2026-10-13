"use client";

import React from "react";
import { motion } from "framer-motion";
import { Atom, BadgeIndianRupee, Bug, CalendarCheck, Droplets, FlaskConical, Gauge, ShieldCheck, Sparkles, Truck, type LucideIcon } from "lucide-react";
import { PRICE_PER_DAY } from "@/lib/site";

const stages: { name: string; desc: string; icon: LucideIcon }[] = [
  { name: "Sediment & Carbon", desc: "Removes dust, sand, dirt, chlorine, pesticides and organic impurities for better taste.", icon: Sparkles },
  { name: "RO (Reverse Osmosis)", desc: "Removes dissolved solids, heavy metals, arsenic and chemicals.", icon: Droplets },
  { name: "UV (Ultraviolet)", desc: "Eliminates bacteria, viruses and other microbes.", icon: Bug },
  { name: "UF (Ultrafiltration)", desc: "Hollow-fibre membrane removes fine physical impurities and cysts.", icon: FlaskConical },
  { name: "TDS Controller", desc: "Keeps the right level of dissolved minerals in your water.", icon: Gauge },
  { name: "Copper & Minerals", desc: "Copper enriched, with essential minerals and balanced alkaline pH.", icon: Atom },
];

const zeroes: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "₹0", label: "Machine cost", icon: BadgeIndianRupee },
  { value: "₹0", label: "Service cost", icon: ShieldCheck },
  { value: "₹0", label: "Annual maintenance", icon: CalendarCheck },
  { value: "0%", label: "Ownership tension", icon: Truck },
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
        {zeroes.map(({ value, label, icon: Icon }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 rounded-[10px] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-4">
            <Icon className="h-8 w-8 shrink-0 text-sky-600" strokeWidth={1.6} />
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
        <p className="mt-3 text-sm text-slate-600 sm:text-base">Every RentOMate purifier is an Akvinz 8-stage RO system. Here is what each stage does for your water.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map(({ name, desc, icon: Icon }, index) => (
          <motion.div key={name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="flex gap-4 rounded-[10px] border border-slate-200/80 bg-slate-50/60 p-5 transition hover:border-sky-200 hover:bg-white hover:shadow-lg hover:shadow-sky-900/5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-slate-900">{name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* RentOMate assurance */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {assurances.map((item) => (
          <div key={item.title} className="rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600">RentOMate Assurance</p>
            <h3 className="mt-1 text-xl font-extrabold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
