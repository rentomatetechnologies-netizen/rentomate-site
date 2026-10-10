"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { PHONE_HREF, whatsappLink } from "@/lib/contact";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = whatsappLink(
    "Hello RentOMate! I want to enquire about renting a water purifier in Coimbatore."
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-5 sm:py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Clean Brand Logo */}
        <a href="#" className="flex items-center focus:outline-none transition-transform hover:opacity-90">
          <Logo className="h-8 sm:h-9 w-auto" width={175} height={42} />
        </a>

        {/* Right: Exact Action Buttons from UI Design */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Call Pill */}
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 px-4 py-2.5 rounded border border-slate-200/90 bg-white/95 hover:bg-[#0084FF] hover:text-white text-slate-800 text-xs sm:text-sm font-semibold transition-all duration-300 hover:border-[#0084FF] active:scale-95 shadow-xs group"
          >
            <Phone className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-colors duration-300" />
            <span>Call</span>
          </a>

          {/* WhatsApp Pill */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded border border-slate-200/90 bg-white/95 hover:bg-[#25D366] hover:text-white text-slate-800 text-xs sm:text-sm font-semibold transition-all duration-300 hover:border-[#25D366] active:scale-95 shadow-xs group"
          >
            <MessageCircle className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-colors duration-300" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Compact Controls */}
        <div className="flex sm:hidden items-center gap-2">

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="p-2 rounded text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-6 py-5 shadow-xl"
          >
            <div className="flex flex-col gap-3">

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 py-2.5 rounded border border-slate-200 bg-white hover:bg-[#0084FF] hover:text-white font-semibold text-xs text-slate-800 shadow-xs transition-all duration-300 hover:border-[#0084FF] group"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-colors duration-300" />
                  <span>Call</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded border border-slate-200 bg-white hover:bg-[#25D366] hover:text-white font-semibold text-xs text-slate-800 shadow-xs transition-all duration-300 hover:border-[#25D366] group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-colors duration-300" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 text-xs font-semibold text-slate-600">
                <a href="#why-rentomate" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-sky-600">
                  Why RentOMate
                </a>
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-sky-600">
                  How It Works
                </a>
                <a href="#plans" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-sky-600">
                  Rental Plans
                </a>
                <a href="#rent-vs-buy" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-sky-600">
                  Rent vs Buy
                </a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-sky-600">
                  FAQs
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
