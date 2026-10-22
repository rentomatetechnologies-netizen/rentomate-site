import type React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "Rent O' Mate Terms of Use & Subscription Agreement for RO water purifier rentals in Coimbatore, Tamil Nadu.",
  path: "/terms-of-use",
});

/** A numbered sub-clause such as "1.1 Age Restriction: …". */
const Clause: React.FC<{ n: string; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <p>
    <strong className="text-[#051838]">
      {n} {title}:
    </strong>{" "}
    {children}
  </p>
);

const Phone = () => <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>;

const preamble = (
  <>
    <p className="text-sm font-semibold text-slate-500">Applicable Region: Coimbatore, Tamil Nadu, India</p>
    <p>
      Welcome to Rent O&apos; Mate (accessible via <a href={SITE_URL}>{SITE_URL}</a>). These Terms of Use (&ldquo;Terms&rdquo;, &ldquo;Agreement&rdquo;) govern your access to
      our website and define the legally binding conditions under which you subscribe to our domestic reverse osmosis (RO) water purifier rental services.
    </p>
    <p>
      This Agreement is executed between you (the &ldquo;Subscriber&rdquo;, &ldquo;Customer&rdquo;, &ldquo;User&rdquo;) and Rent O&apos; Mate. By browsing our platform,
      booking a trial, or completing a subscription registration, you unconditionally accept and agree to be bound by these terms. If you do not agree, you must
      immediately cease using the platform and services.
    </p>
  </>
);

