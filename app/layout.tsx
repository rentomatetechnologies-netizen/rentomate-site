import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rentomate.life"),
  title: {
    default: "Water Purifier on Rent in Coimbatore | RentOMate",
    template: "%s | RentOMate",
  },
  description:
    "Rent an Akvinz RO+UV water purifier in Coimbatore with RentOMate. Choose flexible 12 or 24-month rental plans with installation and service support.",
  keywords: [
    "water purifier on rent in Coimbatore",
    "RO purifier rental",
    "Akvinz Ultron",
    "RentOMate",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "RentOMate",
              url: "https://rentomate.life",
              description:
                "Rent an Akvinz RO+UV water purifier in Coimbatore with RentOMate.",
            }),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
