"use client";

import React from "react";
import { CalendarCheck, Phone, Users } from "lucide-react";
import { PHONE_HREF, whatsappLink } from "@/lib/contact";
import { CUSTOMER_FORM_URL } from "@/lib/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useHappyCustomerCount } from "@/components/CustomerCountBadge";

const tabClass =
  "flex min-w-0 flex-col items-center justify-center gap-1 rounded-[10px] py-1.5 text-[11px] font-semibold leading-none text-slate-600 transition active:scale-95 active:bg-slate-100";

// Bottom tab bar on phones: happy customers, Call, WhatsApp and the free trial, one tap away on every page.
// Tablets and desktops get the floating customer badge and free-trial button instead.
export const MobileContactBar: React.FC<{ onCustomersClick: () => void }> = ({ onCustomersClick }) => {
  const whatsappUrl = whatsappLink("Hello Rent O' Mate! I want to enquire about renting a water purifier.");
  const { count, total } = useHappyCustomerCount();

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-lg md:hidden"
    >
      <div className="grid grid-cols-4 gap-1">
        <button type="button" onClick={onCustomersClick} aria-label={`${total} happy customers. Rent now`} className={tabClass}>
          <span aria-hidden className="text-[15px] font-extrabold leading-[22px] tabular-nums text-[#051838]">
            {count.toLocaleString("en-IN")}
            <span className="text-sky-600">+</span>
          </span>
          <span aria-hidden className="flex items-center gap-0.5">
            <Users className="h-3 w-3" /> Customers
          </span>
        </button>
        <a href={PHONE_HREF} className={tabClass}>
          <Phone className="h-[22px] w-[22px] text-[#051838]" aria-hidden />
          Call
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={tabClass}>
          <WhatsAppIcon className="h-[22px] w-[22px] text-[#25D366]" />
          WhatsApp
        </a>
        <a href={CUSTOMER_FORM_URL} target="_blank" rel="noopener noreferrer" className={`${tabClass} text-sky-700`}>
          <CalendarCheck className="h-[22px] w-[22px] text-sky-600" aria-hidden />
          Free trial
        </a>
      </div>
    </nav>
  );
};
