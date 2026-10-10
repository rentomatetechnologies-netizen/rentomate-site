"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sliders, PhoneCall, Wrench, Droplets } from "lucide-react";
import { WaterHoverCard } from "./WaterHoverCard";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Choose",
      desc: "Choose a 12-month or 24-month RentOMate rental plan for your home.",
      icon: Sliders,
      color: "from-sky-500 to-blue-600",
    },
    {
      num: "02",
      title: "Connect",
      desc: "Contact us through WhatsApp or phone and check availability for your Coimbatore location.",
      icon: PhoneCall,
      color: "from-blue-600 to-indigo-600",
    },
    {
      num: "03",
      title: "Install",
      desc: "Our team arranges installation at your home, subject to location and installation feasibility.",
      icon: Wrench,
      color: "from-cyan-500 to-sky-600",
    },
    {
      num: "04",
      title: "Enjoy",
      desc: "Use your purifier while maintenance and eligible service support are handled according to your subscription plan.",
      icon: Droplets,
      color: "from-sky-500 to-blue-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 lg:py-14 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded inline-block mb-3"
          >
            Simple and Hassle-Free
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            How Does Water Purifier Rental{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Work?
            </span>
          </motion.h2>
        </div>

        {/* Steps Road Map */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="h-full"
              >
                <WaterHoverCard className="h-full rounded border border-slate-200/70 bg-slate-50/70 transition-[border-color,box-shadow,transform,background-color] duration-500 hover:-translate-y-1 hover:border-sky-300 hover:bg-white hover:shadow-xl hover:shadow-sky-900/10">
                <div className="flex h-full flex-col items-center p-6 text-center sm:p-8">
                  {/* Step Number Badge */}
                  <div className="w-14 h-14 rounded bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-sky-500/25 mb-6 group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>

                  <div className="w-10 h-10 rounded bg-white/80 flex items-center justify-center text-sky-600 mb-4 ring-1 ring-sky-100">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed max-w-xs group-hover:text-slate-700 transition-colors">
                    {step.desc}
                  </p>
                </div>
                </WaterHoverCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
