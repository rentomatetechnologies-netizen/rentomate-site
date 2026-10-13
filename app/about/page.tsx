import type { Metadata } from "next";
import { BadgeCheck, MapPin, Wrench } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { WhyRentomate } from "@/components/WhyRentomate";
import { SmarterChoice } from "@/components/SmarterChoice";
import { AvailableCities } from "@/components/AvailableCities";

export const metadata: Metadata = {
  title: "About Us",
  description: "RentOMate is a Coimbatore water purifier rental service by Akvinz Water Purifiers. Pure water at home without buying a machine.",
};

const values = [
  { icon: BadgeCheck, title: "Certified machines", desc: "Every RentOMate purifier is an ISI certified Akvinz machine." },
  { icon: Wrench, title: "We handle the upkeep", desc: "Installation, servicing and filter replacements are on us for as long as you rent." },
  { icon: MapPin, title: "Local to Coimbatore", desc: "A team based in the city, so installs and service visits are quick." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About RentOMate"
        title={<>Own less. <span className="text-[#0084FF]">Live smart.</span></>}
        description="RentOMate is a registered service of Akvinz Water Purifiers. We rent RO water purifiers to homes in Coimbatore, so families get safe drinking water without the upfront cost of buying a machine or the hassle of maintaining one."
      />

      <section className="bg-white pb-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-slate-900">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyRentomate />
      <SmarterChoice />
      <AvailableCities />
    </>
  );
}
