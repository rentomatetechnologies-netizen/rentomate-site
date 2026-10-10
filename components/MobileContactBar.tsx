"use client";

import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { PHONE_HREF, whatsappLink } from "@/lib/contact";

// Fixed bottom action bar shown only on mobile, so Call / WhatsApp are always one tap away.
export const MobileContactBar: React.FC = () => {
  const whatsappUrl = whatsappLink("Hello RentOMate! I want to enquire about renting a water purifier in Coimbatore.");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-lg md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={PHONE_HREF}
          className="flex items-center justify-center gap-2 rounded bg-[#051838] py-3 text-sm font-bold text-white transition active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded bg-[#25D366] py-3 text-sm font-bold text-white transition active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
};
