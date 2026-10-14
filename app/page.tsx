import { LandingPage } from "@/components/LandingPage";
import { getHero } from "@/lib/hero";

export default async function Home() {
  return <LandingPage hero={await getHero()} />;
}
