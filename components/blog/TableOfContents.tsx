"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronsUpDown, List, X } from "lucide-react";

export type TocHeading = { id: string; text: string };

const TocList = ({ headings, active, onNavigate }: { headings: TocHeading[]; active?: string; onNavigate?: () => void }) => (
  <ol className="space-y-1.5">
    {headings.map((heading) => (
      <li key={heading.id}>
        <a
          href={`#${heading.id}`}
          onClick={onNavigate}
          className={`block py-0.5 text-[15px] leading-6 underline-offset-2 transition hover:text-[#0067c7] hover:underline ${active === heading.id ? "font-bold text-[#0084FF]" : "text-[#051838]"}`}
        >
          - {heading.text}
        </a>
      </li>
    ))}
  </ol>
);

/** Collapsible table of contents inside the article, listing the post's headings. */
export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [open, setOpen] = useState(true);

  return (
    <nav aria-label="Table of contents" className="my-6 w-fit max-w-full rounded-[6px] border border-slate-200 bg-[#f9f9fe] px-4 py-3 sm:min-w-[24rem]">
      <div className="flex items-center justify-between gap-6">
        <p className="text-xl font-semibold text-slate-500">Table of Contents</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Hide table of contents" : "Show table of contents"}
          className="flex items-center gap-0.5 rounded-[6px] border border-slate-300 bg-white px-2 py-1.5 text-slate-600 transition hover:text-[#0084FF]"
        >
          <List className="h-4 w-4" />
          <ChevronsUpDown className="h-3 w-3" />
        </button>
      </div>
      {open && (
        <div className="mt-2">
          <TocList headings={headings} />
        </div>
      )}
    </nav>
  );
}

/** Floating "Index" tab on the left edge that opens the table of contents as a drawer, highlighting the current section. */
export function IndexDrawer({ headings }: { headings: TocHeading[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const elements = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -60% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open article index"
        className="fixed left-0 top-1/3 z-40 flex flex-col items-center gap-2 rounded-r-[10px] bg-white px-2.5 py-4 text-sm font-bold text-[#051838] shadow-[0_4px_20px_rgb(15_23_42/0.15)] transition hover:text-[#0084FF]"
      >
        <ArrowRight className="h-4 w-4" aria-hidden />
        <span className="[writing-mode:vertical-rl]">Index</span>
      </button>

      <div className={`fixed inset-0 z-[65] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Table of contents"
          className={`absolute inset-y-0 left-0 flex w-[min(90vw,32rem)] flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <p className="text-xl font-bold text-[#051838]">Table of Contents</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close index" tabIndex={open ? 0 : -1} className="rounded-[6px] p-1.5 text-[#051838] transition hover:bg-slate-100">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="overflow-y-auto px-6 py-6">
            <TocList headings={headings} active={active} onNavigate={() => setOpen(false)} />
          </div>
        </aside>
      </div>
    </>
  );
}
