"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck, RotateCcw, ShieldCheck, Wrench } from "lucide-react";
import { CUSTOMER_FORM_URL } from "@/lib/site";

const points = [
  { title: "Install at zero cost", desc: "We install the purifier at your home free of charge.", icon: Wrench },
  { title: "Use it for 7 days", desc: "Taste the difference and see how easy it is.", icon: CalendarCheck },
  { title: "Not happy? Cancel", desc: "We uninstall it and refund your security deposit.*", icon: RotateCcw },
];

export const FreeTrial: React.FC = () => {
  return (
  <section id="free-trial" className="bg-white py-12 lg:py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] px-6 py-10 text-white sm:px-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider"><ShieldCheck className="h-3.5 w-3.5" /> Risk-Free</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">7-Day Risk-Free Trial</h2>
            <p className="mt-3 text-sm leading-relaxed text-sky-100 sm:text-base">Try a Rent O&apos; Mate purifier at home for 7 days. If it isn&apos;t right for you, cancel — no questions asked.</p>
            <a href={CUSTOMER_FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-[10px] bg-white px-7 py-3 text-sm font-bold text-[#051838] shadow-lg transition hover:bg-sky-50">Start My Free Trial</a>
            <p className="mt-3 text-[11px] text-sky-200">*Conditions apply.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {points.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="rounded-[10px] border border-white/15 bg-white/10 p-4 backdrop-blur">
                <Icon className="h-6 w-6 text-sky-300" />
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-sky-100">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};
