"use client";

import { useEffect, useState } from "react";

/** Thin bar across the top of the window showing how far through the article the reader is. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      setProgress(scrollable <= 0 ? 1 : Math.min(1, Math.max(0, -top / scrollable)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-1 bg-sky-100/60">
      <div className="h-full origin-left bg-gradient-to-r from-[#0084FF] to-[#051838]" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
