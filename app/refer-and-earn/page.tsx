import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Gift, Share2, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RentNowButton } from "@/components/RentNowButton";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = pageMetadata({
  title: "Refer & Earn",
  description: "Refer friends and family to Rent O' Mate and earn rewards when they rent a water purifier.",
  path: "/refer-and-earn",
});

const steps = [
  { icon: Share2, title: "Share your code", desc: "Every Rent O' Mate customer gets a customer code. Share it with friends and family." },
  { icon: UserPlus, title: "They enquire with it", desc: "Your friend enters your code in the \"Referral code\" box when they request a call back." },
  { icon: Gift, title: "You both earn", desc: "Once their purifier is installed, you both get referral rewards." },
];

export default function ReferAndEarnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Refer & Earn"
        breadcrumbs={[{ label: "Refer & Earn", href: "/refer-and-earn" }]}
        title={<>Share pure water, <span className="text-[#0084FF]">earn rewards</span></>}
        description="Share the connection. Double the benefits!"
      />

      <section className="bg-white pb-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {steps.map(({ icon: Icon, title, desc }, index) => (
            <div key={title} className="rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step {index + 1}</span>
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-5 rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">Don&apos;t have a customer code yet?</h2>
              <p className="mt-1 text-sm text-white/80">Request a call back and you&apos;ll get your code straight away.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <RentNowButton className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#051838] shadow-lg transition hover:bg-sky-50">
                Get my code
              </RentNowButton>
              <a
                href={whatsappLink("Hello Rent O' Mate! I'd like to know about the Refer & Earn rewards.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Ask about rewards
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
