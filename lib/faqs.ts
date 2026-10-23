// FAQ copy for the FAQ section (home, RO on rent and /rent/* pages), which also publishes it as FAQPage data.
import { PHONE_DISPLAY } from "@/lib/contact";
import { PLANS, inr } from "@/lib/site";

const planSummary = PLANS.map((plan) => `the ${plan.months}-month ${plan.name} plan at ${inr(plan.price)}/month (refundable deposit ${inr(plan.deposit)})`).join(" and ");

export type FaqSegment = { id: "trust" | "common" | "pricing"; label: string; faqs: [string, string][] };

export const FAQ_SEGMENTS: FaqSegment[] = [
  {
    id: "trust",
    label: "Trust",
    faqs: [
      ["Who is behind Rent O' Mate?", "Rent O' Mate is a registered rental service of Akvinz Water Purifiers, a water solutions company serving homes across Coimbatore."],
      ["Which purifier will I get?", "The default model is the Akvinz Ultron 8-Stage RO Purifier (RO + UV + UF + TDS with copper and essential minerals). If you prefer a different model, we'll provide your preferred option based on availability. The color, Midnight Black or Pearl White, will also be subject to availability."],
      ["Are the purifiers certified?", "Yes. Rent O' Mate provides ISI certified machines."],
      ["Who services the purifier?", "Our own trained technicians handle installation, servicing and filter swaps, free of cost while you rent."],
      ["How do I reach support?", `Call or WhatsApp our official number ${PHONE_DISPLAY}. Priority service support is included with every plan.`],
    ],
  },
  {
    id: "common",
    label: "Common Questions",
    faqs: [
      ["How does water purifier rental work?", "Choose a plan, WhatsApp us or fill in the booking form, pay the refundable deposit and first month's rent, and we install the purifier at your home."],
      ["How soon will it be installed?", "Installation is done at zero charges within 24 to 48 hours, based on your location."],
      ["Is maintenance included?", "Yes. Maintenance, service and eligible filter swaps are free for the duration of your plan."],
      ["Can tenants or PG residents rent a purifier?", "Yes. Renting is ideal for tenants, PGs and shared homes — there is nothing to buy or carry when you move."],
      ["Which areas do you serve?", "We currently serve homes across Coimbatore. Use the Check My Area option or WhatsApp us your locality to confirm."],
      ["Can I relocate the purifier?", "Yes. Relocation is supported subject to location feasibility; later moves may be chargeable as per plan terms."],
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Cancellation",
    faqs: [
      ["How much does it cost?", `We offer ${planSummary}.`],
      ["Is the security deposit refundable?", "Yes, the security deposit is 100% refundable as per the rental agreement. Any pending dues may be adjusted against it."],
      ["What is the 7-day risk-free trial?", "Use the purifier for 7 days. If you are not happy, cancel and we will uninstall it and refund your deposit, subject to conditions."],
      ["Can I cancel at any time?", "Yes, you can cancel at any point of time. Early-exit conditions in the rental agreement may apply."],
      ["Can I switch plans later?", "Plan changes are possible depending on your subscription. Contact support and we will help you."],
    ],
  },
];

/**
 * schema.org FAQPage data for every question in every tab. The FAQ section only renders the open tab's answers, so
 * this is how search engines and AI assistants (ChatGPT, Claude, Gemini, Perplexity) read all of them.
 */
export const FAQ_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_SEGMENTS.flatMap((segment) => segment.faqs).map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};
