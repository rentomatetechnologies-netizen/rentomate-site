"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeIndianRupee, Handshake, HelpCircle, MessagesSquare, type LucideIcon } from "lucide-react";
import { FAQ_SEGMENTS, FAQ_STRUCTURED_DATA, type FaqSegment } from "@/lib/faqs";

const icons: Record<FaqSegment["id"], LucideIcon> = { trust: Handshake, common: MessagesSquare, pricing: BadgeIndianRupee };
const segments = FAQ_SEGMENTS.map((segment) => ({ ...segment, icon: icons[segment.id] }));

const ease = [0.4, 0, 0.2, 1] as const;

const FaqItem = ({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) => (
  <div className={`overflow-hidden rounded-[10px] border transition-[border-color,background-color,box-shadow] duration-300 ${isOpen ? "border-sky-300 bg-sky-50/40 shadow-sm" : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50"}`}>
    <button type="button" aria-expanded={isOpen} onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-slate-800 sm:text-base">
      <span className="flex items-center gap-2.5">
        <HelpCircle className={`h-4 w-4 shrink-0 transition-colors duration-300 ${isOpen ? "text-sky-600" : "text-slate-400"}`} />
        {question}
      </span>
      <span className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-300 ${isOpen ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-500"}`}>
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
  const [segmentId, setSegmentId] = useState(segments[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = (segments.find((segment) => segment.id === segmentId) ?? segments[0]).faqs;
  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];

  return (
    <section id="faq" className="relative bg-white py-12 lg:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_STRUCTURED_DATA) }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3 inline-block rounded-[10px] bg-sky-100/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">Helpful answers</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Questions</span></motion.h2>
        </div>

        <div role="tablist" className="mx-auto mb-6 grid max-w-3xl grid-cols-3 gap-2">
          {segments.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={segmentId === id}
              onClick={() => { setSegmentId(id); setOpenIndex(0); }}
              className={`flex flex-col items-center justify-center gap-1 rounded-[10px] border px-2 py-2.5 text-[11px] font-bold transition sm:flex-row sm:gap-2 sm:text-sm ${segmentId === id ? "border-sky-600 bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/20" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"}`}
            >
              <Icon className="h-4 w-4 shrink-0" /> {label}
            </button>
          ))}
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
