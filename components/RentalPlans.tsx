"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Shield, Zap } from "lucide-react";

const CUSTOMER_FORM_URL = "https://app.akvinz.com/customerForm";

export const RentalPlans: React.FC = () => {
  const plans = [
    {
      months: 12,
      price: "699",
      popular: false,
      badge: "Flexible Commitment",
      features: [
        "Akvinz Ultron RO + UV + UF water purifier",
        "Installation included, subject to feasibility",
        "Maintenance according to subscription terms",
        "Eligible filter replacement according to subscription",
        "Service support",
        "12-month rental term",
      ],
    },
    {
      months: 24,
      price: "449",
      popular: true,
      badge: "Most Popular",
      features: [
        "Akvinz Ultron RO + UV + UF water purifier",
        "Installation included, subject to feasibility",
        "Maintenance according to subscription terms",
        "Eligible filter replacement according to subscription",
        "Service support",
        "24-month rental term",
      ],
    },
  ];

  return (
    <section id="plans" className="pt-8 pb-12 lg:pt-10 lg:pb-14 bg-gradient-to-b from-white via-sky-50/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded inline-block mb-3"
          >
            Water Purifier on Rent
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Water Purifier Rental{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Plans
            </span>
          </motion.h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Choose a plan that fits your home in Coimbatore. Refundable security deposit and subscription terms apply.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.months}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative rounded p-6 sm:px-8 sm:py-7 flex flex-col justify-between transition-all ${
                plan.popular
                  ? "bg-white border-2 border-sky-500 shadow-xl shadow-sky-500/10 ring-4 ring-sky-500/10"
                  : "bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300"
              }`}
            >
              <div>
                {/* Plan Tenure Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-lg font-bold text-slate-800">
                    {plan.months} Months Plan
                  </span>
                  {plan.popular ? (
                    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-sky-600 to-blue-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                      <Zap className="h-3 w-3 fill-current" />
                      {plan.badge}
                    </span>
                  ) : (
                    <span className="whitespace-nowrap rounded bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 mb-5 pb-4 border-b border-slate-100">
                  <span className="text-4xl sm:text-[2.75rem] font-black text-slate-900 tracking-tight">
                    ₹ {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">/ month</span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.popular ? "bg-sky-100 text-sky-600" : "bg-emerald-100 text-emerald-600"
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={CUSTOMER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-6 rounded font-bold text-sm transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-98 ${
                  plan.popular
                    ? "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-sky-600/25 hover:shadow-lg"
                    : "bg-slate-900 hover:bg-slate-800 text-white hover:shadow-md"
                }`}
              >
                <span>Choose Plan</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Security & Warranty Note */}
        <div className="mt-5 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="w-4 h-4 text-sky-600" />
          <span>Refundable security deposit and service eligibility are subject to the selected subscription terms.</span>
        </div>

      </div>
    </section>
  );
};
