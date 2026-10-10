"use client";

import React from "react";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
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
  { label: "Instagram", href: INSTAGRAM_URL, icon: InstagramIcon },
  { label: "Facebook", href: FACEBOOK_URL, icon: FacebookIcon },
];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const plans = [
  { label: "24-Month Plan", price: "₹449", note: "Most popular" },
  { label: "12-Month Plan", price: "₹699", note: "Flexible commitment" },
];

const headingClass = "text-xs font-bold uppercase tracking-[0.2em] text-slate-900";
const contactClass = "inline-flex items-center gap-2 whitespace-nowrap rounded border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:shadow-sm";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = whatsappLink("Hi RentOMate! I would like to know more about renting a water purifier.");

  return (
    <footer className="border-t border-slate-200/70 bg-gradient-to-b from-white to-slate-50/80">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-28 sm:px-6 md:pb-8 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.7fr_1.55fr] lg:gap-0 lg:divide-x lg:divide-slate-200">

          {/* Brand */}
          <div className="lg:pr-10">
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-600">
              Water purifier rental in Coimbatore. Pure drinking water made simple, flexible and affordable.
            </p>
            <p className="mt-5 inline-flex items-center gap-2.5 text-[15px] text-slate-600">
              <MapPin className="h-5 w-5 text-sky-600" />
              Serving homes across Tamil Nadu
            </p>
            <div className="mt-7 flex items-center gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`RentOMate on ${label} (@${SOCIAL_HANDLE})`}
                  title={label}
                  className="flex h-11 w-11 items-center justify-center rounded border border-slate-200 bg-white text-slate-800 transition hover:border-slate-300 hover:shadow-sm"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
              <span className="ml-1.5 text-[15px] text-slate-600">@{SOCIAL_HANDLE}</span>
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:px-10" aria-label="Footer">
            <h3 className={headingClass}>Explore</h3>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[15px] text-slate-700 transition-colors hover:text-sky-700">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Plans + Contact */}
          <div className="lg:pl-10">
            <h3 className={headingClass}>Rental plans</h3>
            <ul className="mt-6 divide-y divide-slate-200 rounded border border-slate-200 bg-white">
              {plans.map((plan) => (
                <li key={plan.label}>
                  <a href="#plans" className="group flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50">
                    <span>
                      <span className="block text-base font-bold text-slate-900">{plan.label}</span>
                      <span className="block text-sm text-slate-500">{plan.note}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-lg font-extrabold text-sky-600">{plan.price}</span>
                      <span className="text-sm text-slate-500">/ month</span>
                      <ArrowRight className="ml-3 h-4 w-4 text-sky-600 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <h3 className={`${headingClass} mt-8`}>Get in touch</h3>
            <div className="mt-4 flex flex-wrap gap-2 xl:flex-nowrap">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={contactClass}>
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp
              </a>
              <a href={PHONE_HREF} className={contactClass}>
                <Phone className="h-5 w-5 text-sky-600" /> Call us
              </a>
              <a href={`mailto:${SUPPORT_EMAIL}`} className={contactClass}>
                <Mail className="h-5 w-5 text-sky-600" /> {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sky-100 pt-6 text-sm text-slate-600 sm:flex-row">
          <p>© {currentYear} RentOMate. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-600" /> Coimbatore, Tamil Nadu
            </span>
            <span className="h-5 w-px bg-slate-200" aria-hidden="true" />
            <a href="#" className="inline-flex items-center gap-1.5 font-medium text-slate-700 transition-colors hover:text-slate-900">
              Back to top <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
