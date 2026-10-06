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
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { CheckAvailabilityModal } from "@/components/CheckAvailabilityModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export const LandingPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectPlan = (months: number) => {
    const msg = encodeURIComponent(
      `Hello RentOMate! I am interested in booking the ${months} Months (₹${
        months === 12 ? 699 : 449
      }/month) water purifier rental plan for my location in Coimbatore.`
    );
    window.open(`https://wa.me/+919876543210?text=${msg}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-sky-500 selection:text-white relative">
      {/* Top Fixed Sticky Navbar */}
      <Navbar onCheckAvailability={() => setModalOpen(true)} />

      {/* Hero Section with Parallax Floating Badges & Pricing Cards */}
      <HeroSection
        onSelectPlan={handleSelectPlan}
        heroImageSrc="/images/hero-purifier.svg"
      />

      {/* Why RentOMate Benefits */}
      <WhyRentomate />

      {/* 3 Easy Steps Roadmap */}
      <HowItWorks />

      {/* Rental Plans (12 vs 24 Months) */}
      <RentalPlans onSelectPlan={handleSelectPlan} />

      {/* Made for Modern Living (Homes, Apartments, Tenants, PG) */}
      <ModernLiving />

      {/* Rent vs Buy Comparison Matrix */}
      <RentVsBuy />

      {/* Local Coimbatore Availability Banner */}
      <LocationBanner onCheckAvailability={() => setModalOpen(true)} />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Bottom Conversion CTA Banner */}
      <CtaBanner />

      {/* Footer */}
      <Footer />

      {/* Coimbatore Pincode / Area Availability Modal */}
      <CheckAvailabilityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </main>
  );
};
