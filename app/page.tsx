import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { getHero } from "@/lib/hero";
import { HOME_DESCRIPTION, HOME_TITLE, OPEN_GRAPH_DEFAULTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { ...OPEN_GRAPH_DEFAULTS, type: "website", title: HOME_TITLE, description: HOME_DESCRIPTION, url: "/" },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: HOME_DESCRIPTION },
};

export default async function Home() {
  return <LandingPage hero={await getHero()} />;
}
