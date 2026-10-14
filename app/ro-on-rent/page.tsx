import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { RentalPlans } from "@/components/RentalPlans";
import { HowItWorks } from "@/components/HowItWorks";
import { FreeTrial } from "@/components/FreeTrial";
import { FaqSection } from "@/components/FaqSection";
import { LOWEST_PRICE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "RO Water Purifier on Rent",
  description: `Rent an RO water purifier in Coimbatore from ₹${LOWEST_PRICE}/month with free installation, maintenance and filter replacements.`,
  path: "/ro-on-rent",
});

export default function RoOnRentPage() {
  return (
    <>
      <PageHeader
        eyebrow="RO on Rent"
        breadcrumbs={[{ label: "RO on Rent", href: "/ro-on-rent" }]}
        title={<>RO water purifier on rent, <span className="text-[#0084FF]">from ₹{LOWEST_PRICE}/month</span></>}
        description="Zero machine cost, free installation, lifetime free maintenance and filter replacements at no cost. Pick a plan and we'll install within 24–48 hours."
      />
      <RentalPlans />
      <HowItWorks />
      <FreeTrial />
      <FaqSection />
    </>
  );
}
