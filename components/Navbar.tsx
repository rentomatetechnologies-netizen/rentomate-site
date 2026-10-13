"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LocationDropdown } from "./LocationDropdown";
import { useSiteActions } from "./SiteShell";
import { PHONE_HREF, whatsappLink } from "@/lib/contact";
import { NAV_LINKS } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export const Navbar: React.FC = () => {
  const { openLeadForm: onRentNow } = useSiteActions();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setMobileMenuOpen(false), [pathname]);

  const whatsappUrl = whatsappLink(
    "Hello RentOMate! I want to enquire about renting a water purifier in Coimbatore."
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled || mobileMenuOpen
          ? "bg-white/95 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-5 sm:py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Left: Brand Logo + Location */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <Link href="/" className="flex items-center focus:outline-none transition-transform hover:opacity-90">
            <Logo className="h-7 sm:h-9 w-auto" width={175} height={42} />
          </Link>
          <LocationDropdown className="hidden sm:block lg:hidden xl:block" />
        </div>

        {/* Centre: Page links (desktop) */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-sky-50 text-sky-700" : "text-slate-700 hover:text-sky-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Action Buttons */}
        <div className="hidden sm:flex shrink-0 items-center gap-3">
          {/* Call Pill – icon only on desktop to make room for the page links */}
          <a
            href={PHONE_HREF}
            aria-label="Call"
            title="Call"
            className="flex items-center gap-2 px-4 py-2.5 lg:px-3 rounded-[10px] border border-slate-200/90 bg-white/95 hover:bg-[#0084FF] hover:text-white text-slate-800 text-xs sm:text-sm font-semibold transition-all duration-300 hover:border-[#0084FF] active:scale-95 shadow-xs group"
          >
            <Phone className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-colors duration-300" />
            <span className="lg:hidden">Call</span>
          </a>

          {/* WhatsApp Pill */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            className="flex items-center gap-2 px-4 py-2.5 lg:px-3 rounded-[10px] border border-slate-200/90 bg-white/95 hover:bg-[#25D366] hover:text-white text-slate-800 text-xs sm:text-sm font-semibold transition-all duration-300 hover:border-[#25D366] active:scale-95 shadow-xs group"
          >
            <MessageCircle className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-colors duration-300" />
            <span className="lg:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onRentNow}
            className="whitespace-nowrap px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-500/25 transition-all active:scale-95"
          >
            Rent Now
          </button>

          {/* Menu toggle for tablets, where the page links don't fit */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-[10px] text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Compact Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <LocationDropdown />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-[10px] text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile / Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-6 py-5 shadow-xl"
          >
            <div className="flex flex-col gap-3">
              <nav aria-label="Main" className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-[10px] px-3 py-2 text-sm font-semibold transition-colors ${
                        active ? "bg-sky-50 text-sky-700" : "text-slate-700 hover:bg-slate-50 hover:text-sky-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="sm:hidden flex flex-col gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); onRentNow(); }}
                  className="w-full py-2.5 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm font-bold shadow-md shadow-sky-500/25"
                >
                  Rent Now
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-[10px] border border-slate-200 bg-white hover:bg-[#0084FF] hover:text-white font-semibold text-xs text-slate-800 shadow-xs transition-all duration-300 hover:border-[#0084FF] group"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-colors duration-300" />
                    <span>Call</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-[10px] border border-slate-200 bg-white hover:bg-[#25D366] hover:text-white font-semibold text-xs text-slate-800 shadow-xs transition-all duration-300 hover:border-[#25D366] group"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-colors duration-300" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
