import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BadgeCheck, CheckCircle2, Eye, HeartHandshake, MapPin, Quote, Sprout, Target, Truck, Wrench } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { WhyRentomate } from "@/components/WhyRentomate";
import { SmarterChoice } from "@/components/SmarterChoice";
import { AvailableCities } from "@/components/AvailableCities";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: "Rent O' Mate is a Coimbatore water purifier rental service by Akvinz Water Purifiers. Pure water at home without buying a machine.",
  path: "/about",
});

const values = [
  { icon: BadgeCheck, title: "Certified machines", desc: "Every Rent O' Mate purifier is an ISI certified Akvinz machine." },
  { icon: Wrench, title: "We handle the upkeep", desc: "Installation, servicing and filter replacements are on us for as long as you rent." },
  { icon: MapPin, title: "Local to Coimbatore", desc: "A team based in the city, so installs and service visits are quick." },
];

const VISION = "To walk alongside the next generation as a trusted companion, helping them 'own less & live smart' for a better lifestyle.";

const MISSION =
  "We take the hassle out of setting up a home. As a trusted companion to young starters, frequent shifters, and the elderly, we provide essential appliances on budget-friendly monthly plans. Backed by instant local service with no heavy down payments and no repair fees, we make it easy to own less and live smart so you can focus on what matters most.";

// Pulled from the mission statement above.
const AUDIENCES = [
  { icon: Sprout, label: "Young starters" },
  { icon: Truck, label: "Frequent shifters" },
  { icon: HeartHandshake, label: "The elderly" },
];
const PROMISES = ["Budget-friendly monthly plans", "No heavy down payments", "No repair fees", "Instant local service"];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Rent O' Mate"
        breadcrumbs={[{ label: "About", href: "/about" }]}
        title={<>Own less. <span className="text-[#0084FF]">Live smart.</span></>}
        justify
        description="Rent O' Mate is a proprietary brand of Akvinz. We rent RO water purifiers to homes in Coimbatore, so families get safe drinking water without the upfront cost of buying a machine or the hassle of maintaining one."
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

      <section className="bg-white pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center rounded-[10px] bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 ring-1 ring-sky-200">
              Who we are
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#051838] sm:text-4xl">
              Company <span className="text-[#0084FF]">Vision &amp; Mission</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
            {/* Vision: a short statement, set large like a quote */}
            <div className="relative flex flex-col overflow-hidden rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] p-7 text-white shadow-lg sm:p-9">
              <Quote className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 text-white/[0.06]" aria-hidden />
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sky-300 ring-1 ring-white/20">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Our Vision</h3>
              <p className="mt-3 text-justify text-xl font-semibold leading-relaxed hyphens-auto sm:text-2xl">{VISION}</p>
              <p className="mt-auto pt-8 text-lg font-extrabold">
                Own less. <span className="text-sky-300">Live smart.</span>
              </p>
            </div>

            {/* Mission: the full statement, plus who it's for and what's promised */}
            <div className="rounded-[10px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-white p-7 shadow-sm sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-sky-700">Our Mission</h3>
              <p className="mt-3 text-justify text-base leading-8 text-slate-700 hyphens-auto sm:text-[17px]">{MISSION}</p>

              <div className="mt-6 grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">A companion to</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {AUDIENCES.map(({ icon: Icon, label }) => (
                      <li key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#051838] shadow-sm ring-1 ring-slate-200">
                        <Icon className="h-4 w-4 text-sky-500" aria-hidden /> {label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Our promise</p>
                  <ul className="mt-3 space-y-2">
                    {PROMISES.map((promise) => (
                      <li key={promise} className="flex items-center gap-2 text-sm font-medium text-slate-800">
                        <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#0084FF] text-white" aria-hidden /> {promise}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyRentomate />
      <SmarterChoice />
      <AvailableCities />
    </>
  );
}
