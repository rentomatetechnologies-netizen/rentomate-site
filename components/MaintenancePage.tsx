"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin } from "lucide-react";
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

  const contactNumber = "+91 81100 16161";
  const whatsappUrl = `https://wa.me/918110016161?text=${encodeURIComponent(
    "Hi RentOMate! Need an immediate water purifier installation or have questions in Coimbatore."
  )}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-hidden select-none">

      {/* Subtle background ambient water-drop gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* TOP HEADER: Clean logo sized appropriately on top-right */}
      <header className="w-full px-6 sm:px-10 py-4 sm:py-5 flex justify-end items-center relative z-20">
        <div className="flex items-center">
          <Logo className="h-7 sm:h-8.5 w-auto" width={150} height={36} />
        </div>
      </header>

      {/* MAIN CONTENT: Centered Coming Soon with streamlined flow */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-3xl mx-auto w-full text-center py-4 sm:py-6 relative z-10">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-2.5"
        >
          Own Less.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500">
            Live Smart.
          </span>
        </motion.h1>

        {/* Small Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-slate-600 text-sm sm:text-base md:text-lg font-medium max-w-lg mx-auto mb-7 leading-relaxed"
        >
          Smart rentals for a simpler, more flexible lifestyle.
        </motion.p>

        {/* Countdown Context Label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 mb-3.5"
        >
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>We're launching in</span>
        </motion.div>

        {/* RUNNING COUNTDOWN TIMER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-5 w-full max-w-lg mb-8 sm:mb-9"
        >
          {[
            { label: "DAYS", value: mounted ? timeLeft.days : 0 },
            { label: "HOURS", value: mounted ? timeLeft.hours : 0 },
            { label: "MINUTES", value: mounted ? timeLeft.minutes : 0 },
            { label: "SECONDS", value: mounted ? timeLeft.seconds : 0 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-100 hover:border-sky-300 transition-all"
            >
              <span className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider mt-1 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Immediate Support / Direct WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-col items-center text-center max-w-lg mx-auto"
        >
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
            Can’t wait until launch?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
            Need an immediate installation or have questions? WhatsApp us right now at{" "}
            <a
              href="https://wa.me/918110016161?text=Hi%20RentOMate!%20Need%20an%20immediate%20water%20purifier%20installation%20in%20Coimbatore."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-900 hover:text-sky-600 underline underline-offset-4 decoration-sky-400 transition-colors"
            >
              +9181100 16161
            </a>
            .
          </p>

          <a
            href="https://wa.me/918110016161?text=Hi%20RentOMate!%20Need%20an%20immediate%20water%20purifier%20installation%20in%20Coimbatore."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#041635] hover:bg-[#082252] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all active:scale-95 group"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Chat with us on WhatsApp</span>
          </a>
        </motion.div>

      </main>

      {/* FOOTER: Minimal & Clean
      <footer className="w-full px-6 py-4 text-center text-xs text-slate-400 border-t border-slate-100 relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <span className="flex items-center gap-1.5 font-medium text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-sky-500" />
          Serving Coimbatore, Tamil Nadu
        </span>
        <span>© 2026 RentOMate. All rights reserved.</span>
      </footer> */}

    </div>
  );
};
