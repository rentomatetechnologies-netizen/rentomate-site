"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { CITIES, DEFAULT_CITY } from "@/lib/site";
import { whatsappLink } from "@/lib/contact";

export const LocationDropdown: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(DEFAULT_CITY);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-[10px] border border-slate-200/90 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:border-sky-300 sm:text-sm"
      >
        <MapPin className="h-3.5 w-3.5 text-sky-600" />
        {city}
        <ChevronDown className={`h-3.5 w-3.5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div role="listbox" className="absolute left-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-xl">
          {CITIES.map((item) => (
            <button
              key={item.name}
              type="button"
              role="option"
              aria-selected={city === item.name}
              onClick={() => { setCity(item.name); setOpen(false); }}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-semibold text-slate-800 hover:bg-sky-50"
            >
              {item.name}
              {city === item.name && <Check className="h-4 w-4 text-sky-600" />}
            </button>
          ))}
          <a
            href={whatsappLink("Hi RentOMate! Is your water purifier rental available in my city? My city is: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-sky-700"
          >
            More cities coming soon — tell us yours
          </a>
        </div>
      )}
    </div>
  );
};
