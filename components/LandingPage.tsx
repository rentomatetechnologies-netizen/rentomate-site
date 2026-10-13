"use client";

import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { KeySpecs } from "@/components/KeySpecs";
import { ProductRange } from "@/components/ProductRange";
import { WhyRentomate } from "@/components/WhyRentomate";
import { SmarterChoice } from "@/components/SmarterChoice";
import { PureWaterTech } from "@/components/PureWaterTech";
import { HowItWorks } from "@/components/HowItWorks";
import { RentalPlans } from "@/components/RentalPlans";
import { AvailableCities } from "@/components/AvailableCities";
import { FreeTrial } from "@/components/FreeTrial";
import { FaqSection } from "@/components/FaqSection";

// Navbar, footer and popups come from <SiteShell> in the root layout.
export const LandingPage: React.FC = () => (
  <>
    {/* Hero product display, with key specs directly below */}
    <HeroSection />
    <KeySpecs />

    {/* Product range scroll */}
    <ProductRange />

    {/* Can vs Rent & Purifier (Buy) vs Rent */}
    <WhyRentomate />
    <SmarterChoice />

    {/* Technology behind pure water, ₹0 promises & assurance */}
    <PureWaterTech />

    {/* How renting works – step by step */}
    <HowItWorks />

    {/* Rent a RO – plans */}
    <RentalPlans />

    {/* Available cities */}
    <AvailableCities />

    {/* 7-day risk-free trial */}
    <FreeTrial />

    <FaqSection />
  </>
);
