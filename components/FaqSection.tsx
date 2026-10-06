"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is RentOMate?",
      a: "RentOMate is Coimbatore's premier water purifier subscription service. We provide cutting-edge RO+UV water purifiers on flexible 12 and 24-month rental plans with 100% free doorstep installation, free lifetime filter maintenance, and zero repair charges.",
    },
    {
      q: "Is 24/7 support available?",
      a: "Yes! We have a dedicated customer service and technician squad on standby 7 days a week to handle any filter replacements, TDS water checks, or routine maintenance inquiries.",
    },
    {
      q: "How does water purifier rental work?",
      a: "It's simple: 1) Pick a 12 or 24-month subscription plan. 2) Schedule a convenient installation slot. 3) Our verified technician installs the system and checks water quality. 4) Pay an affordable fixed monthly rental with zero hidden charges.",
    },
    {
      q: "Can tenants rent a purifier?",
      a: "Absolutely! RentOMate was designed with tenants and renters in mind. You don't need to purchase or transport bulky equipment. When you relocate within Coimbatore, our team handles uninstallation and re-installation at your new address for free.",
    },
    {
      q: "What are the rental plans?",
      a: "We currently offer two popular plans: 1) 12-Month Plan at ₹699/month, and 2) 24-Month Plan at ₹449/month. Both plans include full hardware, free periodic cartridge swaps, and 24/7 support.",
    },
    {
      q: "Which areas in Coimbatore do you serve?",
      a: "We serve all major localities in Coimbatore including RS Puram, Gandhipuram, Peelamedu, Saravanampatti, Saibaba Colony, Singanallur, Ramanathapuram, Vadavalli, Kovaipudur, Thudiyalur, Hopes College, and surrounding zones.",
    },
    {
      q: "Is installation included?",
      a: "Yes! Doorstep delivery, plumbing connections, electric setup, and initial water purity testing are completely free with every plan.",
    },
    {
      q: "How can I start a rental?",
      a: "You can click any 'Chat on WhatsApp' or 'Choose Plan' button on this page or call our team at +91 98765 43210 to book your delivery today.",
    },
    {
      q: "Is service included?",
      a: "Yes, all periodic sediment filter, carbon filter, and RO membrane replacements, as well as routine breakdown repairs, are 100% covered at no extra cost.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3"
          >
            Questions? We've Got Answers
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Questions
            </span>
          </motion.h2>
        </div>

        {/* 2-Column Responsive FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto items-start">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.1 }}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-sky-50/40 border-sky-300 shadow-sm"
                    : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-sm sm:text-base focus:outline-none"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? "text-sky-600" : "text-slate-400"}`} />
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-sky-100/80"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