const sections: LegalSection[] = [
  {
    heading: "Service Eligibility & Geographic Limitations",
    body: (
      <>
        <Clause n="1.1" title="Age Restriction">
          You must be at least 18 years of age and possess the legal capacity to enter into binding contracts under the Indian Contract Act, 1872 to subscribe to
          Rent O&apos; Mate.
        </Clause>
        <Clause n="1.2" title="Territorial Limits">
          Rent O&apos; Mate&apos;s subscription, delivery, installation, and physical maintenance services are strictly limited to selected geographic zones within
          Coimbatore, Tamil Nadu, India. Any subscription orders placed from locations outside our service coverage zone will be automatically cancelled and fully
          refunded.
        </Clause>
      </>
    ),
  },
  {
    heading: "Nature of Rental Subscription & Machine Ownership",
    body: (
      <>
        <Clause n="2.1" title="Property Ownership">
          The RO water purifier unit, standard installation plumbing kit, pre-filter housing, filters, membranes, and all structural accessories provided to you
          remain the exclusive, sole property of Rent O&apos; Mate at all times. This agreement is strictly a rental bailment contract; no transfer of ownership, title,
          equity, or proprietary right occurs under any circumstances.
        </Clause>
        <Clause n="2.2" title="Prohibition of Subletting">
          Subscribers are expressly prohibited from selling, leasing, mortgaging, sub-renting, pledging, gifting, or transferring possession of the hardware to any
          third party.
        </Clause>
      </>
    ),
  },
  {
    heading: "Subscription Plans, Billing, & Payment Architecture",
    body: (
      <>
        <Clause n="3.1" title="Rental Charges">
          Rental subscriptions are billed strictly on a recurring monthly cycle, commencing from the day the unit is successfully installed. Standard plans initiate
          at a baseline rate of ₹449 per month (inclusive or exclusive of statutory taxes as highlighted on checkout pages).
        </Clause>
        <Clause n="3.2" title="Security Deposit">
          Depending on your risk profile or chosen subscription package, Rent O&apos; Mate may request a refundable or non-refundable security deposit prior to dispatch.
          Refundable deposits are processed within 7 to 10 working days following account termination and successful de-installation, subject to physical
          equipment clearance.
        </Clause>
        <Clause n="3.3" title="Auto-Debit & Late Fees">
          Subscribers must maintain a valid, authorized payment method linked to our secure third-party payment gateways. If recurring auto-debit payments fail,
          Rent O&apos; Mate reserves the right to charge an administration late fee of ₹100 per week of delay and suspend access to water delivery via device lockdown or
          physical recovery.
        </Clause>
      </>
    ),
  },
  {
    heading: "Installation, Relocation, & Free Maintenance Framework",
    body: (
      <>
        <Clause n="4.1" title="Baseline Compliance">
          The customer must guarantee that the installation location possesses an active raw municipal/borewell water source connection, an accessible functional
          electrical outlet (220-240V), and an appropriate rejection water drain mechanism within 1.5 meters of the machine site.
        </Clause>
        <Clause n="4.2" title="Free Service Scope">
          Your subscription includes comprehensive, 100% free lifetime regular servicing, periodic filter adjustments, sediment clearouts, RO membrane replacements,
          and basic wear-and-tear component changes. Maintenance tasks are triggered systematically or scheduled via customer requests through our help portal.
        </Clause>
        <Clause n="4.3" title="Unauthorized Relocation">
          The user must never self-dismantle, alter, modify, repair, or relocate the hardware to a different room or address. Unauthorized shifting voids all
          operational safety liability. If you need to relocate within Coimbatore, you must schedule a structural re-installation ticket via our logistics line (
          <Phone />) at least 7 days in advance. Relocation service charges may apply.
        </Clause>
      </>
    ),
  },
  {
    heading: "Device Upkeep & Customer Liability for Damages",
    body: (
      <>
        <Clause n="5.1" title="Reasonable Care">
          The subscriber is responsible for providing reasonable physical protection to the unit. The unit must be kept away from direct sunlight, extreme weather
          elements, operational flooding, or structural hazards.
        </Clause>
        <Clause n="5.2" title="Damage Penalization">
          While standard functional degradation is completely managed by Rent O&apos; Mate, damages arising out of deliberate negligence, physical drops, internal
          tampering, unauthorized third-party repairs, external fire, or theft will attract heavy penalty charges equivalent to the full fair market retail value of
          the unit (up to ₹12,000 INR).
        </Clause>
      </>
    ),
  },
  {
    heading: "Subscription Cancellation, Notice Window & Return Protocols",
    body: (
      <>
        <Clause n="6.1" title="Termination Request">
          Subscribers can submit a cancellation request anytime through their online dashboard or via WhatsApp at{" "}
          <a href={whatsappLink("Hi Rent O' Mate! I would like to cancel my subscription.")} target="_blank" rel="noopener noreferrer">
            {PHONE_DISPLAY}
          </a>
          . A mandatory 7-day notice period applies.
        </Clause>
        <Clause n="6.2" title="Physical Retrieval Access">
          Upon account closure, the subscriber must grant certified Rent O&apos; Mate field engineers unhindered entry to the premises to safely uninstall and recover the RO
          device, power adapters, and plumbing pipes. Obstructing equipment recovery constitutes a criminal breach of trust under the Indian Penal Code.
        </Clause>
      </>
    ),
  },
  {
    heading: "Website Usage & Intellectual Property Restrictions",
    body: (
      <>
        <Clause n="7.1" title="Digital Material Rights">
          All virtual materials posted on rentomate.life—including logos, source text, visual brand templates, graphic assets, price structures, and web
          components—are protected under global copyright and intellectual property acts. Scraping, cloning, mirroring, or republishing our digital code is strictly
          barred.
        </Clause>
        <Clause n="7.2" title="Website Uptime Disclaimer">
          Rent O&apos; Mate provides the web framework on an &ldquo;As-Is&rdquo; and &ldquo;As-Available&rdquo; benchmark. We do not promise uninterrupted web access and are
          not liable for transaction dropouts caused by telecom network dropouts.
        </Clause>
      </>
    ),
  },
  {
    heading: "Governing Law & Dispute Resolution Jurisdiction",
    body: (
      <>
        <Clause n="8.1" title="Arbitration Framework">
          Any disagreements, transactional conflicts, or legal claims arising from this subscription framework will first be resolved through friendly dialogue. If
          mutual consensus fails, claims will be redirected to an independent arbitrator appointed solely by Rent O&apos; Mate.
        </Clause>
        <Clause n="8.2" title="Exclusive Courts">
          This legal agreement is interpreted exclusively under the laws of India. All matters, legal actions, or consumer panel complaints fall under the exclusive
          jurisdictional authority of the courts situated locally in Coimbatore, Tamil Nadu, India.
        </Clause>
      </>
    ),
  },
  {
    heading: "Customer Support and Official Notices",
    body: (
      <>
        <p>
          For any immediate operational help, billing modifications, structural relocation requests, or formal termination alerts, contact our support team at:
        </p>
        <ul>
          <li>
            <strong className="text-[#051838]">Brand Identity:</strong> Rent O&apos; Mate
          </li>
          <li>
            <strong className="text-[#051838]">Corporate Base:</strong> Coimbatore, Tamil Nadu, India
          </li>
          <li>
            <strong className="text-[#051838]">Primary Hotline / WhatsApp:</strong> <Phone />
          </li>
          <li>
            <strong className="text-[#051838]">Web Portal:</strong> <a href={SITE_URL}>{SITE_URL}</a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms-of-use"
      intro="Rent O' Mate Terms of Use & Subscription Agreement."
      updated="October 21, 2026"
      preamble={preamble}
      sections={sections}
    />
  );
}
