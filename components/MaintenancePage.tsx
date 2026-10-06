"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Sparkles, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { Logo } from "./Logo";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

export const MaintenancePage: React.FC = () => {
  // Target Launch Date: 12th October 2026 at exact 00:00:00 (Midnight)
  const targetDate = new Date("2026-10-12T00:00:00");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isLive: false,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const contactNumber = "+91 98765 43210";
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hi RentOMate! I want to enquire about renting a water purifier in Coimbatore ahead of the official launch."
  )}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-hidden select-none">

      {/* Subtle background ambient water-drop gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* TOP HEADER: Logo strictly positioned on the TOP RIGHT CORNER as requested */}
      <header className="w-full px-6 sm:px-12 py-6 sm:py-8 flex justify-end items-center relative z-20">
        <div className="flex items-center gap-3">
          <Logo className="h-8 sm:h-11 w-auto" width={180} height={44} />
        </div>
      </header>

      {/* MAIN CONTENT: Centered Coming Soon & Live Countdown Timer */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-4xl mx-auto w-full text-center py-6 sm:py-12 relative z-10">



        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-4"
        >
          Own Less.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500">
            Live Smart.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Our platform goes live on <span className="font-bold text-slate-900">12th October at 00:00 HRS</span>. Can't wait till Experience Coimbatore’s smartest water purifier rental service.
        </motion.p>

        {/* RUNNING COUNTDOWN TIMER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-6 w-full max-w-xl mb-12"
        >
          {[
            { label: "DAYS", value: mounted ? timeLeft.days : 0 },
            { label: "HOURS", value: mounted ? timeLeft.hours : 0 },
            { label: "MINUTES", value: mounted ? timeLeft.minutes : 0 },
            { label: "SECONDS", value: mounted ? timeLeft.seconds : 0 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100 hover:border-sky-300 transition-all"
            >
              <span className="text-2xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider mt-1.5 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CONTACT SECTION: Displayed right below the timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-md bg-slate-50/80 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>Pre-Bookings & Support Active 24/7</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
            Need a water purifier installed immediately or have questions before launch? Reach out to us directly:
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${contactNumber.replace(/\s+/g, "")}`}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-sm shadow-xs transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>{contactNumber}</span>
            </a>

            {/* WhatsApp Chat Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#041635] hover:bg-[#082252] text-white font-bold text-sm shadow-md transition-all active:scale-95 group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </motion.div>

      </main>

      {/* FOOTER: Minimal & Clean */}
      <footer className="w-full px-6 py-5 text-center text-xs text-slate-400 border-t border-slate-100 relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <span className="flex items-center gap-1.5 font-medium text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-sky-500" />
          Serving Coimbatore, Tamil Nadu
        </span>
        <span>© 2026 RentOMate. All rights reserved.</span>
      </footer>

    </div>
  );
};
