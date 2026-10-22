import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { ADDRESS_LINES, GMAIL_COMPOSE_URL, PHONE_DISPLAY, PHONE_HREF, SUPPORT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Rent O' Mate collects, uses and protects the personal details you share when you enquire about or rent a water purifier.",
  path: "/privacy-policy",
});

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        Rent O&apos; Mate (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a proprietary brand of Akvinz. This policy explains how we handle personal information collected through this website and our
        rental service.
      </p>
    ),
  },
  {
    heading: "Information we collect",
    body: (
      <>
        <p>We only collect what we need to respond to you and provide the service:</p>
        <ul>
          <li>Details you enter in our forms: your name, mobile number, pincode, city and any referral code.</li>
          <li>Messages you send us on WhatsApp, by phone or by email.</li>
          <li>For customers: installation address, plan details, payment and billing records, and service history.</li>
        </ul>
        <p>We do not use advertising trackers or analytics cookies on this website.</p>
      </>
    ),
  },
  {
    heading: "How we use your information",
    body: (
      <ul>
        <li>To call you back, confirm availability at your location and book installation.</li>
        <li>To provide servicing, filter replacements, relocation support and customer care.</li>
        <li>To manage billing, deposits, refunds and GST compliance.</li>
        <li>To tell you when we start serving your city, if you asked us to.</li>
        <li>To credit referral rewards where a referral code was used.</li>
      </ul>
    ),
  },
  {
    heading: "Information stored on your device",
    body: (
      <p>
        When you submit a form, this website saves a copy of your details in your browser&apos;s local storage so it does not ask you again on your next visit. This
        data stays on your device; you can remove it at any time by clearing your browser&apos;s site data.
      </p>
    ),
  },
  {
    heading: "Sharing your information",
    body: (
      <>
        <p>We do not sell or rent your personal information. We share it only where needed to run the service:</p>
        <ul>
          <li>With our billing partner for billing and GST compliance, and with Akvinz for product and service support.</li>
          <li>With our installation and service technicians, so they can reach you.</li>
          <li>With WhatsApp (Meta) when you choose to contact us there, under WhatsApp&apos;s own privacy policy.</li>
          <li>Where required by law or to protect our rights.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Data retention and security",
    body: (
      <p>
        We keep your information for as long as you are an enquirer or customer and as required for accounting and tax purposes. We take reasonable steps to protect
        it against unauthorised access, loss or misuse, though no online system can be guaranteed to be completely secure.
      </p>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <p>
        You can ask us to access, correct or delete your personal information, or to stop contacting you, at any time using the details below. We will respond within
        a reasonable time.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: <p>We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above shows when it last changed.</p>,
  },
  {
    heading: "Contact us",
    body: (
      <>
        <p>
          For any privacy question or request, email <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer">{SUPPORT_EMAIL}</a> or call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
        </p>
        <p>
          Or write to us at: {ADDRESS_LINES.join(", ")}.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      intro="Your privacy matters to us. Here is what we collect, why we collect it, and how we keep it safe."
      updated="21 October 2026"
      sections={sections}
    />
  );
}
