"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Users } from "lucide-react";
import { happyCustomers } from "@/lib/site";

const COUNT_DURATION_MS = 2000;

// Floating "happy customers" badge, bottom-left. The number counts up from 0 on every page load and page change.
// On phones it sits a row higher, since the "7 days free trail" button takes the right side of the same row.
export const CustomerCountBadge: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(0);

  useEffect(() => {
    // Today's total is worked out in the browser: pages are pre-built, so a server-side total would freeze at build time.
    const total = happyCustomers();
    // With reduced motion the first frame jumps straight to the total.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : COUNT_DURATION_MS;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = duration ? Math.min((now - start) / duration, 1) : 1;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out: fast at first, slowing near the total
      setTarget(total);
      setCount(Math.round(eased * total));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const total = `${target.toLocaleString("en-IN")}+`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${total} happy customers. Rent now`}
      className="fixed bottom-[150px] left-4 z-40 inline-flex items-center gap-2.5 rounded-full border-2 border-white bg-white py-2 pl-2 pr-4 text-left shadow-xl shadow-sky-900/20 ring-1 ring-sky-100 transition hover:-translate-y-0.5 sm:bottom-[88px] md:bottom-6 md:left-6"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white">
        <Users className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <span aria-hidden>
        <span className="block text-lg font-extrabold leading-none tabular-nums text-[#051838]">
          {count.toLocaleString("en-IN")}
          <span className="text-sky-600">+</span>
        </span>
        <span className="mt-0.5 block text-[11px] font-semibold leading-none text-slate-500">Happy customers</span>
      </span>
    </button>
  );
};
