"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ADDRESS_LINES, FACEBOOK_URL, GMAIL_COMPOSE_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF, SOCIAL_HANDLE, SUPPORT_EMAIL, whatsappLink } from "@/lib/contact";
import { LEGAL_LINKS, NAV_LINKS, PLANS, PLANS_PAGE_PATH, inr } from "@/lib/site";
import { SEO_PAGES, seoPageHref } from "@/lib/seo-pages";

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

const plans = PLANS.map((plan) => ({ label: `${plan.months}-Month ${plan.name}`, price: inr(plan.price), note: plan.tagline }));

const headingClass = "text-xs font-bold uppercase tracking-[0.2em] text-white";
const linkClass = "text-[15px] text-slate-400 transition-colors hover:text-sky-300";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = whatsappLink("Hi Rent O' Mate! I would like to know more about renting a water purifier.");

  const contacts = [
    { label: "WhatsApp", value: "Chat with us", href: whatsappUrl, external: true, icon: <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> },
    { label: "Call us", value: PHONE_DISPLAY, href: PHONE_HREF, external: false, icon: <Phone className="h-5 w-5 text-sky-400" /> },
    { label: "Email", value: SUPPORT_EMAIL, href: GMAIL_COMPOSE_URL, external: true, icon: <Mail className="h-5 w-5 text-sky-400" /> },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      {/* Bottom padding keeps the last row clear of the floating buttons (customer badge on the left, free trial on the right,
          and on mobile the Call / WhatsApp bar), which stack higher on phones. */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-56 sm:px-6 sm:pb-40 md:pb-28 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-6">
            <Logo light />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-400">
              Water purifier rental in Coimbatore — pure drinking water made simple, flexible and affordable.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Rent O' Mate on ${label} (@${SOCIAL_HANDLE})`}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/15 bg-white/5 text-slate-100 transition hover:border-sky-400/50 hover:bg-sky-400/10"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
              <span className="ml-1.5 text-sm text-slate-400">@{SOCIAL_HANDLE}</span>
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <h3 className={headingClass}>Explore</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get in touch */}
          <div className="lg:col-span-3">
            <h3 className={headingClass}>Get in touch</h3>
            <ul className="mt-5 space-y-4">
              {contacts.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white/5 transition group-hover:border-sky-400/50">
                      {contact.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-slate-500">{contact.label}</span>
                      <span className="block break-all text-sm font-semibold text-slate-200 transition-colors group-hover:text-sky-300">{contact.value}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white/5">
                  <MapPin className="h-5 w-5 text-sky-400" aria-hidden />
                </span>
                <address className="min-w-0 not-italic">
                  <span className="block text-xs text-slate-500">Office</span>
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block text-sm leading-6 text-slate-400">{line}</span>
                  ))}
                </address>
              </li>
            </ul>
          </div>

          {/* Rental plans */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className={headingClass}>Rental plans</h3>
            <ul className="mt-5 space-y-3">
              {plans.map((plan) => (
                <li key={plan.label}>
                  <Link
                    href={PLANS_PAGE_PATH}
                    className="group flex items-center justify-between gap-3 rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-sky-400/40 hover:bg-white/[0.07]"
                  >
                    <span>
                      <span className="block text-sm font-bold text-white">{plan.label}</span>
                      <span className="block text-xs text-slate-400">{plan.note}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                      <span className="text-lg font-extrabold text-sky-400">{plan.price}</span>
                      <span className="text-xs text-slate-400">/mo</span>
                      <ArrowRight className="ml-1.5 h-4 w-4 text-sky-400 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular searches (SEO): each links to its landing page in app/rent/[slug].
            Chips grow to fill each row, so every row runs edge to edge. */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className={headingClass}>Popular searches</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {SEO_PAGES.map((page) => (
              <li key={page.slug} className="grow">
                <Link
                  href={seoPageHref(page)}
                  className="block whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-center text-xs text-slate-400 transition hover:border-sky-400/40 hover:bg-white/[0.06] hover:text-sky-300"
                >
                  {page.search}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom bar: copyright | legal links | location + back to top. Stacks and centres on smaller screens. */}
        <div className="mt-10 flex flex-col items-center gap-5 border-t border-white/10 pt-6 text-center text-xs text-slate-400 lg:flex-row lg:justify-between lg:text-left">
          <div className="space-y-1">
            <p className="text-sm text-slate-300">© {currentYear} Rent O&apos; Mate. All rights reserved.</p>
            <p className="max-w-md">
              Rent O&apos; Mate is a proprietary brand of Akvinz. All commercial transactions, billing, and GST compliance are managed and operated by
              M/S Ragavi Enterprises.
            </p>
          </div>

          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            {LEGAL_LINKS.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && <span className="text-white/20" aria-hidden="true">•</span>}
                <Link href={link.href} className="px-1 font-medium text-slate-300 underline-offset-2 transition-colors hover:text-sky-300 hover:underline">
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-sky-400" aria-hidden /> Coimbatore, Tamil Nadu
            </span>
            <span className="h-4 w-px bg-white/15" aria-hidden="true" />
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-medium text-slate-200 transition-colors hover:border-sky-400/50 hover:text-white"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
