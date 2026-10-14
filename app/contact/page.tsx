import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AtSign, Mail, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RentNowButton } from "@/components/RentNowButton";
import { INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF, SOCIAL_HANDLE, SUPPORT_EMAIL, whatsappLink } from "@/lib/contact";
import { CITIES } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Call, WhatsApp or email RentOMate for water purifier rentals in Coimbatore. ${PHONE_DISPLAY}`,
  path: "/contact",
});

const channels = [
  { icon: Phone, label: "Call us", value: PHONE_DISPLAY, href: PHONE_HREF, external: false },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: whatsappLink("Hello RentOMate! I want to enquire about renting a water purifier in Coimbatore."),
    external: true,
  },
  { icon: Mail, label: "Email", value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}`, external: false },
  { icon: AtSign, label: "Instagram", value: `@${SOCIAL_HANDLE}`, href: INSTAGRAM_URL, external: true },
];

export default function ContactPage() {
  const serviceAreas = CITIES.filter((city) => city.live);

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        breadcrumbs={[{ label: "Contact Us", href: "/contact" }]}
        title={<>We&apos;re here to <span className="text-[#0084FF]">help</span></>}
        description="Questions about plans, installation or service? Reach us on any channel below, or leave your number and we'll call you back."
      />

      <section className="bg-white pb-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {channels.map(({ icon: Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-500">{label}</p>
              <p className="mt-1 break-words text-base font-bold text-slate-900 group-hover:text-sky-700">{value}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-slate-50/70 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <div className="rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Where we serve</h2>
            {serviceAreas.map((city) => (
              <div key={city.name} className="mt-4">
                <p className="text-sm font-bold text-sky-700">{city.name}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{city.areas.join(" · ")}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] p-6 text-white shadow-sm">
            <h2 className="text-xl font-extrabold">Prefer a call back?</h2>
            <p className="mt-2 text-sm leading-6 text-white/80">Share your name, number and pincode, and our team will get in touch.</p>
            <RentNowButton className="mt-5 self-start rounded-full bg-white px-6 py-3 text-sm font-bold text-[#051838] shadow-lg transition hover:bg-sky-50">
              Get a call back
            </RentNowButton>
          </div>
        </div>
      </section>
    </>
  );
}
