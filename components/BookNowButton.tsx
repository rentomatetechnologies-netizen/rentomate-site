import React from "react";
import { CalendarCheck } from "lucide-react";
import { CUSTOMER_FORM_URL } from "@/lib/site";

// Floating free-trial button, bottom-right, on tablets and desktops. On phones it is a tab in the bottom tab bar.
// Opens the Akvinz customer form, where the trial is booked.
export const BookNowButton: React.FC = () => (
  <a
    href={CUSTOMER_FORM_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border-2 border-white bg-gradient-to-r from-sky-600 to-blue-600 py-3 pl-4 pr-5 text-sm font-bold uppercase text-white shadow-xl shadow-sky-900/25 transition hover:-translate-y-0.5 hover:from-sky-700 hover:to-blue-700 md:inline-flex"
  >
    <CalendarCheck className="h-5 w-5" aria-hidden />
    7 days free trail
  </a>
);
