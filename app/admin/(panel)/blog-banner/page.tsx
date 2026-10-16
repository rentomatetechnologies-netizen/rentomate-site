"use client";

import { LoadState } from "@/components/admin/LoadState";
import { BlogBannerEditor } from "@/components/admin/BlogBannerEditor";
import { useApi } from "@/lib/admin/api";
import type { BlogBanner } from "@/lib/blog-banner";

export default function BlogBannerPage() {
  const { data: banner, error } = useApi<BlogBanner>("/admin/settings/blog-banner");

  if (!banner) return <LoadState error={error} />;
  return <BlogBannerEditor initial={banner} />;
}
