"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Droplets, Sparkles } from "lucide-react";

export const RentVsBuy: React.FC = () => {
  const comparisonRows = [
    {
      feature: "Payment",
      buy: "Large upfront cost (₹15,000+)",
      rent: "Affordable monthly payment",
      rentHighlight: true,
    },
    {
      feature: "Ownership",
      buy: "Depreciating asset stuck with you",
      rent: "Pay only for what you use",
      rentHighlight: true,
    },
    {
      feature: "Flexibility",
      buy: "Rigid & difficult to resell",
      rent: "High flexibility with 12/24m terms",
      rentHighlight: true,
    },
    {
      feature: "Maintenance & Filters",
      buy: "Costly candles & repair bills",
      rent: "100% Free & automated replacements",
      rentHighlight: true,
    },
    {
      feature: "Relocating / Moving",
      buy: "Heavy dismantling hassle",
      rent: "Free relocation service in Coimbatore",
      rentHighlight: true,
    },
  ];

  return (
    <section id="rent-vs-buy" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3"
          >
            A Smarter Choice
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Rent vs{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Buy
            </span>
          </motion.h2>
        </div>

        {/* Grid Layout: Comparison Table + Highlight Quote Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Feature
                    </th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Buying
                    </th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50/50">
                      RentOMate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-slate-500 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 hidden sm:inline" />
                        <span>{row.buy}</span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-900 bg-sky-50/30">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{row.rent}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right: Modern Philosophy Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50/50 to-cyan-50 border border-sky-200/70 p-8 flex flex-col justify-between items-center text-center relative overflow-hidden"
          >
            {/* Background Droplet Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-300/30 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 mb-6">
              <Droplets className="w-8 h-8" />
            </div>

            <div className="relative z-10 my-auto">
              <h3 className="text-2xl font-black text-slate-900 leading-snug mb-4">
                You don’t need to own everything you use.
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Upgrade your lifestyle with modern subscription freedom. No maintenance stress, no high depreciations.
              </p>
            </div>

            <div className="relative z-10 w-full pt-4 border-t border-sky-200/60">
              <span className="text-xs font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                OWN LESS. LIVE SMART.
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
