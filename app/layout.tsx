import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Water Purifier on Rent in Coimbatore | RentOMate",
  description:
    "Rent an Akvinz RO+UV water purifier in Coimbatore with RentOMate. Choose flexible 12 or 24-month rental plans with installation and service support.",
  keywords: ["water purifier on rent in Coimbatore", "RO purifier rental", "Akvinz Ultron", "RentOMate"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
