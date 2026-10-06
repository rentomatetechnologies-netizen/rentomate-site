"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MaintenancePage } from "@/components/MaintenancePage";
import { LandingPage } from "@/components/LandingPage";

function PageContent() {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "landing";

  // By default, renders the live Maintenance/Coming Soon page
  // Use ?preview=landing to preview the complete landing page
  if (isPreview) {
    return <LandingPage />;
  }

  return <MaintenancePage />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <PageContent />
    </Suspense>
  );
}
