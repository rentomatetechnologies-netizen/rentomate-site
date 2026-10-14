"use client";

import { LoadState } from "@/components/admin/LoadState";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { useApi } from "@/lib/admin/api";
import type { HeroContent } from "@/lib/hero";

export default function HeroPage() {
  const { data: hero, error } = useApi<HeroContent>("/admin/settings/hero");

  if (!hero) return <LoadState error={error} />;
  return <HeroEditor initial={hero} />;
}
