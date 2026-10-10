"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Building2, KeyRound, Users2, Check, type LucideIcon } from "lucide-react";

const categories: { title: string; tag: string; desc: string; icon: LucideIcon; highlights: string[] }[] = [
  {
    title: "Homes",
    tag: "Families",
    desc: "Convenient purified drinking water for the whole family, without the upfront cost of buying a purifier.",
    icon: Home,
    highlights: ["RO + UV purification", "No upfront purchase"],
  },
  {
    title: "Apartments",
    tag: "Residential communities",
    desc: "A practical rental option for apartments and gated communities, with installation handled for you.",
    icon: Building2,
    highlights: ["Doorstep installation", "Service support"],
  },
  {
    title: "Tenants",
    tag: "Renters",
    desc: "Enjoy a purifier at home without a long-term ownership commitment, and no appliance to carry when you move.",
    icon: KeyRound,
    highlights: ["12 or 24-month plans", "No ownership hassle"],
  },
  {
    title: "PG / Shared Homes",
    tag: "Shared living",
    desc: "A convenient option for PGs, hostels and shared living spaces that need dependable in-home purified water.",
    icon: Users2,
    highlights: ["Water for everyone", "Maintenance as per plan"],
  },
];

export const ModernLiving: React.FC = () => {
  return (
    <section className="py-12 lg:py-14 bg-slate-50/60 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.10),transparent_65%)]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded inline-block mb-3"
          >
            Ideal for Every Lifestyle
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Water Purifier Rental for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Every Home
            </span>
          </motion.h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Whether you own, rent or share your space, there&apos;s a RentOMate plan that fits the way you live.
          </p>
        </div>

        {/* Lifestyle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="group relative overflow-hidden rounded border border-slate-200/80 bg-white p-5 sm:px-7 sm:py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-900/5"
              >
                {/* Soft corner glow on hover */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-100/0 blur-3xl transition-colors duration-500 group-hover:bg-sky-100/70" />

                {/* Index number */}
                <span className="pointer-events-none absolute right-6 top-5 text-5xl font-extrabold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-sky-100 sm:right-8 sm:top-6">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                  {/* Icon tile */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-600">
                      {item.tag}
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                      {item.desc}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                      {item.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
