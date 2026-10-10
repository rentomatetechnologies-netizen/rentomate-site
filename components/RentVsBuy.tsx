"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Droplets, Sparkles, XCircle } from "lucide-react";

const comparisonRows = [
  ["Initial payment", "Higher upfront purchase cost", "Monthly rental"],
  ["Ownership", "You own the purifier", "Rental subscription"],
  ["Maintenance", "Owner-managed", "Covered according to plan"],
  ["Filter replacement", "Owner-managed", "Included according to plan"],
  ["Moving home", "Requires moving the purifier", "Relocation support subject to terms"],
  ["Rental duration", "Not applicable", "12 or 24 months"],
];

export const RentVsBuy: React.FC = () => (
  <section id="rent-vs-buy" className="relative bg-white py-12 lg:py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3 inline-block rounded bg-sky-100/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">A Smarter Choice</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Water Purifier Rental vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Buying</span></motion.h2>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="overflow-hidden rounded border border-slate-200/90 bg-white shadow-sm lg:col-span-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead><tr className="border-b border-slate-100 bg-slate-50/70"><th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Feature</th><th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Buying</th><th className="bg-sky-50/50 px-6 py-4 text-xs font-bold uppercase tracking-wider text-sky-600">RentOMate</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{comparisonRows.map(([feature, buying, renting]) => <tr key={feature} className="transition-colors hover:bg-slate-50/50"><td className="px-6 py-4 font-bold text-slate-800">{feature}</td><td className="px-6 py-4 text-slate-500"><span className="flex items-center gap-2"><XCircle className="h-4 w-4 shrink-0 text-rose-400" />{buying}</span></td><td className="bg-sky-50/30 px-6 py-4 font-semibold text-slate-900"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />{renting}</span></td></tr>)}</tbody>
            </table>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex flex-col items-center justify-between overflow-hidden rounded border border-sky-200/70 bg-gradient-to-br from-sky-50 via-blue-50/50 to-cyan-50 p-8 text-center lg:col-span-4">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="relative z-10 my-auto"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25"><Droplets className="h-8 w-8" /></div><h3 className="mb-4 text-2xl font-black leading-snug text-slate-900">You don&apos;t need to own everything you use.</h3><p className="text-sm leading-relaxed text-slate-600">Choose a water purifier rental plan that fits your home, lifestyle, and time in Coimbatore.</p></div>
          <div className="relative z-10 mt-8 flex w-full items-center justify-center gap-1.5 border-t border-sky-200/60 pt-4 text-xs font-black tracking-widest text-sky-700"><Sparkles className="h-3.5 w-3.5" /> OWN LESS. LIVE SMART.</div>
        </motion.div>
      </div>
    </div>
  </section>
);
