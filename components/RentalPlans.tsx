"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Shield, Zap } from "lucide-react";

interface RentalPlansProps {
  onSelectPlan?: (months: number) => void;
}

export const RentalPlans: React.FC<RentalPlansProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      months: 12,
      price: "699",
      popular: false,
      badge: "Flexible Commitment",
      features: [
        "Premium multi-stage RO + UV + TDS purifier",
        "100% Free Doorstep Installation",
        "Complete Periodic Filter & Candle Replacement",
        "24/7 Quick Priority Service Support",
        "Zero Maintenance Cost",
        "Free uninstallation on tenure completion",
      ],
      whatsappMsg: "Hello! I am interested in the 12 Months (₹699/month) water purifier rental plan in Coimbatore.",
    },
    {
      months: 24,
      price: "449",
      popular: true,
      badge: "Most Popular & Economical",
      features: [
        "Premium multi-stage RO + UV + TDS purifier",
        "100% Free Doorstep Installation",
        "Complete Periodic Filter & Candle Replacement",
        "24/7 Priority Emergency Service Support",
        "Zero Maintenance & Membrane Replacement Included",
        "Free uninstallation & citywide relocation assistance",
      ],
      whatsappMsg: "Hello! I am interested in the 24 Months (₹449/month) best-value water purifier rental plan in Coimbatore.",
    },
  ];

  const handleOrder = (msg: string, months: number) => {
    if (onSelectPlan) {
      onSelectPlan(months);
    } else {
      const url = `https://wa.me/+919876543210?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <section id="plans" className="py-24 bg-gradient-to-b from-white via-sky-50/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3"
          >
            Purifier On Rent
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Rental{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Plans
            </span>
          </motion.h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Simple, all-inclusive monthly subscriptions. No hidden charges, no deposit surprises.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.months}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all ${
                plan.popular
                  ? "bg-white border-2 border-sky-500 shadow-xl shadow-sky-500/10 ring-4 ring-sky-500/10"
                  : "bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                {/* Plan Tenure Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-slate-800">
                    {plan.months} Months Plan
                  </span>
                  {!plan.popular && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 mb-8 pb-6 border-b border-slate-100">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    ₹ {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">/ month</span>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
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
              <button
                onClick={() => handleOrder(plan.whatsappMsg, plan.months)}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-98 ${
                  plan.popular
                    ? "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-sky-600/25 hover:shadow-lg"
                    : "bg-slate-900 hover:bg-slate-800 text-white hover:shadow-md"
                }`}
              >
                <span>Choose Plan</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Security & Warranty Note */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="w-4 h-4 text-sky-600" />
          <span>No lock-in penalties after tenure. All service visits and spare parts included free.</span>
        </div>

      </div>
    </section>
  );
};
