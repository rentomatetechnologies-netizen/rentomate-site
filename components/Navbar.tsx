"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, Headphones, ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onCheckAvailability?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCheckAvailability }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappNumber = "+919876543210";
  const whatsappMessage = encodeURIComponent(
    "Hello RentOMate! I want to enquire about renting a water purifier in Coimbatore."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-xs py-3 border-b border-slate-100"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Clean Brand Logo */}
        <a href="#" className="flex items-center focus:outline-none transition-transform hover:opacity-90">
          <Logo className="h-8 sm:h-9 w-auto" width={175} height={42} />
        </a>

        {/* Right: Exact Action Buttons from UI Design */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Chat on WhatsApp Pill */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#041635] hover:bg-[#082252] text-white text-xs sm:text-sm font-semibold transition-all hover:shadow-lg hover:shadow-slate-900/10 active:scale-95 group"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-90 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Call Pill */}
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200/90 bg-white/95 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all hover:border-slate-300 active:scale-95 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-slate-700" />
            <span>Call</span>
          </a>

          {/* Support Pill */}
          <a
            href="#faq"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200/90 bg-white/95 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all hover:border-slate-300 active:scale-95 shadow-xs"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-700" />
            <span>Support</span>
          </a>
        </div>

        {/* Mobile Compact Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#041635] text-white text-xs font-semibold shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">WhatsApp</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#041635] text-white font-semibold text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-slate-200 bg-white font-semibold text-xs text-slate-800 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-700" />
                  <span>Call</span>
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-slate-200 bg-white font-semibold text-xs text-slate-800 shadow-xs"
                >
                  <Headphones className="w-3.5 h-3.5 text-slate-700" />
                  <span>Support</span>
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
