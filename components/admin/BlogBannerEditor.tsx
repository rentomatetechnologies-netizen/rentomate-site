"use client";

import { useState } from "react";
import { ExternalLink, Loader2, Save } from "lucide-react";
import { apiFetch } from "@/lib/admin/api";
import type { BlogBanner } from "@/lib/blog-banner";
import { ImageField } from "@/components/admin/ImageField";
import { PageHeader } from "@/components/admin/PageHeader";
import { useToast } from "@/components/admin/Toast";

type LinkMode = "lead" | "url" | "none";

const modeOf = (link: string): LinkMode => (link === "lead" ? "lead" : link ? "url" : "none");

/** The promo banner shown inside every blog article. */
export function BlogBannerEditor({ initial }: { initial: BlogBanner }) {
  const toast = useToast();
  const [banner, setBanner] = useState(initial);
  const [mode, setMode] = useState<LinkMode>(modeOf(initial.link));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (patch: Partial<BlogBanner>) => {
    setBanner((current) => ({ ...current, ...patch }));
    setDirty(true);
  };

  const changeMode = (next: LinkMode) => {
    setMode(next);
    update({ link: next === "lead" ? "lead" : next === "none" ? "" : banner.link === "lead" ? "" : banner.link });
  };

  async function save() {
    setSaving(true);
    try {
      const saved = await apiFetch<BlogBanner>("/admin/settings/blog-banner", { method: "PUT", body: banner });
      setBanner(saved);
      setMode(modeOf(saved.link));
      setDirty(false);
      toast(saved.enabled ? "Saved – showing on every blog post" : "Saved – banner is switched off");
    } catch (error) {
      toast((error as Error).message, true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Blog banner"
        description="One promo banner that appears inside every blog article, like an advertisement."
        actions={
          <>
            <a href="/blog" target="_blank" className="btn">
              <ExternalLink className="h-4 w-4" /> View blog
            </a>
            <button type="button" className="btn btn-primary" onClick={save} disabled={saving || !dirty}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving…" : "Save"}
            </button>
          </>
        }
      />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="panel space-y-5">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3">
            <input type="checkbox" className="h-5 w-5 accent-brand" checked={banner.enabled} onChange={(e) => update({ enabled: e.target.checked })} />
            <span>
              <span className="block text-sm font-bold text-navy">Show the banner on all blog posts</span>
              <span className="block text-xs text-slate-500">Turn off to hide it everywhere without deleting the image.</span>
            </span>
          </label>

          <div>
            <p className="label">Banner image</p>
            <p className="mb-2 text-xs text-slate-500">
              Optional. Wide landscape image, about 1600 × 900 px (roughly 16:9), shown at full width. With no image, the built-in Rent O&apos; Mate
              7-day risk-free trial template is shown instead.
            </p>
            <ImageField value={banner.image} onChange={(image) => update({ image })} label="Upload banner" folder="blog" />
          </div>

          <div>
            <label htmlFor="banner-alt" className="label">Image description (alt text)</label>
            <input
              id="banner-alt"
              className="input"
              maxLength={200}
              placeholder="e.g. Rent O' Mate RO purifier on rent – 7-day risk-free trial, plans from ₹449/month"
              value={banner.alt}
              onChange={(e) => update({ alt: e.target.value })}
            />
          </div>

          <div>
            <p className="label">When someone clicks the banner</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  ["lead", "Open “Rent Now” form"],
                  ["url", "Go to a page / URL"],
                  ["none", "Nothing (just a picture)"],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-sm ${mode === value ? "border-brand bg-sky-50 font-semibold text-navy" : "border-slate-200 text-slate-600"}`}>
                  <input type="radio" name="link-mode" className="accent-brand" checked={mode === value} onChange={() => changeMode(value)} />
                  {label}
                </label>
              ))}
            </div>
            {mode === "url" && (
              <input
                className="input mt-2"
                maxLength={500}
                placeholder="/#plans or https://…"
                value={banner.link}
                onChange={(e) => update({ link: e.target.value.trim() })}
              />
            )}
          </div>

          <p className="text-xs text-slate-400">The banner is shown on the blog listing and at the top of every article.</p>
        </section>

        <aside className="space-y-2 xl:sticky xl:top-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Preview</p>
          <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-[13px] leading-6 text-slate-500">
            <p>Reading time 5 mins</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner.image || "/banners/7-day-trial-banner.jpg"}
              alt={banner.alt || "7-Day Risk-Free Trial"}
              className={`w-full rounded-md shadow-sm ${banner.enabled ? "" : "opacity-40 grayscale"}`}
            />
            <p>The article…</p>
          </div>
          {!banner.enabled && <p className="text-xs font-semibold text-amber-600">Switched off – not shown on the website.</p>}
          {banner.enabled && !banner.image && <p className="text-xs text-slate-500">Showing the built-in 7-day risk-free trial template. Upload an image to replace it.</p>}
        </aside>
      </div>
    </>
  );
}
