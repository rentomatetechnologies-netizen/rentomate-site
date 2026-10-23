"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckAvailabilityModal } from "@/components/CheckAvailabilityModal";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";
import { CursorAnimation } from "@/components/CursorAnimation";
import { MobileContactBar } from "@/components/MobileContactBar";
import { BookNowButton } from "@/components/BookNowButton";
import { CustomerCountBadge } from "@/components/CustomerCountBadge";
import { DEFAULT_CITY } from "@/lib/site";

type SiteActions = { openLeadForm: () => void; openAvailability: (city?: string) => void };

const SiteActionsContext = createContext<SiteActions | null>(null);

/** Lets any section open the shared "Rent Now" lead popup or the availability checker. */
export const useSiteActions = () => {
  const actions = useContext(SiteActionsContext);
  if (!actions) throw new Error("useSiteActions must be used inside <SiteShell>");
  return actions;
};

/** Chrome shared by every page: navbar, footer, popups and floating contact buttons. */
export const SiteShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [availabilityCity, setAvailabilityCity] = useState(DEFAULT_CITY);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const openLeadForm = useCallback(() => setLeadFormOpen(true), []);
  const openAvailability = useCallback((city: string = DEFAULT_CITY) => {
    setAvailabilityCity(city);
    setAvailabilityOpen(true);
  }, []);
  const actions = useMemo(() => ({ openLeadForm, openAvailability }), [openLeadForm, openAvailability]);

  const pathname = usePathname();

  // The admin panel has its own layout: no site navbar, footer or lead popups.
  if (pathname.startsWith("/admin")) return <>{children}</>;

  return (
    <SiteActionsContext.Provider value={actions}>
      <main className="min-h-screen overflow-x-clip bg-white text-slate-900 selection:bg-sky-500 selection:text-white relative">
        <CursorAnimation />
        <Navbar />
        {children}
        <Footer />

        <MobileContactBar />
        <BookNowButton />
        <CustomerCountBadge onClick={openLeadForm} />

        <CheckAvailabilityModal key={availabilityCity} city={availabilityCity} isOpen={availabilityOpen} onClose={() => setAvailabilityOpen(false)} />
        {/* Opening popup – shows on every load until submitted on this device; "Rent Now" reopens it */}
        <LeadCaptureModal isOpen={leadFormOpen} onOpen={openLeadForm} onClose={() => setLeadFormOpen(false)} />
      </main>
    </SiteActionsContext.Provider>
  );
};
