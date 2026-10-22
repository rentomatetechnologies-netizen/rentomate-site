import React from "react";
import { CalendarCheck } from "lucide-react";
import { CUSTOMER_FORM_URL } from "@/lib/site";

// Floating free-trial button on every page; on mobile it sits above the bottom Call / WhatsApp bar.
// Opens the Akvinz customer form, where the trial is booked.
export const BookNowButton: React.FC = () => (
  <a
    href={CUSTOMER_FORM_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-[88px] right-4 z-40 inline-flex items-center gap-2 rounded-full border-2 border-white bg-gradient-to-r from-sky-600 to-blue-600 py-3 pl-4 pr-5 text-sm font-bold uppercase text-white shadow-xl shadow-sky-900/25 transition hover:-translate-y-0.5 hover:from-sky-700 hover:to-blue-700 md:bottom-6 md:right-6"
  >
    <CalendarCheck className="h-5 w-5" aria-hidden />
    7 days free trail
  </a>
);
