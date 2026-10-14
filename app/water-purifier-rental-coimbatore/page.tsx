import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RentNowButton } from "@/components/RentNowButton";
import { PHONE_DISPLAY, PHONE_HREF, SUPPORT_EMAIL } from "@/lib/contact";
import { FAQ_SEGMENTS } from "@/lib/faqs";
import { CITIES, KEY_SPECS, MODELS, PLANS, PLANS_PAGE_PATH, PLAN_FEATURES, SERVICE_LOCATIONS, SITE_URL, inr } from "@/lib/site";

// One plain, server-rendered page with every plan, price and rental term, so search engines and
// AI search (ChatGPT, Google) can read and quote the exact figures. All numbers come from lib/site.ts.

const [cheapest, ...otherPlans] = [...PLANS].sort((a, b) => a.price - b.price);
const priceSummary = [cheapest, ...otherPlans].map((plan) => `${inr(plan.price)}/month for ${plan.months} months`).join(" or ");
const title = "Water Purifier Rental in Coimbatore — Plans & Prices";
const description = `RentOMate water purifier rental plans in Coimbatore: ${priceSummary}. Refundable deposit, free installation, servicing and filter changes.`;
const faqs = FAQ_SEGMENTS.flatMap((segment) => segment.faqs);
const coimbatore = CITIES.find((city) => city.name === "Coimbatore");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PLANS_PAGE_PATH },
  openGraph: { title, description, url: PLANS_PAGE_PATH },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "RO water purifier rental in Coimbatore",
      serviceType: "Water purifier rental",
      url: `${SITE_URL}${PLANS_PAGE_PATH}`,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: SERVICE_LOCATIONS.map((city) => ({ "@type": "City", name: city })),
      offers: PLANS.map((plan) => ({
        "@type": "Offer",
        name: `${plan.months}-month ${plan.name} plan`,
        price: plan.price,
        priceCurrency: "INR",
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: plan.price, priceCurrency: "INR", unitText: "MONTH", billingDuration: { "@type": "QuantitativeValue", value: plan.months, unitCode: "MON" } },
          { "@type": "PriceSpecification", name: "Refundable security deposit", price: plan.deposit, priceCurrency: "INR" },
        ],
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}${PLANS_PAGE_PATH}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
  ],
};

const h2 = "text-2xl font-extrabold tracking-tight text-[#051838] sm:text-3xl";
const cell = "border-b border-slate-200 px-4 py-3";

export default function PlansAndPricesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHeader
        eyebrow="Plans & prices"
        breadcrumbs={[{ label: "Plans & Prices", href: PLANS_PAGE_PATH }]}
        title={<>Water purifier rental in <span className="text-[#0084FF]">Coimbatore</span></>}
        description={`RentOMate rents ISI certified Akvinz RO water purifiers to homes in Coimbatore, Tamil Nadu. Rent is ${priceSummary}, with a refundable security deposit. Installation, servicing and filter replacements are free while you rent.`}
      />

      <div className="mx-auto max-w-5xl space-y-14 px-4 pb-16 sm:px-6 lg:px-8">
        <section aria-labelledby="plans-heading">
          <h2 id="plans-heading" className={h2}>RentOMate rental plans</h2>
          <div className="mt-6 overflow-x-auto rounded-[10px] border border-slate-200">
            <table className="w-full min-w-[36rem] text-left text-sm sm:text-base">
              <thead className="bg-sky-50 text-[#051838]">
                <tr>
                  <th scope="col" className={cell}>Plan</th>
                  <th scope="col" className={cell}>Monthly rent</th>
                  <th scope="col" className={cell}>Duration</th>
                  <th scope="col" className={cell}>Total rent over the plan</th>
                  <th scope="col" className={cell}>Refundable deposit</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {PLANS.map((plan) => (
                  <tr key={plan.months}>
                    <th scope="row" className={`${cell} font-bold text-[#051838]`}>{plan.months}-month {plan.name}</th>
                    <td className={`${cell} font-bold text-[#051838]`}>{inr(plan.price)}/month</td>
                    <td className={cell}>{plan.months} months</td>
                    <td className={cell}>{inr(plan.price * plan.months)}</td>
                    <td className={cell}>{inr(plan.deposit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            To start, you pay the refundable security deposit plus the first month&apos;s rent ({PLANS.map((plan) => `${inr(plan.deposit + plan.price)} on the ${plan.months}-month plan`).join(", ")}).
            The deposit is 100% refundable as per the rental agreement; any pending dues may be adjusted against it.
          </p>
        </section>

        <section aria-labelledby="included-heading">
          <h2 id="included-heading" className={h2}>What&apos;s included in every plan</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[...PLAN_FEATURES, "7-day risk-free trial"].map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-700">
            <strong className="text-[#051838]">The purifier:</strong> {MODELS[0].name} ({MODELS.map((model) => model.colour).join(" or ")}) —{" "}
            {KEY_SPECS.map((spec) => `${spec.title} (${spec.desc})`).join(", ")}.
          </p>
        </section>

        <section aria-labelledby="terms-heading">
          <h2 id="terms-heading" className={h2}>Rental terms</h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-700">
            <li>The security deposit is 100% refundable as per the rental agreement. Pending dues may be adjusted against it.</li>
            <li>7-day risk-free trial: if you are not happy within 7 days, we uninstall the purifier and refund your deposit, subject to conditions.</li>
            <li>You can cancel at any time. Early-exit conditions in the rental agreement may apply.</li>
            <li>Relocation is supported subject to location feasibility; later moves may be chargeable as per plan terms.</li>
            <li>Installation is free and done within 24–48 hours of booking, depending on your location.</li>
          </ul>
        </section>

        <section aria-labelledby="area-heading">
          <h2 id="area-heading" className={h2}>Where we install</h2>
          <p className="mt-4 text-slate-700">
            RentOMate is based in Coimbatore and installs across the city
            {coimbatore && <>, including {coimbatore.areas.join(", ")}</>}. We also serve {SERVICE_LOCATIONS.filter((city) => city !== "Coimbatore").join(", ")}.
            WhatsApp or call us with your locality to confirm availability at your address.
          </p>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={h2}>Frequently asked questions</h2>
          <dl className="mt-6 divide-y divide-slate-200 rounded-[10px] border border-slate-200">
            {faqs.map(([question, answer]) => (
              <div key={question} className="p-5">
                <dt className="font-bold text-[#051838]">{question}</dt>
                <dd className="mt-2 leading-7 text-slate-600">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="contact-heading" className="rounded-[10px] border border-sky-100 bg-sky-50/60 p-6 sm:p-8">
          <h2 id="contact-heading" className={h2}>About RentOMate</h2>
          <p className="mt-4 leading-7 text-slate-700">
            RentOMate is a registered water purifier rental service of Akvinz Water Purifiers, based in Coimbatore, Tamil Nadu.
          </p>
          <ul className="mt-4 space-y-1 text-slate-700">
            <li>Website: <Link href="/" className="font-semibold text-[#0084FF] hover:underline">rentomate.life</Link></li>
            <li>Phone / WhatsApp: <a href={PHONE_HREF} className="font-semibold text-[#0084FF] hover:underline">{PHONE_DISPLAY}</a></li>
            <li>Email: <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-[#0084FF] hover:underline">{SUPPORT_EMAIL}</a></li>
          </ul>
          <div className="mt-6">
            <RentNowButton>Rent Now</RentNowButton>
          </div>
        </section>
      </div>
    </>
  );
}
