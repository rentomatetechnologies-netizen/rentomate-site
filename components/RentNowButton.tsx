"use client";

import React from "react";
import { useSiteActions } from "@/components/SiteShell";

/** Opens the shared lead popup; lets server-rendered pages include a "Rent Now" style button. */
export const RentNowButton: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { openLeadForm } = useSiteActions();
  return (
    <button
      type="button"
      onClick={openLeadForm}
      className={className ?? "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-700 hover:to-blue-700"}
    >
      {children}
    </button>
  );
};
