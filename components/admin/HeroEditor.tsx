"use client";

import { useState } from "react";
import { ExternalLink, Loader2, Save } from "lucide-react";
import { apiFetch } from "@/lib/admin/api";
import { DEFAULT_SLIDE_ALT, type HeroContent, type HeroSlide } from "@/lib/hero";
import { ImageField } from "@/components/admin/ImageField";
import { PageHeader } from "@/components/admin/PageHeader";
import { useToast } from "@/components/admin/Toast";

/** Homepage hero: the carousel images on the right of the hero. */
export function HeroEditor({ initial }: { initial: HeroContent }) {
  const toast = useToast();
  const [hero, setHero] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const updateSlide = (index: number, patch: Partial<HeroSlide>) => {
    setHero((current) => ({ ...current, slides: current.slides.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)) }));
    setDirty(true);
  };

  async function save() {
    setSaving(true);
    try {
      setHero(await apiFetch<HeroContent>("/admin/settings/hero", { method: "PUT", body: hero }));
      setDirty(false);
      toast("Saved – live on the homepage");
    } catch (error) {
      toast((error as Error).message, true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Homepage hero"
        description="The images on the right of the homepage hero."
        actions={
          <>
            <a href="/" target="_blank" className="btn">
              <ExternalLink className="h-4 w-4" /> View homepage
            </a>
            <button type="button" className="btn btn-primary" onClick={save} disabled={saving || !dirty}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving…" : "Save"}
            </button>
          </>
        }
      />

      <section className="panel">
        <h2 className="panel-title">Carousel images</h2>
        <p className="-mt-2 mb-4 text-sm text-slate-500">
          Shown on the right of the hero, changing every 5 seconds. Use 3:2 landscape images (at least 1500 × 1000 px); edges are
          cropped to fit. Empty slots are skipped, and with no images the default RentOMate ambassador image is shown.
        </p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {hero.slides.map((slide, index) => (
            <div key={index}>
              <p className="label">Slide {index + 1}</p>
              <ImageField value={slide.image} onChange={(image) => updateSlide(index, { image })} label="Upload" folder="hero" />
              <label className="label mt-4" htmlFor={`slide-${index}-alt`}>Image description (alt text)</label>
              <input
                id={`slide-${index}-alt`}
                className="input"
                maxLength={200}
                placeholder={DEFAULT_SLIDE_ALT}
                value={slide.alt}
                onChange={(e) => updateSlide(index, { alt: e.target.value })}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
