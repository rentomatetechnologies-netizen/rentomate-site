"use client";

import React from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_HREF, SOCIAL_HANDLE, SUPPORT_EMAIL, whatsappLink } from "@/lib/contact";

const quickLinks = [
  { label: "Why RentOMate", href: "#why-rentomate" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Rental Plans", href: "#plans" },
  { label: "Rent vs Buy", href: "#rent-vs-buy" },
  { label: "FAQs", href: "#faq" },
];

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
  </svg>
);

const socials = [
  { label: "Instagram", href: INSTAGRAM_URL, icon: InstagramIcon, hover: "hover:border-transparent hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]" },
  { label: "Facebook", href: FACEBOOK_URL, icon: FacebookIcon, hover: "hover:border-[#1877F2] hover:bg-[#1877F2]" },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = whatsappLink("Hi RentOMate! I would like to know more about renting a water purifier.");

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-28 sm:px-6 md:pb-8 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Water purifier rental in Coimbatore. Pure drinking water made simple, flexible and affordable with monthly plans.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
              <MapPin className="h-4 w-4 text-sky-600" />
              Serving homes across Tamilnadu
            </p>

            {/* Social */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-900">Follow us</p>
              <div className="mt-3 flex items-center gap-3">
                {socials.map(({ label, href, icon: Icon, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`RentOMate on ${label} (@${SOCIAL_HANDLE})`}
                    className={`group inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-white ${hover}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">@{SOCIAL_HANDLE}</p>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-900">Explore</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-700">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-900">Get in touch</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded border border-slate-200 bg-white px-4 py-3.5 text-slate-900 transition hover:border-slate-300 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-700">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-bold">Chat on WhatsApp</span>
                  <span className="block text-xs font-medium text-slate-500">Quick replies from our team</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href={PHONE_HREF}
                className="group flex items-center gap-3.5 rounded border border-slate-200 bg-white px-4 py-3.5 text-slate-900 transition hover:border-slate-300 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-700">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-bold">Call us</span>
                  <span className="block text-xs font-medium text-slate-500">Talk to us directly</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-4 inline-flex items-center gap-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-sky-700"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-sky-600">
                <Mail className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">Support</span>
                {SUPPORT_EMAIL}
              </span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} RentOMate. All rights reserved.</p>
          <p>Coimbatore, Tamil Nadu</p>
        </div>

      </div>
    </footer>
  );
};
