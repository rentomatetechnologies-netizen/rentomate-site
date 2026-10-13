import React from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

// Desktop floating support button; on mobile the bottom Call / WhatsApp bar covers this.
export const NeedSupportButton: React.FC = () => (
  <a
    href={whatsappLink("Hi RentOMate! I need support.")}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] py-3 pl-4 pr-5 text-sm font-bold text-white shadow-xl shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-[#1ebe5a] md:inline-flex"
  >
    <MessageCircle className="h-5 w-5" />
    Need Support?
  </a>
);
