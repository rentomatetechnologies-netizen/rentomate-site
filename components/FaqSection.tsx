"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  ["What is RentOMate?", "RentOMate is a water purifier rental service offering Akvinz RO water purifiers through flexible 12-month and 24-month plans in Coimbatore."],
  ["How does water purifier rental work?", "Choose a rental plan, contact RentOMate to check availability, complete the subscription process, and arrange installation at your location."],
  ["How much does a water purifier rental cost in Coimbatore?", "RentOMate offers a 12-month plan at ₹699 per month and a 24-month plan at ₹449 per month. Applicable refundable security deposits and subscription terms should be reviewed before subscribing."],
  ["Is installation included?", "Installation is included, subject to installation feasibility at your location."],
  ["Is maintenance included?", "Maintenance and eligible filter replacements are included according to the applicable subscription terms."],
  ["Can tenants rent a water purifier?", "Yes. Rental can be suitable for tenants who want a purifier without purchasing and transporting one when they move."],
  ["Can I rent a purifier for an apartment?", "Yes. RentOMate is designed for residential use including apartments, homes, and shared living spaces, subject to service availability."],
  ["Which areas of Coimbatore do you serve?", "RentOMate serves Coimbatore locations subject to availability. Contact us with your locality to check service availability."],
  ["What purifier does RentOMate provide?", "The RentOMate program features the Akvinz Ultron RO water purifier with multiple purification stages."],
  ["Can I relocate the purifier?", "Relocation can be requested and is subject to location feasibility and the applicable subscription terms."],
];

const ease = [0.4, 0, 0.2, 1] as const;

const FaqItem = ({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) => (
  <div className={`overflow-hidden rounded border transition-[border-color,background-color,box-shadow] duration-300 ${isOpen ? "border-sky-300 bg-sky-50/40 shadow-sm" : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50"}`}>
    <button type="button" aria-expanded={isOpen} onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-slate-800 sm:text-base">
      <span className="flex items-center gap-2.5">
        <HelpCircle className={`h-4 w-4 shrink-0 transition-colors duration-300 ${isOpen ? "text-sky-600" : "text-slate-400"}`} />
        {question}
      </span>
      <span className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded transition-colors duration-300 ${isOpen ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-500"}`}>
        <span className="absolute h-0.5 w-3 rounded-full bg-current" />
        <span className={`absolute h-3 w-0.5 rounded-full bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : "scale-y-100"}`} />
      </span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.35, ease }, opacity: { duration: 0.25, delay: 0.1 } } }}
          exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.3, ease }, opacity: { duration: 0.15 } } }}
        >
          <div className="mx-5 border-t border-sky-100/80 pb-5 pt-3 text-sm leading-relaxed text-slate-600">{answer}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];

  return (
    <section id="faq" className="relative bg-white py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3 inline-block rounded bg-sky-100/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">Helpful answers</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Questions</span></motion.h2>
        </div>

        {/* Two independent columns, so opening a question only moves the questions below it */}
        <div className="mx-auto grid max-w-5xl items-start gap-4 md:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map(([question, answer], rowIndex) => {
                const index = columnIndex * half + rowIndex;
                return (
                  <motion.div key={question} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: rowIndex * 0.08 }}>
                    <FaqItem question={question} answer={answer} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
