"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhyRentomate } from "@/components/WhyRentomate";
import { HowItWorks } from "@/components/HowItWorks";
import { RentalPlans } from "@/components/RentalPlans";
import { ModernLiving } from "@/components/ModernLiving";
import { RentVsBuy } from "@/components/RentVsBuy";
import { LocationBanner } from "@/components/LocationBanner";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { CheckAvailabilityModal } from "@/components/CheckAvailabilityModal";
import { CursorAnimation } from "@/components/CursorAnimation";
import { MobileContactBar } from "@/components/MobileContactBar";

export const LandingPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-slate-900 selection:bg-sky-500 selection:text-white relative">
      <CursorAnimation />
      {/* Top Fixed Sticky Navbar */}
      <Navbar />

      {/* Hero Section with Parallax Floating Badges & Pricing Cards */}
      <HeroSection
        onSelectPlan={scrollToPlans}
        heroImageSrc="/hero/purifier-transparent.png"
      />

      {/* Why RentOMate Benefits */}
      <WhyRentomate />

      {/* 3 Easy Steps Roadmap */}
      <HowItWorks />

      {/* Rental Plans (12 vs 24 Months) */}
      <RentalPlans />

      {/* Made for Modern Living (Homes, Apartments, Tenants, PG) */}
      <ModernLiving />

      {/* Rent vs Buy Comparison Matrix */}
      <RentVsBuy />

      {/* Local Coimbatore Availability Banner */}
      <LocationBanner onCheckAvailability={() => setModalOpen(true)} />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Mobile-only fixed Call / WhatsApp bar */}
      <MobileContactBar />

      {/* Coimbatore Pincode / Area Availability Modal */}
      <CheckAvailabilityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

    </main>
  );
};
