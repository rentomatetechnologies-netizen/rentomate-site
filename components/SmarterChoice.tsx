"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { LOWEST_PRICE, PRICE_PER_DAY } from "@/lib/site";

const columns = ["Rent O' Mate (Rent)", "Water Cans", "Buying a Purifier"];

const rows: [string, string, string, string][] = [
  ["Water safety", "8 stage purified at your tap", "Source unclear", "Varies, often limited filtration"],
  ["Purification", "RO + UV + UF + TDS + Copper", "Unknown process", "Basic, few filter options"],
  ["Cost", `₹${LOWEST_PRICE}/month (about ₹${PRICE_PER_DAY}/day)`, "₹40–₹50 per 20 L can", "₹10,000–₹20,000 upfront + yearly upkeep"],
  ["Service & filters", "Free, with call & WhatsApp support", "Manual ordering & coordination", "Paid filter changes & AMC renewals"],
  ["Relocation", "Doorstep relocation support*", "Not applicable", "Costly reinstallation"],
];

const ratings: [string, number, number, number][] = [
  ["Trust & water safety", 5, 1, 3],
  ["Convenience & effort", 5, 1, 2],
  ["Long-term value", 5, 1, 1],
];

const Stars = ({ count }: { count: number }) => (
  <span className="inline-flex gap-0.5" aria-label={`${count} out of 5`}>
    {Array.from({ length: count }, (_, index) => <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
  </span>
);

const cell = "px-5 py-4";

export const SmarterChoice: React.FC = () => (
  <section id="smarter-choice" className="relative bg-slate-50/70 py-12 lg:py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3 inline-block rounded-[10px] bg-sky-100/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">Can vs Buy vs Rent</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Why Rent O&apos; Mate Is the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Smarter Choice</span></motion.h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">Choose your current drinking water solution and discover how renting a water purifier can save you time, protect your health, and reduce costs.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-[10px] border border-slate-200/90 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className={`${cell} text-xs font-bold uppercase tracking-wider text-slate-500`}>Factor</th>
                {columns.map((column, index) => (
                  <th key={column} className={`${cell} text-xs font-bold uppercase tracking-wider ${index === 0 ? "bg-sky-50 text-sky-700" : "text-slate-500"}`}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(([factor, rent, cans, buy]) => (
                <tr key={factor} className="transition-colors hover:bg-slate-50/50">
                  <td className={`${cell} font-bold text-slate-800`}>{factor}</td>
                  <td className={`${cell} bg-sky-50/40 font-semibold text-slate-900`}>{rent}</td>
                  <td className={`${cell} text-slate-500`}>{cans}</td>
                  <td className={`${cell} text-slate-500`}>{buy}</td>
                </tr>
              ))}
              {ratings.map(([factor, rent, cans, buy]) => (
                <tr key={factor} className="transition-colors hover:bg-slate-50/50">
                  <td className={`${cell} font-bold text-slate-800`}>{factor}</td>
                  <td className={`${cell} bg-sky-50/40`}><Stars count={rent} /></td>
                  <td className={cell}><Stars count={cans} /></td>
                  <td className={cell}><Stars count={buy} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  </section>
);
