"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, CalendarCheck, Home, CheckCircle2 } from "lucide-react";

export const WhyRentomate: React.FC = () => {
  const features = [
    {
      icon: Wallet,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-50 border-sky-100",
      title: "No Large Purchase",
      description: "Use a premium water purifier without buying it outright. Save your hard-earned money with zero heavy upfront capital.",
      highlight: "Save up to ₹15,000 upfront",
    },
    {
      icon: CalendarCheck,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 border-blue-100",
      title: "Simple Rental",
      description: "Choose the rental plan that fits your needs. Hassle-free automatic monthly payments with clear, transparent terms.",
      highlight: "12 or 24 month flexible terms",
    },
    {
      icon: Home,
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-50 border-cyan-100",
      title: "Flexible Living",
      description: "A practical choice for modern homes and changing lifestyles. Moving homes? We handle uninstallation and reinstall.",
      highlight: "Free citywide relocation",
    },
  ];

  return (
    <section id="why-rentomate" className="py-20 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative subtle background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3"
          >
            A Smarter Way to Access Clean Water
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              RentOMate?
            </span>
          </motion.h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                {/* Top glow accent */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-sky-500 to-blue-500 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className={`w-14 h-14 rounded-2xl border ${item.iconBg} flex items-center justify-center ${item.iconColor} mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
