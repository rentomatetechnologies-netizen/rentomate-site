"use client";

import React from "react";
import { MessageCircle, Phone, LifeBuoy, Heart } from "lucide-react";
import { Logo } from "./Logo";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = "https://wa.me/+919876543210?text=" + encodeURIComponent("Hi RentOMate!");

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-100">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Logo />
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              Coimbatore’s trusted smart water purifier rental service. Pure drinking water made simple, flexible, and affordable.
            </p>
          </div>

          {/* Quick Contact Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Call: +91 98765 43210</span>
            </a>

            <a
              href="#faq"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-blue-600" />
              <span>Support & FAQs</span>
            </a>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} RentOMate. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </a>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> in Coimbatore
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
