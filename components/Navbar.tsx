"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { LiquidNav } from "./LiquidNav";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = whatsappLink(
    "Hello Rent O' Mate! I want to enquire about renting a water purifier."
  );

  return (
    // Floating glass bar: the outer header is transparent so page content scrolls visibly under the blurred pill.
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full border border-white/70 bg-white/60 pl-4 pr-2.5 shadow-[0_8px_32px_rgba(15,23,42,0.10)] ring-1 ring-slate-900/5 backdrop-blur-xl backdrop-saturate-150 sm:pl-5">

        {/* Left: Brand Logo + Location */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Link href="/" className="flex items-center focus:outline-none transition-transform hover:opacity-90">
            <Logo className="h-5 sm:h-6 w-auto" width={120} height={29} />
          </Link>
          <LocationDropdown className="hidden sm:block lg:hidden xl:block" />
        </div>

        {/* Centre: Page links (desktop) */}
        <LiquidNav />

        {/* Right: Action Buttons */}
        <div className="hidden sm:flex shrink-0 items-center gap-3">
          {/* Call Pill – icon only on desktop to make room for the page links */}
          <a
            href={PHONE_HREF}
            aria-label="Call"
            title="Call"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/50 text-[#243650] transition-colors hover:bg-white/90 active:scale-95"
          >
            <Phone className="h-4 w-4" />
          </a>

          {/* WhatsApp Pill */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/50 text-[#243650] transition-colors hover:bg-white/90 active:scale-95"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
          </a>

          <button
            type="button"
            onClick={onRentNow}
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#078BDF] to-[#145DFF] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95 sm:text-sm"
          >
            Rent Now
          </button>

          {/* Menu toggle for tablets, where the page links don't fit */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-white/70 transition-colors"
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
            className="p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-white/70 transition-colors"
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
            className="lg:hidden mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/70 bg-white/75 px-5 py-5 shadow-[0_8px_32px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5 backdrop-blur-xl backdrop-saturate-150"
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
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors duration-300" />
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
