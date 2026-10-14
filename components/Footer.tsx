"use client";

import React from "react";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_HREF, SOCIAL_HANDLE, SUPPORT_EMAIL, whatsappLink } from "@/lib/contact";
import Link from "next/link";
import { NAV_LINKS, PLANS, inr } from "@/lib/site";


const popularSearches = [
  "Water purifier on rent in Coimbatore",
  "RO water purifier rental Coimbatore",
  "Rent RO purifier in Coimbatore",
  "RO on rent near me",
  "Water purifier rental for tenants",
  "Monthly rental water purifier",
  "Copper RO purifier on rent",
  "Alkaline water purifier on rent",
  "Water purifier on rent in Saravanampatti",
  "Water purifier on rent in Peelamedu",
  "Water purifier on rent in RS Puram",
  "Water purifier on rent in Gandhipuram",
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

const plans = PLANS.map((plan) => ({ label: `${plan.months}-Month ${plan.name}`, price: inr(plan.price), note: plan.tagline }));

const headingClass = "text-xs font-bold uppercase tracking-[0.2em] text-white";
const contactClass = "inline-flex items-center gap-2 whitespace-nowrap rounded-[10px] border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm font-medium text-slate-100 transition hover:border-white/30 hover:bg-white/10";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = whatsappLink("Hi RentOMate! I would like to know more about renting a water purifier.");

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-28 sm:px-6 md:pb-8 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.7fr_1.55fr] lg:gap-0 lg:divide-x lg:divide-white/10">

          {/* Brand */}
          <div className="lg:pr-10">
            <Logo light />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-400">
              Water purifier rental in Coimbatore — pure drinking water made simple, flexible and affordable.
            </p>
            <p className="mt-5 inline-flex items-center gap-2.5 text-[15px] text-slate-400">
              <MapPin className="h-5 w-5 text-sky-400" />
              Serving homes across Coimbatore
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
                  className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/15 bg-white/5 text-slate-100 transition hover:border-white/30 hover:bg-white/10"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
              <span className="ml-1.5 text-[15px] text-slate-400">@{SOCIAL_HANDLE}</span>
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:px-10" aria-label="Footer">
            <h3 className={headingClass}>Explore</h3>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] text-slate-300 transition-colors hover:text-sky-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Plans + Contact */}
          <div className="lg:pl-10">
            <h3 className={headingClass}>Rental plans</h3>
            <ul className="mt-6 divide-y divide-white/10 rounded-[10px] border border-white/10 bg-white/[0.04]">
              {plans.map((plan) => (
                <li key={plan.label}>
                  <Link href="/ro-on-rent#plans" className="group flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-white/5">
                    <span>
                      <span className="block text-base font-bold text-white">{plan.label}</span>
                      <span className="block text-sm text-slate-400">{plan.note}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-lg font-extrabold text-sky-400">{plan.price}</span>
                      <span className="text-sm text-slate-400">/ month</span>
                      <ArrowRight className="ml-3 h-4 w-4 text-sky-400 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className={`${headingClass} mt-8`}>Get in touch</h3>
            <div className="mt-4 flex flex-wrap gap-2 xl:flex-nowrap">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={contactClass}>
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp
              </a>
              <a href={PHONE_HREF} className={contactClass}>
                <Phone className="h-5 w-5 text-sky-400" /> Call us
              </a>
              <a href={`mailto:${SUPPORT_EMAIL}`} className={contactClass}>
                <Mail className="h-5 w-5 text-sky-400" /> {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Popular searches (SEO) */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <h3 className={headingClass}>Popular searches</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            {popularSearches.map((search, index) => (
              <React.Fragment key={search}>
                {index > 0 && <span className="mx-2 text-slate-600" aria-hidden="true">|</span>}
                <Link href="/ro-on-rent" className="transition-colors hover:text-sky-300">{search}</Link>
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
          <div className="text-center sm:text-left">
            <p>© {currentYear} RentOMate. All rights reserved.</p>
            <p className="mt-1 text-xs text-slate-500">RentOMate is a registered service of Akvinz Water Purifiers.</p>
          </div>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-400" /> Coimbatore, Tamil Nadu
            </span>
            <span className="h-5 w-px bg-white/15" aria-hidden="true" />
            <a href="#" className="inline-flex items-center gap-1.5 font-medium text-slate-200 transition-colors hover:text-white">
              Back to top <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
