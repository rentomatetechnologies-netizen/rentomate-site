"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sliders, PhoneCall, Droplets, ArrowRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Choose",
      desc: "Select the 12 or 24-month rental plan tailored for your family size or lifestyle.",
      icon: Sliders,
      color: "from-sky-500 to-blue-600",
    },
    {
      num: "02",
      title: "Connect",
      desc: "Reach out via WhatsApp or call to confirm availability in your Coimbatore locality.",
      icon: PhoneCall,
      color: "from-blue-600 to-indigo-600",
    },
    {
      num: "03",
      title: "Start",
      desc: "Our technician provides free doorstep installation and testing. Enjoy pure water instantly!",
      icon: Droplets,
      color: "from-cyan-500 to-sky-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3"
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
            Get Your Purifier in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              3 Steps
            </span>
          </motion.h2>
        </div>

        {/* Steps Road Map */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-sky-300 hover:shadow-xl transition-all group"
                >
                  {/* Step Number Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-sky-500/25 mb-6 group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
};
