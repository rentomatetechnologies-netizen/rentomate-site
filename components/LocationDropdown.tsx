"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { SERVICE_LOCATIONS } from "@/lib/site";

const LOCATIONS = SERVICE_LOCATIONS;

export const LocationDropdown: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(LOCATIONS[0]);
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
        className="flex items-center gap-1.5 rounded-full border border-white/70 bg-white/60 px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-slate-900/[0.06] backdrop-blur-md transition hover:bg-white/90 sm:text-sm"
      >
        <MapPin className="h-3.5 w-3.5 text-sky-600" />
        {city}
        <ChevronDown className={`h-3.5 w-3.5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        // Solid panel, about seven cities tall; the rest scroll inside it.
        <div role="listbox" className="absolute left-0 top-full z-50 mt-2 max-h-72 w-56 overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl">
          {LOCATIONS.map((location) => (
            <button
              key={location}
              type="button"
              role="option"
              aria-selected={city === location}
              onClick={() => { setCity(location); setOpen(false); }}
              className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-semibold text-slate-800 hover:bg-sky-50"
            >
              {location}
              {city === location && <Check className="h-4 w-4 text-sky-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
